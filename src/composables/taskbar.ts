import { TASKBAR_ICON_SIZE } from "@/utils/constants";
import { stubTaskbarIcons } from "@/utils/desktop";
import { useEventListener } from "@vueuse/core";
import { delay } from "motion";
import { unref, nextTick, type Ref } from "vue";

export function useTaskbarIconDrag(innerBar: Ref<HTMLElement | null>) {
    let initialClientX = 0;
    let initialElX = 0;
    let taskbarIconIndex = -1;
    /** This is meant for virtual repositioning of translated elements */
    let virtualTaskbarIcons: HTMLElement[] = [];
    let isPointerDown = false;
    let focusedTaskbarIcon: HTMLElement | null = null;
    let translateIdx = 0;

    useEventListener(document, "pointerdown", (ev) => {
        if (ev.target && (ev.target as HTMLElement).closest("#taskbar-inner") !== null) {
            focusedTaskbarIcon = (ev.target as HTMLElement).closest(".icon");
            if (!focusedTaskbarIcon) return;
            initialClientX = ev.clientX;
            initialElX = focusedTaskbarIcon.getBoundingClientRect().left;
            taskbarIconIndex = Array.from(unref(innerBar)?.querySelectorAll(".icon") || []).findIndex(
                (el) => el === focusedTaskbarIcon,
            );
            translateIdx = taskbarIconIndex;
            virtualTaskbarIcons = Array.from(unref(innerBar)?.querySelectorAll(".icon") || []);
            focusedTaskbarIcon.classList.remove("moving");
            isPointerDown = true;
        }
    });
    useEventListener(document, "pointerup", async () => {
        isPointerDown = false;
        if (!focusedTaskbarIcon) return;

        let translate;
        if (translateIdx < taskbarIconIndex) {
            translate = (taskbarIconIndex - translateIdx) * -TASKBAR_ICON_SIZE;
        } else if (translateIdx > taskbarIconIndex) {
            translate = (translateIdx - taskbarIconIndex) * TASKBAR_ICON_SIZE;
        } else {
            translate = taskbarIconIndex * TASKBAR_ICON_SIZE;
        }
        focusedTaskbarIcon.style.transform = `translateX(${translate}px)`;
        focusedTaskbarIcon = null;

        // Update the reactive state
        const taskbarItems = stubTaskbarIcons.value.slice();
        const focusedItem = taskbarItems.splice(taskbarIconIndex, 1);
        if (focusedItem[0]) {
            taskbarItems.splice(translateIdx, 0, focusedItem[0]);
        }
        stubTaskbarIcons.value = taskbarItems;
        await nextTick();
        virtualTaskbarIcons.forEach(async (el) => {
            el.classList.remove("moving");
            el.style.removeProperty("transform");
            await delay(10);
            el.classList.add("moving");
        });
        virtualTaskbarIcons = [];
    });

    useEventListener(document, "pointermove", (ev) => {
        const innerBarEl = unref(innerBar);
        if (!isPointerDown || !innerBarEl || !focusedTaskbarIcon) {
            return;
        }

        const { clientX } = ev;
        const { left: innerBarLeft, width: innerBarWidth } = innerBarEl.getBoundingClientRect();

        // Translate x
        let resolvedPos = clientX - initialClientX;
        const newLeft = initialElX + resolvedPos;
        if (newLeft < innerBarLeft) {
            resolvedPos = taskbarIconIndex * -TASKBAR_ICON_SIZE;
        } else if (newLeft + TASKBAR_ICON_SIZE > innerBarLeft + innerBarWidth) {
            resolvedPos = (virtualTaskbarIcons.length - taskbarIconIndex - 1) * TASKBAR_ICON_SIZE;
        }
        // --------------------------------------------------------

        const inferredLeft = focusedTaskbarIcon.getBoundingClientRect().left - innerBarLeft;
        const correctLeft = translateIdx * TASKBAR_ICON_SIZE;

        if (inferredLeft < correctLeft - 30) {
            const el = virtualTaskbarIcons.at(Math.max(0, translateIdx - 1));
            if (el) {
                const curTranslateX = new DOMMatrixReadOnly(el.style.transform).m41;
                el.style.transform = `translateX(${curTranslateX + TASKBAR_ICON_SIZE}px)`;
                virtualTaskbarIcons.splice(translateIdx - 1, 0, ...virtualTaskbarIcons.splice(translateIdx, 1));
                translateIdx -= 1;
            }
        } else if (inferredLeft > correctLeft + 30) {
            const el = virtualTaskbarIcons.at(Math.min(translateIdx + 1, virtualTaskbarIcons.length - 1));
            if (el) {
                const curTranslateX = new DOMMatrixReadOnly(el.style.transform).m41;
                el.style.transform = `translateX(${-TASKBAR_ICON_SIZE + curTranslateX}px)`;
                virtualTaskbarIcons.splice(translateIdx + 1, 0, ...virtualTaskbarIcons.splice(translateIdx, 1));
                translateIdx += 1;
            }
        }

        focusedTaskbarIcon.style.transform = `translateX(${resolvedPos}px)`;
    });
}
