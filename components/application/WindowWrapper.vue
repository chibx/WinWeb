<script lang="ts" setup>
import { animate } from 'motion';
import { uid } from 'uid';
import { getAppByName, getAppRegistry, getAppWindows, useApp } from '~/applications';
import MenuBar from '~/applications/components/MenuBar.vue';
import type { ApplicationConfig, ApplicationProps, OpenWindow, SpecialComponent } from '~/applications/types';
import { getTaskIconX, TASKBAR_HEIGHT } from '~/applications/utils';

// TODO: TASKBAR
const props = defineProps<OpenWindow>()
const menubarTheme = reactive({})
const appWindowEl = useTemplateRef('window')
const openWindows = getAppWindows()
const currentWindow = openWindows.value.find(el => el.id === props.id)!
const { name, coords, isMaximized, isMinimized } = currentWindow;
const $app = getAppByName(props.name)
const instance = ($app?.instance as unknown as SpecialComponent)
const [listener, closeHandler] = createHandler();
provide(APP_ID, props.id)
provide(WINDOW_PROPS, props)
provide(CLOSE_HANDLER, closeHandler)
provide(CLOSE_REQUEST, requestClose)
provide(APP_EL, appWindowEl)

async function requestClose() {
    let res: boolean = true

    for (const func of listener) {
        res = await func()
        if (res == false) break;
    }

    if (res) {
        if (appWindowEl.value) {
            await animate(appWindowEl.value, {
                transform: ['scale(1)', 'scale(0.75)'],
                opacity: 0,
            }, { duration: 0.2 })
        }
        openWindows.value = openWindows.value.filter(el => el.id !== props.id)
    }
}

// The minimize animation implementation
watch(isMinimized, (newVal, _, onCleanup) => {
    if (!appWindowEl.value) return;

    const appTaskIconX = getTaskIconX(name)
    const inBounds = appTaskIconX && (appTaskIconX > coords.x) && appTaskIconX < (coords.x + coords.width)
    const { width, height } = screenDimensions;
    const { pushX, pushY } = pushCoords(width, height)
    const animation = animate(appWindowEl.value, {
        transform: newVal ?
            ['scale(1)', `scale(0) translateY(200%)${!inBounds && appTaskIconX ? ` translateX(${appTaskIconX - coords.x}px)` : ''}`]
            : [`translateY(200%)${!inBounds && appTaskIconX ? ` translateX(${appTaskIconX - coords.x}px)` : ''} scale(0.5)`, isMaximized.value ? `scaleX(${width / (coords.width + pushX)}) scaleY(${(height) / (coords.height + pushY)})` : `scale(1)`],
        opacity: newVal ? 0 : 1
    }, {
        duration: newVal ? 0.35 : 0.2,
        ease: 'linear',
        opacity: {
            duration: 0.2,
        }
    })

    onCleanup(animation.stop)
})

// The maximize animation implementation
watch(isMaximized, (newVal, _, onCleanup) => {
    if (!appWindowEl.value) return;

    const { width, height } = screenDimensions;
    const { pushX, pushY } = pushCoords(width, height)

    const animation = animate(appWindowEl.value, {
        transform: newVal ?
            ['scale(1)', `scaleX(${width / (coords.width + pushX)}) scaleY(${height / (coords.height + pushY)})`]
            : `scale(1)`,
    }, {
        duration: 0.1,
        ease: 'linear',
    })

    onCleanup(animation.stop)
})

function pushCoords(width: number, height: number) {
    // PushX and PushY are the amount pixels we would translate the app window to centralize the window on the X and Y coordinate
    const pushX = ((width - coords.width) / 2) - coords.x
    const pushY = ((height + TASKBAR_HEIGHT - coords.height) / 2) - coords.y

    return {
        pushX,
        pushY
    }
}
</script>

<template>
    <div class="window" ref="window"
        :style="{ height: `${coords.height}px`, width: `${coords.width}px`, top: `${coords.y}px`, left: `${coords.x}px`, zIndex: 1 }">
        <component class="w-full" :is="instance" />
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

@keyframes minimize {}
</style>