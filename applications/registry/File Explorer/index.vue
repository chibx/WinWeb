<script lang="ts" setup>
import type { ApplicationExpose, ApplicationProps } from '~/applications/types';

const props = defineProps<ApplicationProps>()
const rect: ApplicationExpose = {
    minHeight: ref(0),
    minWidth: ref(0)
}
defineExpose(rect)

</script>

<template>
    <div>

    </div>
</template>

<style scoped></style>