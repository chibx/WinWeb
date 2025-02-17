<script lang="ts" setup>
import { animate } from 'motion';
import { uid } from 'uid';
import { getAppByName, getAppRegistry, getAppWindows, useApp } from '~/applications';
import MenuBar from '~/applications/components/MenuBar.vue';
import type { ApplicationConfig, ApplicationProps, OpenWindow, SpecialComponent } from '~/applications/types';
import { getTaskIconX } from '~/applications/utils';

const props = defineProps<OpenWindow>()
const menubarTheme = reactive({})
const appWindowEl = useTemplateRef('window')

const registry = getAppRegistry()
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

async function requestClose() {
    let res: boolean = true

    for (const func of listener) {
        res = await func()
        if (res == false) break;
    }

    if (res) {
        openWindows.value = openWindows.value.filter(el => el.id !== props.id)
    }
}

watch(isMinimized, (newVal, _, onCleanup) => {
    if (!appWindowEl.value) return;

    const appTaskIconX = getTaskIconX(name)
    const inBounds = appTaskIconX && (appTaskIconX > coords.x) && appTaskIconX < (coords.x + coords.width)
    const animation = animate(appWindowEl.value, {
        transform: newVal ?
            [`scale(1)`, `scale(0) translateY(200%)${!inBounds && appTaskIconX ? ` translateX(${appTaskIconX - coords.x}px)` : ''}`]
            : `scale(1)`,
        opacity: newVal ? 0 : 1
    }, {
        duration: 0.35,
        ease: newVal ? 'easeIn' : 'easeOut',
        opacity: {
            duration: 0.3
        }
    })

    onCleanup(animation.stop)
})
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