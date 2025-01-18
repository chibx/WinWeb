<script lang="ts" setup>
import type { ApplicationExpose, ApplicationProps } from '~/applications/types';

defineProps<ApplicationProps>()
const rect: ApplicationExpose = {
    minHeight: ref(0),
    minWidth: ref(0)
}
</script>

<template>
    <div>

    </div>
</template>

<style scoped></style>