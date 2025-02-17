<script lang="ts" setup>
import type { TaskBarIcon } from '#build/imports';
import { openApp, getAppWindows } from '~/applications';
const props = defineProps<TaskBarIcon>()
const openWindows = getAppWindows();
const openInstances = computed(() => {
  return openWindows.value.filter(win => win.name === props.name)
})

function iconClick() {
  const numOfInstances = openInstances.value.length;
  if (numOfInstances > 0) {
    if (numOfInstances === 1) {
      openInstances.value[0].isMinimized.value = false
    }
    else {

    }
  }
  else {
    openApp(props.name)
  }
}
</script>

<template>
  <div class="icon moving w-[50px] h-[50px] relative p-2.5 cursor-pointer flex justify-center" :data-name="name"
    @click="iconClick" @auxclick="openApp(name)" :aria-label="name" :title="name" @contextmenu.prevent="rClick">
    <img class="-mt-0.5 w-[25px] h-[25px]" :src="icon" :alt="name" draggable="false" />

    <div class="app-open-indicator" :class="{ 'active': openInstances.length > 0 }"></div>
  </div>
</template>

<style scoped>
.icon {
  border-radius: 2px;
  transition: background-color 0.1s linear;
}

.icon:hover {
  background-color: var(--icon-hover-color);
}

.app-open-indicator {
  position: absolute;
  bottom: 4px;
  left: 50%;
  transform: translateX(-50%) scaleX(0.4);
  height: 5px;
  width: 20px;
  background-color: pink;
  border-radius: 20px;
  transition: 0.2s ease;
}

.app-open-indicator.active {
  transform: translateX(-50%);
}

.moving {
  transition: transform 0.12s ease-out;
}
</style>