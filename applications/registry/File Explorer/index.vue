<script lang="ts" setup>
import type { ApplicationExpose, ApplicationProps } from '~/applications/types';
import FileExplorerMenuBar from './components/MenuBar.vue';

const props = defineProps<ApplicationProps>()
const rect: ApplicationExpose = {
    minHeight: ref(0),
    minWidth: ref(0)
}
defineExpose(rect)

</script>

<template>
    <div class="w-full h-full flex flex-col">
        <FileExplorerMenuBar />
        <div class="h-full w-full bg-black">

        </div>
    </div>
</template>

<style scoped></style>