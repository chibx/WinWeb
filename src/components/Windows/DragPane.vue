<script lang="ts" setup>
import { useDragPane } from "@/composables/desktop";
import type { DragPaneCoords } from "@/types/desktop";
import { useEventListener } from "@vueuse/core";
import { useTemplateRef, ref } from "vue";

const props = defineProps<{
    canDrag?: (e: MouseEvent) => boolean;
    onMove?: (e: MouseEvent, coords: DragPaneCoords) => void;
}>();

// const dragEl = useTemplateRef("dragEl");
// const dragParent = useTemplateRef('dragParent');
const [dragEl, coords, isActive] = useDragPane({ canDrag: props.canDrag, onMove: props.onMove })
</script>

<template>
    <div
        ref="dragEl"
        class="drag-pane absolute z-[9]"
        :class="{'active': isActive}"
        :style="{
            width: `${coords.width}px`,
            height: `${coords.height}px`,
            left: `${coords.left}px`,
            top: `${coords.top}px`,
        }"
    ></div>

    <slot />
</template>

<style scoped>
.drag-pane {
    /* border: 1px solid blue; */
    background-color: rgba(82, 163, 255, 0.4);
}

.active {
    border: 2px solid rgba(82, 163, 255, 0.7);
}
</style>
