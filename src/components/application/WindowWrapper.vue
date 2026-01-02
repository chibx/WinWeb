<script lang="ts" setup>
import { createHandler, screenDimensions } from "@/utils/utils";
import { APP_EL, APP_ID, WINDOW_PROPS, CLOSE_HANDLER, CLOSE_REQUEST } from "@/utils/keys";
import { animate } from "motion";
import { getAppByName, getAppWindows } from "@/applications";
import type { OpenWindow, SpecialComponent } from "@/applications/types";
import { getTaskIconX, TASKBAR_HEIGHT } from "@/applications/utils";
import { useTemplateRef, watch } from "vue";
import { provide } from "vue";

// TODO: TASKBAR
const props = defineProps<OpenWindow>();
const appWindowEl = useTemplateRef("window");
const openWindows = getAppWindows();
const currentWindow = openWindows.value.find((el) => el.id === props.id) as OpenWindow;
const { name, coords, isMaximized, isMinimized } = currentWindow;
const $app = getAppByName(props.name);
const instance = $app?.instance as unknown as SpecialComponent;
const [listener, closeHandler] = createHandler();
provide(APP_ID, props.id);
provide(WINDOW_PROPS, props);
provide(CLOSE_HANDLER, closeHandler);
provide(CLOSE_REQUEST, requestClose);
provide(APP_EL, appWindowEl);

async function requestClose() {
    let res: boolean = true;

    for (const func of listener) {
        res = await func();
        if (res == false) break;
    }

    if (res) {
        if (appWindowEl.value) {
            await animate(
                appWindowEl.value,
                {
                    transform: ["scale(1)", "scale(0.75)"],
                    opacity: 0,
                },
                { duration: 0.1 },
            );
        }
        openWindows.value = openWindows.value.filter((el) => el.id !== props.id);
    }
}

// The minimize animation implementation
watch(isMinimized, (newVal, _, onCleanup) => {
    if (!appWindowEl.value) return;

    const appTaskIconX = getTaskIconX(name);
    const inBounds = !!appTaskIconX && appTaskIconX > coords.x && appTaskIconX < coords.x + coords.width;
    const { width, height } = screenDimensions;
    const { pushX, pushY } = pushCoords(width, height);
    const targetX = inBounds ? coords.x : appTaskIconX;
    const targetY = coords.y + coords.height * 2; // Approximates translateY(200%)
    const endWidth = isMaximized.value ? coords.width * (width / (coords.width + pushX)) : coords.width;
    const endHeight = isMaximized.value ? coords.height * (height / (coords.height + pushY)) : coords.height;

    const animation = animate(
        appWindowEl.value,
        newVal
            ? {
                  left: `${targetX}px`,
                  top: `${targetY}px`,
                  width: "0px",
                  height: "0px",
                  opacity: 0,
              }
            : {
                  left: `${coords.x}px`,
                  top: `${coords.y}px`,
                  width: `${endWidth}px`,
                  height: `${endHeight}px`,
                  opacity: 1,
              },
        {
            duration: newVal ? 0.35 : 0.2,
            opacity: {
                duration: 0.2,
            },
        },
    );

    onCleanup(animation.stop);
});

// The maximize animation implementation
watch(isMaximized, (newVal, _, onCleanup) => {
    if (!appWindowEl.value) return;

    const { width, height } = screenDimensions;
    const { pushX, pushY } = pushCoords(width, height);

    const scaleX = width / (coords.width + pushX);
    const scaleY = height / (coords.height + pushY);

    const targetLeft = coords.x - (scaleX - 1) * (coords.width / 2);
    const targetTop = coords.y - (scaleY - 1) * (coords.height / 2);
    const targetWidth = coords.width * scaleX;
    const targetHeight = coords.height * scaleY;

    const animation = animate(
        appWindowEl.value,
        {
            left: newVal ? [`${coords.x}px`, `${targetLeft}px`] : `${coords.x}px`,
            top: newVal ? [`${coords.y}px`, `${targetTop}px`] : `${coords.y}px`,
            width: newVal ? [`${coords.width}px`, `${targetWidth}px`] : `${coords.width}px`,
            height: newVal ? [`${coords.height}px`, `${targetHeight}px`] : `${coords.height}px`,
        },
        {
            duration: 0.1,
        },
    );

    onCleanup(animation.stop);
});

function pushCoords(width: number, height: number) {
    // PushX and PushY are the amount pixels we would translate the app window to centralize the window on the X and Y coordinate
    const pushX = (width - coords.width) / 2 - coords.x;
    const pushY = (height + TASKBAR_HEIGHT - coords.height) / 2 - coords.y;

    return {
        pushX,
        pushY,
    };
}
</script>

<template>
    <div
        ref="window"
        class="window"
        :style="{
            height: `${coords.height}px`,
            width: `${coords.width}px`,
            top: `${coords.y}px`,
            left: `${coords.x}px`,
            zIndex: 1,
        }"
    >
        <component :is="instance" class="w-full" />
    </div>
</template>

<style scoped>
.window {
    position: fixed;
    /* cursor: n-resize; */
}

.minimize {
    animation: minimize 0.5s;
}

@keyframes minimize {
}
</style>
