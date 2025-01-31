<script lang="ts" setup>
import { useAppAction } from '~/applications';
import { TABS, TAB_KEY, getEndName, inferFolderIcon } from '../utils';
import { uid } from 'uid';

const tabs = inject(TABS)!
const tabKey = inject(TAB_KEY)!
const tabsWrapper = useTemplateRef('tabs-wrapper')
const appAction = useAppAction()

function tabWheel(e: WheelEvent) {
  const tabsWrapEl = unref(tabsWrapper)!
  tabsWrapEl.scrollBy({ left: e.deltaY, behavior: 'smooth' })
}

watch(() => tabs.length, (newVal) => {
  if (newVal === 0) {
    appAction?.close()
  }
})

async function closeTab(key: string) {
  const index = tabs.findIndex((e) => e.key === key);
  if (index === -1) { return }
  const old = tabs.splice(index, 1)
  // Transfer active tab to another tab
  const len = tabs.length;
  if (key === tabKey.value && len > 0) {
    console.log('yo')
    // Activate the tab at the same index if there are still tabs to the left 
    // i.e index 5 becomes 4 when 4 leaves
    const item = tabs.at((index <= len - 1) ? index : index - 1)
    if (item) {
      tabKey.value = item.key
      console.log(old[0].key, tabs.find((e) => e.key === item.key)?.key, tabKey.value)
    }
  }
}

watch(tabKey, (n) => {
  console.log(n)
})

function addTabs() {
  const entry = {
    key: uid(),
    path: 'Home',
  };

  tabs.push(entry)
  tabKey.value = entry.key;
}

function changeTabFocus(e: MouseEvent, key: string) {
  const el = (e.target as HTMLElement)?.closest('.close');
  if (el) { return }
  tabKey.value = key
}
</script>

<template>
  <div class="tabs-wrapper-cont w-[calc(100%-130px)] flex select-none">
    <div ref="tabs-wrapper" @wheel.prevent="tabWheel" class="tabs-wrapper overflow-x-auto flex pl-2.5">
      <div v-for="{ path, key }, index in tabs" @click="changeTabFocus($event, key)"
        class="file-exp-tab w-[250px] py-2.5 px-2 flex items-center justify-between"
        :class="{ 'rounded-t-lg active': key === tabKey }">
        <div class="flex gap-2.5 items-center">
          <img :src="inferFolderIcon({ path, pinned: false })" width="25" height="25" draggable="false"
            :alt="getEndName(path)">
          <span class="w-[150px] text-ellipsis overflow-x-hidden whitespace-nowrap select-none">{{
            getEndName(path) }}</span>
        </div>
        <span aria-label="Close the tab" class="close p-0.5 rounded-full" @click="closeTab(key)">
          <Icon :name="ICONS['close']" size="20" />
        </span>
      </div>
    </div>
    <div aria-label="Create File Explorer Tabs" class="add-tab p-2.5 cursor-pointer flex items-center justify-center"
      @click="addTabs">
      <Icon :name="ICONS['plus-r']" size="20" />
    </div>
  </div>
</template>

<style scoped>
.tabs-wrapper {
  scrollbar-width: none;
}

.file-exp-tab {
  background-color: transparent;
}

.file-exp-tab:not(.active) {
  box-shadow: inset 0 -10px 20px rgba(0, 15, 83, 0.534);
}

.active {
  background-color: rgb(77, 77, 117);
}
</style>