<script lang="ts" setup>
import type { ApplicationExpose, ApplicationProps } from "@/applications/types";
import { uid } from "uid";
import { computed, provide, ref, shallowReactive } from "vue";
import FileExplorerMenuBar from "./components/MenuBar.vue";
// import FileExplorerTopMenu from "./components/TopMenu.vue";
import FileExplorerTab from "./components/FileExplorerTab.vue";
import type { FileExplorerTabProp } from "./types";
import { getDataFromProps, PATH, TAB_KEY, TABS } from "./utils";

const props = defineProps<ApplicationProps>();
const rect: ApplicationExpose = {
    minHeight: ref(0),
    minWidth: ref(0),
};
defineExpose(rect);

const initialEntry: FileExplorerTabProp = {
    key: uid(),
    path: getDataFromProps(props),
};
const tabs = shallowReactive<FileExplorerTabProp[]>([initialEntry]);
const tabKey = ref(initialEntry.key);
const $path = computed({
    get: () => {
        const currentTab = tabs.find((tab) => {
            return tab.key === tabKey.value;
        })?.path;

        return currentTab || "Home";
    },
    set: (val) => {
        const currentTab = tabs.find((tab) => {
            return tab.key === tabKey.value;
        });

        if (currentTab) {
            currentTab.path = val;
        }
    },
});

const pinned = ref([]);

provide(PATH, $path);
provide(TABS, tabs);
provide(TAB_KEY, tabKey);
</script>

<template>
    <div class="file-exp w-full h-full flex flex-col">
        <FileExplorerMenuBar />
        <KeepAlive>
            <template v-for="tab in tabs">
                <FileExplorerTab v-if="tabKey === tab.key" :key="tab.key" />
            </template>
        </KeepAlive>

        <!-- <div class="h-full w-full">
            <FileExplorerTopMenu />
        </div> -->
    </div>
</template>

<style scoped>
:global(:root) {
    --exp-bg: white;
}

:global(.dark) {
    --exp-bg: #101022bb;
}

.file-exp {
    background-color: var(--exp-bg);
    backdrop-filter: blur(10px);
}
</style>
