<script lang="ts" setup>
const props = defineProps<{ stopBlur?: boolean }>();
</script>

<template>
    <div class="relative z-[0]">
        <div class="fixed z-[1] h-full w-full overflow-hidden blur-transition"
        :style="!stopBlur ? { backdropFilter: 'blur(20px)' } : null">
    </div>
    <img src="/backgrounds/windows_11_logo.webp" class="object-cover fixed h-full w-full" alt="background">
</div>
    <slot />
</template>

<style scoped>
.blur-transition {
    transition: 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>