<script setup lang="ts">
import { ICONS } from '@/utils/icons';
import { Icon } from '@iconify/vue';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup } from "@/components/ui/dropdown-menu"
import { ref } from 'vue';
import { callWithDelay, noop } from '@/utils/utils';
import { OnClickOutside } from '@vueuse/components';
// import { HoverCard, HoverCardTrigger, HoverCardContent } from "@/components/ui/hover-card"


const isMenuOpen = ref(false)
let _open = noop

let _close = noop

function openMenu() {
    _close()
    if (isMenuOpen.value) return;
    _open = callWithDelay(() => {
        isMenuOpen.value = true
    }, 200)
}

function closeMenu() {
    _open()
    if (!isMenuOpen.value) return;
    _close = callWithDelay(() => {
        isMenuOpen.value = false
    }, 200)
}
</script>

<template>
    <DropdownMenu v-model:open="isMenuOpen">
        <DropdownMenuTrigger as-child>
            <button
                class="cursor-pointer flex items-center gap-1.5 px-3 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb]"
                @pointerdown="openMenu">
                <Icon :icon="ICONS['plus-circle']" />
                <span>
                    New
                </span>
                <Icon :icon="ICONS['chevron-down']" />
            </button>
        </DropdownMenuTrigger>
        <OnClickOutside @trigger="closeMenu">
            <DropdownMenuContent class="ml-28 mt-1.5 p-1.5 bg-gray-100 dark:bg-[#090916bb]">
                <DropdownMenuGroup tabindex="1" class="min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <img src="/icons/folder.svg" alt="Folder" class="w-5 h-5" />
                            <span>Folder</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <img src="/icons/shortcut.png" alt="" class="w-5 h-5" />
                            <span>Shortcut</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <img src="/icons/notes.png" alt="Text Document" class="w-5 h-5" />
                            <span>Text Document</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <img src="/icons/zip.webp" alt="Compressed Folder" class="w-5 h-5" />
                            <span>Compressed Folder</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </OnClickOutside>
    </DropdownMenu>
</template>

<style scoped></style>