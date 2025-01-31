<script lang="ts" setup>
import { uid } from 'uid';
import { getAppRegistry, getAppWindows } from '~/applications';
import MenuBar from '~/applications/components/MenuBar.vue';
import type { ApplicationConfig, ApplicationProps, OpenWindow, SpecialComponent } from '~/applications/types';

const props = defineProps<OpenWindow>()
const menubarTheme = reactive({})
const registry = getAppRegistry()
const openWindows = getAppWindows()
const $app = registry.find(app => app.name === props.name)!
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
</script>

<template>
    <div class="window"
        :style="{ height: `${coords.height}px`, width: `${coords.width}px`, top: `${coords.y}px`, left: `${coords.x}px`, zIndex: 1 }">
        <component class="w-full" :is="instance" />
    </div>
</template>

<style scoped>
.window {
    position: fixed;
    /* cursor: n-resize; */
}
</style>