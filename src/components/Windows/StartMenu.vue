<script lang="ts" setup>
import { startMenuStyles } from "@/stores/desktop";
import { useElementBounding } from "@vueuse/core";
import { computed, onMounted, ref, watch, type CSSProperties } from "vue";
import type { StartMenuProps } from "@/types/desktop";
import { mat2Color } from "@/utils/utils";

defineProps<StartMenuProps>();

// Access start menu icon
const startMenuIcon = ref<HTMLElement | null>(null);
const { left } = useElementBounding(startMenuIcon);

watch(
    left,
    () => {
        console.log(left.value);
    },
    { immediate: true },
);

const bgStyles = computed<CSSProperties>(() => {
    if (startMenuStyles.gradient) {
        return {
            // TODO:  Make the gradient possibly and array of gradients
            backgroundImage: startMenuStyles.gradient,
        };
    }
    const [r, g, b] = startMenuStyles.bgColor;

    return {
        backgroundColor: mat2Color(r, g, b, startMenuStyles.opacity),
    };
});

onMounted(() => {
    startMenuIcon.value = document.querySelector<HTMLElement>(".windows-start-icon");
});
</script>

<template>
    <div
        class="start-menu w-[500px] h-150"
        :style="{
            position: 'absolute',
            left: left + 'px',
            bottom: '70px',
            ...bgStyles,
        }"
    >
        <div></div>
    </div>
</template>

<style scoped>
.start-menu {
    background-image: linear-gradient(
        to bottom left,
        rgb(50, 169, 255) 20%,
        rgba(0, 149, 255, 0.435) 50%,
        rgb(122, 200, 255)
    );
}
</style>
