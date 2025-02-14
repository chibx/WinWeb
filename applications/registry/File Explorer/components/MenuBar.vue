<script lang="ts" setup>
import FileExplorerTabBar from '~/applications/registry/File Explorer/components/TabBarMenu.vue';
import { useAppAction, useApp } from '@/applications/index'
const appWindow = useApp()
const appAction = useAppAction()
const requestClose = inject(CLOSE_REQUEST)
</script>

<template>
    <div class="w-full flex justify-between">
        <FileExplorerTabBar />
        <div class="menubar-controls text-white">
            <span class="hover:bg-gray-800" @click="appWindow!.isMinimized.value = true">
                <Icon :name="ICONS['minimize']" size="20" />
            </span>
            <span class="hover:bg-gray-800" @click="appWindow.isMaximized.value = appWindow?.isMaximized.value">
                <Icon :name="appWindow.isMaximized ? ICONS['restore'] : ICONS['maximize']" size="20" />
            </span>
            <span class="close" @click="requestClose">
                <Icon :name="ICONS['close']" size="20" />
            </span>
        </div>
    </div>
</template>

<style scoped>
.menubar-controls span {
    padding: 10px 10px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transition: 0.12s cubic-bezier(0.19, 1, 0.22, 1);
}

.menubar-controls span.close {
    padding: 10px 15px;
    transition: 0.1s cubic-bezier(0.215, 0.610, 0.355, 1);
}

.menubar-controls span.close:hover {
    color: white;
    background-color: red;
}
</style>