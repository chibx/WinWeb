<script lang="ts" setup>
import { useAppAction, useApp } from '@/applications/index'
const appWindow = useApp()
const appAction = useAppAction()
const requestClose = inject(CLOSE_REQUEST)
</script>

<template>
    <div class="w-full">
        <div class="menubar-controls">
            <span>
                <Icon :name="ICONS['minimize']" size="20" />
            </span>
            <span @click="appWindow.isMaximized = !appWindow?.isMaximized">
                <Icon :name="appWindow.isMaximized ? ICONS['restore'] : ICONS['maximize']" size="20" />
            </span>
            <span class="close">
                <Icon :name="ICONS['close']" size="20" />
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
    transition: 0.1s cubic-bezier(0.215, 0.610, 0.355, 1);
}

.menubar-controls span.close:hover {
    color: white;
    background-color: red;
}
</style>