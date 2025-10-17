<script lang="ts" setup>
import { inject } from "vue";
import { Icon } from "@iconify/vue";
import { WINDOW_PROPS } from "@/utils/keys";
import { ICONS } from "@/utils/icons";
const props = inject(WINDOW_PROPS)!;
</script>

<template>
    <div class="w-full">
        <div class="menubar-controls">
            <span>
                <Icon :icon="ICONS['minimize']" width="20" height="20" />
            </span>
            <span>
                <Icon :icon="props.isMaximized ? ICONS['restore'] : ICONS['maximize']" width="20" height="20" />
            </span>
            <span class="close">
                <Icon :icon="ICONS['close']" width="20" height="20" />
            </span>
        </div>
    </div>
</template>

<style scoped>
.menubar-controls {
    float: right;
}

.menubar-controls span {
    padding: 6px 8px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: black;
    transition: 0.12s cubic-bezier(0.19, 1, 0.22, 1);
}

.menubar-controls span.close {
    transition: 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.menubar-controls span.close:hover {
    color: white;
    background-color: red;
}
</style>
