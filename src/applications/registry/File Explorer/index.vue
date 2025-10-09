<script lang="ts" setup>
    import { uid } from "uid";
    import type { ApplicationExpose, ApplicationProps } from "@/applications/types";
    import FileExplorerMenuBar from "./components/MenuBar.vue";
    import FileExplorerTopMenu from "./components/TopMenu.vue";
    import { getDataFromProps, PATH, TAB_KEY, TABS } from "./utils";
    import type { FileExplorerTabProp } from "./types";
    import { ref, shallowReactive, computed, provide } from "vue";

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
        <div class="h-full w-full">
            <FileExplorerTopMenu />
        </div>
    </div>
</template>

<style scoped>
    .file-exp {
        background-color: rgba(16, 16, 34, 0.733);
        backdrop-filter: blur(10px);
    }
</style>
