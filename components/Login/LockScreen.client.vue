<script lang="ts" setup>
const now = useNow();

const time = useDateFormat(now, 'HH:mm');
const dateStr = useDateFormat(now, 'dddd, MMM DD YYYY');

</script>

<template>
    <div class="h-full text-white flex flex-col gap-2.5 items-center pt-10 segoe">
        <div class="text-9xl font-bold gothic-a1">{{ time }}</div>
        <div class="text-2xl">{{ dateStr }}</div>
    </div>
</template>

<style scoped></style>