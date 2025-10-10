<script lang="ts" setup>
import { Icon } from "@iconify/vue";
import { ICONS } from "@/utils/icons";
</script>
<template>
    <div
        class="ready h-full w-full fixed top-0 left-0 z-10 flex flex-col items-center justify-start"
        aria-label="Getting Windows ready"
    >
        <img src="/icons/windows_11.svg" alt="Windows 11 Logo" class="windows" width="200" height="200" />
        <Icon :icon="ICONS['spinner']" width="50" height="50" class="mt-[250px] text-white" />
    </div>
</template>

<style scoped>
.ready {
    background-color: #020018;
}

.windows {
    margin-top: 100px;
}
</style>
