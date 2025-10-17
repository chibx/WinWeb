<script lang="ts" setup>
import { showLoginForm } from "@/utils/utils";
import { LazyLoginWindowsForm } from "../lazy";
import LoginLockScreen from "@/components/Login/LockScreen.vue";

defineProps<{ disableBlur?: boolean }>();
</script>

<template>
    <div class="h-full fixed z-[0]">
        <div
            class="fixed z-[1] h-full w-full overflow-hidden blur-transition"
            :style="!disableBlur ? { backdropFilter: 'blur(20px)' } : null"
        ></div>
        <img src="/backgrounds/windows_11_logo.webp" class="object-cover fixed h-full w-full" alt="background" />
    </div>

    <div class="h-full w-full relative">
        <Transition name="fade">
            <div
                v-if="!showLoginForm"
                class="h-full absolute z-[2] select-none flex-col gap-4 w-full flex items-center justify-center"
            >
                <LoginLockScreen />
            </div>
            <div v-else class="h-full w-full absolute flex justify-center">
                <LazyLoginWindowsForm />
            </div>
        </Transition>
    </div>
</template>

<style scoped>
.blur-transition {
    transition: 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}
</style>
