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
    <div class="w-full flex justify-between">
        <FileExplorerTabBar />
        <div class="menubar-controls text-white">
            <span class="hover:bg-gray-800" @click="appWindow.isMinimized.value = true">
                <Icon :icon="ICONS['minimize']" width="20" height="20" />
            </span>
            <span
                class="hover:bg-gray-800"
                @click="appWindow.isMaximized.value = !appWindow.isMaximized.value"
            >
                <Icon
                    :icon="appWindow.isMaximized.value ? ICONS['restore'] : ICONS['maximize']"
                    size="20"
                />
            </span>
            <span class="close" @click="requestClose">
                <Icon :icon="ICONS['close']" width="20" height="20" />
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
        transition: 0.1s cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    .menubar-controls span.close:hover {
        color: white;
        background-color: red;
    }
</style>
