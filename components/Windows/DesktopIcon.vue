<script lang="ts" setup>
import type { DesktopIcon } from '#build/imports';
const props = defineProps<DesktopIcon>()
// const validator = inject(DRAG_PANE_KEY)!
const hasFocus = ref(false);
const appEl = useTemplateRef('app-icon')
const desktopIcons = inject(DESTOP_ICON_SET);

onClickOutside(appEl, ()=>{
   hasFocus.value=false;
})

onMounted(()=>{
  desktopIcons?.add(appEl.value!)
})

onBeforeUnmount(()=>{
  desktopIcons?.delete(appEl.value!)
})
</script>

<template>
  <div ref="app-icon" @click="hasFocus=true" class="desktop-icon w-[75px] px-2.5 py-1.5" :class="{clicked: hasFocus}" :title="name" :aria-label="name">
    <div class="flex flex-col gap-2.5 justify-center items-center">
      <img :src="props.icon" :alt="name" class="w-[30px]" draggable="false" />
      <div class="icon-name text-xs text-center">
         {{ props.name }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.desktop-icon:hover {
   background-color: #9ae7ff41;
}

.clicked{
  background-color: #2098bd9f;
}

.clicked:hover {
   background-color: #0386ad86;
}
</style>