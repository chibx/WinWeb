<script lang="ts" setup>
    import WindowsDragPane from "@/components/Windows/DragPane.vue";
    import WindowsDesktopIcon from "@/components/Windows/DesktopIcon.vue";
    import ApplicationWindowWrapper from "@/components/application/WindowWrapper.vue";
    import WindowsTaskBar from "@/components/Windows/TaskBar.vue";
    import WindowsStartMenu from "@/components/Windows/StartMenu.vue";

    import { getAppWindows } from "@/applications/index";
    import type { DragPaneCoords } from "@/types/desktop";
    import { desktopIcons, keyboardKeys } from "@/utils/utils";
    import { useDesktop } from "@/stores/desktop";
    import { idb } from "@/utils/idb";
    import { getSystemBackgrounds } from "@/utils/idb/backgounds";
    import { useLocalStorage, useObjectUrl, useEventListener } from "@vueuse/core";
    import { ref, useTemplateRef, unref, onMounted } from "vue";
    import { stubDesktopIcons } from "@/utils/desktop";

    const desktop = useDesktop();
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

    function onDrag(_: MouseEvent, { height, left, top, width, x, y }: DragPaneCoords) {
        // console.time('res')
        const right = left + width;
        const bottom = top + height;

        desktopIcons.forEach(([el, focused]) => {
            const element = unref(el);
            if (!element) {
                return;
            }
            const { left: cl, top: ct, width: cw, height: ch } = element.getBoundingClientRect();
            const cr = cl + cw;
            const cb = ct + ch;
            const isDraggingLeft = left < x;
            const isDraggingUp = top < y;

            const inScope =
                height > 0 &&
                width > 0 &&
                ((!isDraggingLeft &&
                    !isDraggingUp &&
                    bottom > ct + 20 &&
                    right > cl + 15 &&
                    y < cb - 20 &&
                    x < cr - 15) ||
                    (isDraggingLeft &&
                        !isDraggingUp &&
                        bottom > ct + 20 &&
                        left < cr - 15 &&
                        y < cb - 20 &&
                        x > cr - 15) ||
                    (isDraggingLeft &&
                        isDraggingUp &&
                        top < cb - 20 &&
                        left < cr - 15 &&
                        y > ct + 20 &&
                        x > cr - 15) ||
                    (!isDraggingLeft &&
                        isDraggingUp &&
                        top < cb - 20 &&
                        right > cl + 15 &&
                        y > ct - 20 &&
                        x < cr - 15));

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

    function toggleTaskbarPos() {
        desktop.config.taskbar.iconPosition =
            desktop.config.taskbar.iconPosition == "center" ? "left" : "center";
    }

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
                <div id="desk-house" class="h-full py-2.5 jsdjlj">
                    <WindowsDesktopIcon
                        v-for="{ icon, name, rClick } in stubDesktopIcons.slice(0, 5)"
                        :key="name"
                        :name
                        :icon
                        :r-click
                    ></WindowsDesktopIcon>
                    <button
                        style="background-color: black; padding: 20px"
                        @click="toggleTaskbarPos"
                    >
                        Toggle pos
                    </button>
                </div>
            </WindowsDragPane>
        </div>

        <TransitionGroup :css="false">
            <ApplicationWindowWrapper
                v-for="{
                    id,
                    coords,
                    isActive,
                    isMinimized,
                    name,
                    props,
                    zIndex,
                    isMaximized,
                } in openWindows"
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

        <WindowsStartMenu open />
        <WindowsTaskBar />
    </div>
</template>

<style scoped>
    #home-screen {
        background-repeat: no-repeat;
        background-size: cover;
        /* z-index: 1; */
    }
</style>
