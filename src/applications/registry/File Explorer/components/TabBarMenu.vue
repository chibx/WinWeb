<script lang="ts" setup>
import { useAppAction } from "@/applications";
import { TABS, TAB_KEY, getEndName, inferFolderIcon } from "../utils";
import { uid } from "uid";
import { animate } from "motion";
import { APP_EL } from "@/utils/keys";
import { inject, useTemplateRef, unref, watch } from "vue";
import { ICONS } from "@/utils/icons";
import { Icon } from "@iconify/vue";

const tabs = inject(TABS)!;
const tabKey = inject(TAB_KEY)!;
const appWindowEl = inject(APP_EL)!;
const tabsWrapper = useTemplateRef("tabs-wrapper");
const appAction = useAppAction();

function tabWheel(e: WheelEvent) {
    const tabsWrapEl = unref(tabsWrapper)!;
    tabsWrapEl.scrollBy({ left: e.deltaY, behavior: "smooth" });
}

watch(
    () => tabs.length,
    async (newVal) => {
        if (newVal === 0) {
            await animate(
                appWindowEl.value!,
                {
                    transform: ["scale(1)", "scale(0.75)"],
                    opacity: 0,
                },
                { duration: 0.2 },
            );
            appAction?.close();
        }
    },
);

async function closeTab(key: string) {
    const index = tabs.findIndex((e) => e.key === key);
    if (index === -1) {
        return;
    }

    tabs.splice(index, 1);

    // Transfer active tab to another tab
    const len = tabs.length;
    if (key === tabKey.value && len > 0) {
        // Activate the tab at the same index if there are still tabs to the left
        // i.e index 5 becomes 4 when 4 leaves
        const item = tabs.at(index <= len - 1 ? index : index - 1);
        if (item) {
            tabKey.value = item.key;
        }
    }
}

function addTabs() {
    const entry = {
        key: uid(),
        path: "Home",
    };

    tabs.push(entry);
    tabKey.value = entry.key;
}

function changeTabFocus(e: MouseEvent, key: string) {
    const el = (e.target as HTMLElement)?.closest(".close");
    if (el) {
        return;
    }
    tabKey.value = key;
}
</script>

<template>
    <div class="tabs-wrapper-cont w-[calc(100%-130px)] flex select-none">
        <div ref="tabs-wrapper" class="tabs-wrapper overflow-x-auto flex pl-2.5" @wheel.prevent="tabWheel">
            <div v-for="{ path, key } in tabs" :key="key"
                class="file-exp-tab w-[250px] py-2.5 px-2 flex items-center justify-between cursor-pointer"
                :class="{ 'rounded-t-sm active': key === tabKey }" @click="changeTabFocus($event, key)">
                <div class="flex gap-2.5 items-center">
                    <img :src="inferFolderIcon({ path, pinned: false })" width="25" height="25" draggable="false"
                        :alt="getEndName(path)" />
                    <span class="w-[150px] text-ellipsis overflow-x-hidden whitespace-nowrap select-none">{{
                        getEndName(path)
                    }}
                    </span>
                </div>
                <span aria-label="Close the tab"
                    class="close cursor-pointer p-0.5 rounded-full hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb]"
                    @click="closeTab(key)">
                    <Icon :icon="ICONS['close']" width="20" height="20" />
                </span>
            </div>
        </div>
        <div aria-label="Create File Explorer Tabs"
            class="add-tab text-black rounded-full dark:text-white cursor-pointer ml-2 p-1.5 place-self-center hover:bg-[#dadada] dark:hover:bg-[#41415ebb]"
            @click="addTabs">
            <Icon class="w-5 h-5" :icon="ICONS['plus-r']" width="20" height="20" />
        </div>
    </div>
</template>

<style scoped>
.tabs-wrapper {
    scrollbar-width: none;
}

.tabs-wrapper-cont {
    /* height: 40px; */
    color: black;
}

.dark .tabs-wrapper-cont {
    color: white;
}

/* .dark .file-exp-tab:not(.active) {
} */

.active {
    background-color: white;
}

.dark .active {
    background-color: #41415ebb;
}
</style>
