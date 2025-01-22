<script lang="ts" setup>
import { showLogin } from '~/utils/utils';

const now = useNow();
const time = useDateFormat(now, 'HH:mm');
const dateStr = useDateFormat(now, 'dddd, MMM DD YYYY');

useEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.key === 'Enter') {
        showLogin.value = true
    }
})

</script>

<template>
    <div class="h-full text-white flex flex-col gap-2.5 items-center pt-10 segoe">
        <div class="text-9xl font-bold">{{ time }}</div>
        <div class="text-2xl">{{ dateStr }}</div>
    </div>
</template>

<style scoped></style>