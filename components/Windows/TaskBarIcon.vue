<script lang="ts" setup>
const props = defineProps<{
    icon: string;
    name: string;
    active: boolean
}>()
</script>

<template>
  <div class="icon w-[45px] h-[45px] relative p-2.5 cursor-pointer" :aria-label="name" :title="name">
    <img class="-mt-0.5" :src="icon" :alt="name" />

    <div class="app-open-indicator" :class="{active}"></div>
  </div>
</template>

<style scoped>
.icon {
    border-radius: 2px;
    transition: 0.1s linear;
}

.icon:hover{ 
    background-color: var(--icon-hover-color);
}

.app-open-indicator{
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

.app-open-indicator.active{
  transform: translateX(-50%);
}
</style>