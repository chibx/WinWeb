<script lang="ts" setup>
import type { DesktopIcon, DesktopIconWithFocus } from "#build/imports";
import { desktopIcons, focusedIcons } from "~/utils/utils";
const props = defineProps<DesktopIcon>();
const hasFocus = ref(false);
const appEl = useTemplateRef("app-icon");
const desktopIconInfo = [appEl, hasFocus] as DesktopIconWithFocus;

watchEffect(() => {
    if (hasFocus.value) {
        focusedIcons?.add(desktopIconInfo);
    } else {
        focusedIcons?.delete(desktopIconInfo);
    }
});

onMounted(() => {
    desktopIcons?.add(desktopIconInfo);
});

onBeforeUnmount(() => {
    // clearInterval(id)
    desktopIcons?.delete(desktopIconInfo);
    focusedIcons?.delete(desktopIconInfo);
});
</script>

<template>
    <div
        ref="app-icon"
        class="desktop-icon w-[75px] h-fit px-2.5 py-1.5"
        :class="{ clicked: hasFocus }"
        :title="name"
        :aria-label="name"
        @click="hasFocus = true"
        @contextmenu.prevent="rClick"
    >
        <div class="flex flex-col gap-2.5 justify-center items-center">
            <img :src="props.icon" :alt="name" class="w-[30px]" draggable="false" />
            <div class="icon-name text-xs text-center">
                {{ props.name }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.desktop-icon:hover {
    background-color: #9ae7ff41;
}

.icon-name {
    text-shadow:
        2px 2px 5px #000000,
        -2px -2px 5px #000000;
}

.clicked {
    background-color: #2098bd9f;
}

.clicked:hover {
    background-color: #0386ad86;
}
</style>
