<script setup lang="ts">
import { ICONS } from '@/utils/icons';
import { Icon } from '@iconify/vue';
import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"

</script>

<template>
    <HoverCard :close-delay="50" :open-delay="100">
        <div>
            <HoverCardTrigger>
                <button
                    class="rounded-md cursor-pointer flex items-center gap-1.5 px-5 py-3 text-gray-950 dark:text-white hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb]">
                    <Icon :icon="ICONS['plus-circle']" />
                    <span>
                        New
                    </span>
                    <Icon :icon="ICONS['chevron-down']" />
                </button>
            </HoverCardTrigger>
            <HoverCardContent class="ml-32 p-2.5" as-child>
                <div tabindex="1" class=" min-w-[100px] text-sm bg-gray-300 dark:bg-[#090916bb]">
                    <button tabindex="1"
                        class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                        <img src="/icons/folder.svg" alt="Folder" class="w-5 h-5" />
                        <span>Folder</span>
                    </button>
                    <button tabindex="1"
                        class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                        <img src="/icons/shortcut.png" alt="" class="w-5 h-5" />
                        <span>Shortcut</span>
                    </button>
                    <button tabindex="1"
                        class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                        <img src="/icons/notes.png" alt="Text Document" class="w-5 h-5" />
                        <span>Text Document</span>
                    </button>
                    <button tabindex="1"
                        class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                        <img src="/icons/zip.webp" alt="Compressed Folder" class="w-5 h-5" />
                        <span>Compressed Folder</span>
                    </button>
                </div>
            </HoverCardContent>
        </div>
    </HoverCard>
</template>

<style scoped></style>