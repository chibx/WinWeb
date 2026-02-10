<script setup lang="ts">
import FileControlPanel from "./ControlPanel.vue";
import FileActionPanel from "./ActionPanel.vue";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
</script>

<template>
    <FileControlPanel />
    <FileActionPanel />
    <div class="h-full">
        <ResizablePanelGroup class="w-full h-full" direction="horizontal">
            <ResizablePanel :default-size="22" :min-size="20" :max-size="28">
                <div class="sidebar"></div>
            </ResizablePanel>
            <ResizableHandle class="bg-[#eeeeee] dark:bg-[#58588ebb]" />
            <ResizablePanel>
                <div class="main-view"></div>
            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
</template>

<style scoped></style>
