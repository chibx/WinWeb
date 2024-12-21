<script lang="ts" setup>
const props = defineProps<{
    icon: string;
    name: string
}>()
</script>

<template>
  <div class="icon w-[45px] h-[45px] py-[7px] px-2.5 cursor-pointer" :aria-label="name" :title="name">
    <img :src="icon" :alt="name" />
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
</style>