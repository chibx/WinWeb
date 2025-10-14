<script lang="ts" setup>
import ApplicationWindowWrapper from "@/components/application/WindowWrapper.vue";
import WindowsDesktopIcon from "@/components/Windows/DesktopIcon.vue";
import WindowsDragPane from "@/components/Windows/DragPane.vue";
import WindowsStartMenu from "@/components/Windows/StartMenu.vue";
import WindowsTaskBar from "@/components/Windows/TaskBar.vue";

import { getAppWindows } from "@/applications/index";
import { useDesktop } from "@/stores/desktop";
import { useStartMenu } from "@/stores/startmenu";
import type { DragPaneCoords } from "@/types/desktop";
import { stubDesktopIcons } from "@/utils/desktop";
import { idb } from "@/utils/idb";
import { getSystemBackgrounds } from "@/utils/idb/backgounds";
import { desktopIcons, keyboardKeys } from "@/utils/utils";
import { onBeforeEnter, onEnter, onLeave } from "@/utils/startmenu";
import { useEventListener, useLocalStorage, useObjectUrl } from "@vueuse/core";
import { onMounted, ref, unref, useTemplateRef } from "vue";

const desktop = useDesktop();
const startMenu = useStartMenu();
const lastBg = useLocalStorage("background", (await getSystemBackgrounds(1))[0]?.uid);
const bg = await idb.get("backgrounds", lastBg.value || "");
const background = useObjectUrl(bg?.data);
const isPointerDown = ref(false);
const homeEl = useTemplateRef("home-screen");
const openWindows = getAppWindows();

const validator = (ev: MouseEvent) => {
    // Ensure the mouse is really on the home-screen element and not on other apps that did not register the event-listener
    const res =
        (ev.target as Element).closest("#taskbar") === null &&
        (ev.target as Element).closest("#desk-house") !== null &&
        (ev.target as Element).closest(".desktop-icon") === null;

    return res;
};

function onDrag(
    _: MouseEvent,
    {
        height: paneHeight,
        left: paneLeft,
        top: paneTop,
        width: paneWidth,
        x: paneInitialX,
        y: paneInitialY,
    }: DragPaneCoords,
) {
    // console.time('res')
    const paneRight = paneLeft + paneWidth;
    const paneBottom = paneTop + paneHeight;

    desktopIcons.forEach(([el, focused]) => {
        const element = unref(el);
        if (!element) {
            return;
        }
        const { left: iconLeft, top: iconTop, width: iconWidth, height: iconHeight } = element.getBoundingClientRect();
        const iconRight = iconLeft + iconWidth;
        const iconBottom = iconTop + iconHeight;
        const isDraggingLeft = paneLeft < paneInitialX;
        const isDraggingUp = paneTop < paneInitialY;

        const inScope =
            paneHeight > 0 &&
            paneWidth > 0 &&
            /** --------------------------- */
            ((!isDraggingLeft &&
                !isDraggingUp &&
                paneBottom > iconTop + 20 &&
                paneRight > iconLeft + 15 &&
                paneInitialY < iconBottom - 20 &&
                paneInitialX < iconRight - 15) ||
                /** --------------------------- */
                (isDraggingLeft &&
                    !isDraggingUp &&
                    paneBottom > iconTop + 20 &&
                    paneLeft < iconRight - 15 &&
                    paneInitialY < iconBottom - 20 &&
                    paneInitialX > iconRight - 15) ||
                /** --------------------------- */
                (isDraggingLeft &&
                    isDraggingUp &&
                    paneTop < iconBottom - 20 &&
                    paneLeft < iconRight - 15 &&
                    paneInitialY > iconTop + 20 &&
                    paneInitialX > iconRight - 15) ||
                /** --------------------------- */
                (!isDraggingLeft &&
                    isDraggingUp &&
                    paneTop < iconBottom - 20 &&
                    paneRight > iconLeft + 15 &&
                    paneInitialY > iconTop - 20 &&
                    paneInitialX < iconRight - 15));

        focused.value = inScope;
    });
    // console.timeEnd('res')
}

useEventListener(homeEl, "mousedown", (ev) => {
    const deskEl = (ev.target as HTMLElement).closest(".desktop-icon");
    const { shift, ctrl } = keyboardKeys;
    const isKeyModPressed = ctrl || shift;
    if (!deskEl && !isKeyModPressed) {
        desktopIcons.forEach(([, focused]) => {
            focused.value = false;
        });
        return;
    }
    desktopIcons.forEach(([el, focused]) => {
        if (el.value === deskEl) {
            // TODO There is an illogical bug where the left click does not work but the right click unfocuses as expected 🤷🏼‍♂️
            if (isKeyModPressed && focused.value === true) {
                focused.value = false;
            } else {
                focused.value = true;
            }
        } else if (!isKeyModPressed) {
            focused.value = false;
        }
    });
    isPointerDown.value = true;
});

onMounted(() => {
    const audio = new Audio("/audio/startup.mp3");
    audio.play();
});
</script>

<template>
    <div ref="home" :style="desktop.desktopVars" class="text-white">
        <div
            id="home-screen"
            ref="home-screen"
            class="select-none h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
            :style="{ backgroundImage: background && `url(${background})` }"
        >
            <WindowsDragPane :can-drag="validator" :on-move="onDrag">
                <div id="desk-house" class="h-full py-2.5">
                    <WindowsDesktopIcon
                        v-for="{ icon, name, rClick } in stubDesktopIcons.slice(0, 5)"
                        :key="name"
                        :name
                        :icon
                        :r-click
                    ></WindowsDesktopIcon>
                </div>
            </WindowsDragPane>
        </div>

        <TransitionGroup :css="false">
            <ApplicationWindowWrapper
                v-for="{ id, coords, isActive, isMinimized, name, props, zIndex, isMaximized } in openWindows"
                :id="id"
                :key="id"
                :name="name"
                :coords="coords"
                :z-index="zIndex"
                :is-active="isActive"
                :is-minimized="isMinimized"
                :is-maximized="isMaximized"
                :props="props"
            />
        </TransitionGroup>

        <Transition name="stm" :css="false" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
            <Suspense>
                <WindowsStartMenu v-if="startMenu.isOpen" />
            </Suspense>
        </Transition>
        <WindowsTaskBar />
    </div>
</template>

<style scoped>
#home-screen {
    background-repeat: no-repeat;
    background-size: cover;
    /* z-index: 1; */
}

/*.stm-enter-active,
.stm-leave-active {
    transition: all 0.3s;
}

.stm-enter-from,
.stm-leave-to {
    transform: translateY(100px);
}*/
</style>
