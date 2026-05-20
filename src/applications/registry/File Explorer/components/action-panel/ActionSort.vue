<script setup lang="ts">
import { ICONS } from '@/utils/icons';
import { Icon } from '@iconify/vue';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { ref } from 'vue';
import { callWithDelay, noop } from '@/utils/utils';
import { OnClickOutside } from '@vueuse/components';
import { ChevronRightIcon } from 'lucide-vue-next';

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
                <Icon :icon="ICONS['sort']" />
                <span>
                    Sort
                </span>
                <Icon :icon="ICONS['chevron-down']" />
            </button>
        </DropdownMenuTrigger>
        <OnClickOutside @trigger="closeMenu">
            <DropdownMenuContent class="p-1.5 mt-1.5 bg-gray-100 dark:bg-[#090916bb]">
                <DropdownMenuGroup tabindex="1" class="min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>Name</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>Date</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>Type</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 bg-transparent"></span>
                            <div class="w-full flex items-center justify-between">
                                <span>More</span>
                                <ChevronRightIcon class="text-[#757575bb] dark:text-[#eeeeee]" />
                            </div>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup tabindex="1" class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>Ascending</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>Descending</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup tabindex="1" class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 bg-transparent"></span>
                            <div class="w-full flex items-center justify-between">
                                <span>Group by</span>
                                <ChevronRightIcon class="text-[#757575bb] dark:text-[#eeeeee]" />
                            </div>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </OnClickOutside>
    </DropdownMenu>
</template>

<style scoped></style>