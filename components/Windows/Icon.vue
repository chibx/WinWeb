<script lang="ts" setup>
const props = defineProps<{
    icon: string;
    name: string
}>()
</script>

<template>
  <div class="icon w-[40px] h-[40px] p-[5px]" :aria-label="name" :title="name">
    <img :src="icon" :alt="name" />
  </div>
</template>

<style scoped>
.icon {
    background-color: rgba(255, 255, 255, 0.199);
    border-radius: 2px;
}
</style>