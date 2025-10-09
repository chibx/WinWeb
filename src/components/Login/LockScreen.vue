<script lang="ts" setup>
import { showLogin } from "@/utils/utils";
import { formatDate, useEventListener, useNow } from "@vueuse/core";
import { computed } from "vue";

const now = useNow();
const time = computed(() => formatDate(now.value, "HH:mm"));
const dateStr = computed(() => formatDate(now.value, "dddd, MMM DD YYYY"));

useEventListener("keydown", (e) => {
    if (e.code === "Space" || e.key === "Enter") {
        showLogin.value = true;
    }
});
</script>

<template>
    <div class="h-full text-white flex flex-col gap-2.5 items-center pt-10 gothic-a1">
        <div class="text-9xl font-bold">{{ time }}</div>
        <div class="text-2xl tracking-widest roboto">{{ dateStr }}</div>
    </div>
</template>

<style scoped></style>
