<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import FileExplorerTabBar from "./TabBarMenu.vue";
import { useAppAction, useApp } from "@/applications/index";
import { inject } from "vue";
import { CLOSE_REQUEST } from "@/utils/keys";
import { ICONS } from "@/utils/icons";
const appWindow = useApp()!;
const appAction = useAppAction();
const requestClose = inject(CLOSE_REQUEST);
</script>

<template>
    <div class="w-full flex justify-between bg-[#eaeaea] dark:bg-transparent">
        <FileExplorerTabBar />
        <div class="menubar-controls h-fit flex items-center">
            <span @click="appWindow.isMinimized.value = true">
                <Icon :icon="ICONS['minimize']" width="20" height="20" />
            </span>
            <span @click="appWindow.isMaximized.value = !appWindow.isMaximized.value">
                <Icon :icon="appWindow.isMaximized.value ? ICONS['restore'] : ICONS['maximize']" size="20" />
            </span>
            <span class="close" @click="requestClose">
                <Icon :icon="ICONS['close']" width="20" height="20" />
            </span>
        </div>
    </div>
</template>

<style scoped>
.menubar-controls span {
    color: black;
    cursor: pointer;
    padding: 10px 15px;
    justify-content: center;
    align-items: center;
    transition: 0.12s cubic-bezier(0.19, 1, 0.22, 1);
}

.dark .menubar-controls span {
    color: white;
}

.menubar-controls span.close {
    padding: 10px 17.5px;
    transition: 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
}

.menubar-controls span.close:hover {
    color: white;
    background-color: red;
}

.menubar-controls span:not(.close):hover {
    background-color: #f9f9f9;
}

.dark .menubar-controls span:not(.close):hover {
    /*background-color: #1e2939;*/
    background-color: #0d0d19bb;
}
</style>
