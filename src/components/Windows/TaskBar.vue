<script lang="ts" setup>
import { animate } from "motion";
import WindowsTaskBarIcon from "@/components/Windows/TaskBarIcon.vue";
import { useDesktop } from "@/stores/desktop";
import { useNow, useDateFormat, useEventListener } from "@vueuse/core";
import { rClick, stubTaskbarIcons } from "@/utils/desktop";
import { useTemplateRef, computed, unref, nextTick, watch, onMounted } from "vue";
import { battery, delay } from "@/utils/utils";
import { ICONS } from "@/utils/icons";
import { Icon } from "@iconify/vue";
const ICON_SIZE = 50; // 50px
// const SPACE_AFTER_RIGHT_BAR = 16; // 16px

const desktop = useDesktop();

// const taskbarEl = useTemplateRef("taskbar");
const innerBar = useTemplateRef("taskbar-inner");
// const rightBar = useTemplateRef("taskbar-right");

const isCentered = computed(() => desktop.config.taskbar.iconPosition === "center");
const { charging, level } = battery;
const now = useNow();
const taskbarTime = useDateFormat(now, "h:mm A");
const taskbarDate = useDateFormat(now, "MM/DD/YYYY");

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
        initialElX = focusedTaskbarIcon!.getBoundingClientRect().left;
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
        translate = (taskbarIconIndex - translateIdx) * -ICON_SIZE;
    } else if (translateIdx > taskbarIconIndex) {
        translate = (translateIdx - taskbarIconIndex) * ICON_SIZE;
    } else {
        translate = taskbarIconIndex * ICON_SIZE;
    }
    focusedTaskbarIcon.style.transform = `translateX(${translate}px)`;
    focusedTaskbarIcon = null;

    // Update the reactive state
    const taskbarItems = stubTaskbarIcons.value.slice();
    const focusedItem = taskbarItems.splice(taskbarIconIndex, 1);
    taskbarItems.splice(translateIdx, 0, focusedItem[0]!);
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
        resolvedPos = taskbarIconIndex * -ICON_SIZE;
    } else if (newLeft + ICON_SIZE > innerBarLeft + innerBarWidth) {
        resolvedPos = (virtualTaskbarIcons.length - taskbarIconIndex - 1) * ICON_SIZE;
    }
    // --------------------------------------------------------

    const inferredLeft = focusedTaskbarIcon.getBoundingClientRect().left - innerBarLeft;
    const correctLeft = translateIdx * ICON_SIZE;

    if (inferredLeft < correctLeft - 30) {
        const el = virtualTaskbarIcons.at(Math.max(0, translateIdx - 1));
        if (el) {
            const curTranslateX = new DOMMatrixReadOnly(el.style.transform).m41;
            el.style.transform = `translateX(${curTranslateX + ICON_SIZE}px)`;
            virtualTaskbarIcons.splice(
                translateIdx - 1,
                0,
                ...virtualTaskbarIcons.splice(translateIdx, 1),
            );
            translateIdx -= 1;
        }
    } else if (inferredLeft > correctLeft + 30) {
        const el = virtualTaskbarIcons.at(
            Math.min(translateIdx + 1, virtualTaskbarIcons.length - 1),
        );
        if (el) {
            const curTranslateX = new DOMMatrixReadOnly(el.style.transform).m41;
            el.style.transform = `translateX(${-ICON_SIZE + curTranslateX}px)`;
            virtualTaskbarIcons.splice(
                translateIdx + 1,
                0,
                ...virtualTaskbarIcons.splice(translateIdx, 1),
            );
            translateIdx += 1;
        }
    }

    focusedTaskbarIcon.style.transform = `translateX(${resolvedPos}px)`;
});

// TODO Handle positioning the taskbar on different screens
function animateBar(dur = 0) {
    const taskbarWrapEl = document.querySelector("#task-wrapper");
    if (!taskbarWrapEl) {
        return;
    }
    const style = isCentered.value
        ? {
              transform: ["translateX(0)", "translateX(-50%)"],
              left: ["0", "50%"],
          }
        : {
              transform: ["translateX(-50%)", "translateX(0)"],
              left: ["50%", "0"],
          };

    animate(
        taskbarWrapEl,
        { ...style, opacity: [0.75, 0, 1] },
        {
            duration: dur,
        },
    );
}

watch(isCentered, async () => {
    animateBar(0.3);
});

onMounted(() => {
    animateBar();
});
</script>

<template>
    <div
        id="taskbar"
        ref="taskbar"
        class="fixed z-[999] w-full py-[4px] bottom-0 left-0 place-content-center select-none"
        @contextmenu.prevent=""
    >
        <div class="w-full">
            <div
                id="task-wrapper"
                class="h-full pl-2.5 flex items-center gap-0.5 absolute top-1/2 -translate-y-1/2"
            >
                <WindowsTaskBarIcon
                    class="windows-start-icon"
                    name="Start"
                    icon="/icons/windows_11.svg"
                    :r-click="rClick"
                />

                <WindowsTaskBarIcon
                    name="Microsoft Copilot"
                    icon="/icons/microsoft-copilot.svg"
                    :r-click="rClick"
                />

                <div id="taskbar-inner" ref="taskbar-inner" class="flex items-center">
                    <WindowsTaskBarIcon
                        v-for="{ icon, name, rClick } in stubTaskbarIcons"
                        :key="name"
                        :name="name"
                        :icon="icon"
                        :r-click="rClick"
                    />
                </div>
            </div>
        </div>

        <div
            ref="taskbar-right"
            class="taskbar-right h-full flex gap-[5px] absolute right-4 top-1/2 -translate-y-1/2"
        >
            <div class="chevron-ic">
                <Icon :icon="ICONS['chevron-up']" />
            </div>

            <div class="adjustible-icons h-full flex">
                <div>
                    <Icon :icon="ICONS['online']" />
                </div>

                <!-- :title="charging ? `${chargingTime} ${level * 100}%` : `${dischargingTime} ${level * 100}%`" -->
                <div :title="`${level * 100}% left`">
                    <Icon
                        :icon="
                            charging
                                ? ICONS['battery-charging']
                                : level > 0.75
                                  ? ICONS['battery']
                                  : ICONS['battery-half']
                        "
                    />
                </div>

                <div>
                    <Icon :icon="ICONS['volume-high']" />
                </div>
            </div>

            <div class="date-group h-full flex items-center">
                <div class="flex flex-col text-right text-sm px-[5px]">
                    <div>{{ taskbarTime }}</div>
                    <div>{{ taskbarDate }}</div>
                </div>
                <div>
                    <Icon :icon="ICONS['notification']" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#taskbar {
    background: var(--taskbar-bg);
    transition: 0.15s linear;
    min-height: 55px;
    z-index: 3;
}

.chevron-ic {
    padding: 0 7px;
}

.adjustible-icons > div {
    padding: 0 7px;
}

.chevron-ic,
.adjustible-icons > div,
.date-group > div {
    height: 100%;
    place-content: center;
    cursor: pointer;
}

.chevron-ic:hover,
.adjustible-icons > div:hover {
    background-color: rgba(255, 255, 255, 0.26);
}

.date-group > div:last-child {
    padding: 0 15px;
}

.date-group > div:hover {
    background-color: rgba(255, 255, 255, 0.26);
}
</style>
