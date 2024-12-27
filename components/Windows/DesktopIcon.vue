<script lang="ts" setup>
import type { DesktopIcon } from '#build/imports';
import type { ShallowRef } from 'vue';
const props = defineProps<DesktopIcon>()
// const validator = inject(DRAG_PANE_KEY)!
const hasFocus = ref(false);
const appEl = useTemplateRef('app-icon')
const desktopIcons = inject(DESTOP_ICON_SET);
const desktopIconInfo = [appEl, hasFocus] as [Readonly<ShallowRef<HTMLElement | null>>, Ref<boolean, boolean>]
// const instance = getCurrentInstance()
// let state: any
// let id: any;
// nextTick(()=>{
//   state = instance?.vnode.component?.setupState
//   id = setInterval(()=>{
//     state.hasFocus = !state.hasFocus
//   }, 5000)
// })

onClickOutside(appEl, () => {
  hasFocus.value = false;
})

onMounted(() => {
  desktopIcons?.add(desktopIconInfo)
})

onBeforeUnmount(() => {
  // clearInterval(id)
  desktopIcons?.delete(desktopIconInfo)
})
</script>

<template>
  <div ref="app-icon" @click="hasFocus = true" class="desktop-icon w-[75px] h-fit px-2.5 py-1.5" :class="{ clicked: hasFocus }"
    :title="name" :aria-label="name">
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

.clicked {
  background-color: #2098bd9f;
}

.clicked:hover {
  background-color: #0386ad86;
}
</style>