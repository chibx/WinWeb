<script setup lang="ts">
import { ICONS } from '@/utils/icons';
import { Icon } from '@iconify/vue';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { callWithDelay, noop } from '@/utils/utils';
import { ref } from 'vue';
import { OnClickOutside } from '@vueuse/components';
import { ChevronRight } from 'lucide-vue-next';
import ExtraLargeViewIcon from '@/components/icons/ExtraLargeViewIcon.vue';
import LargeViewIcon from '@/components/icons/LargeViewIcon.vue';
import MediumViewIcon from '@/components/icons/MediumViewIcon.vue';
import SmallViewIcon from '@/components/icons/SmallViewIcon.vue';
import ListViewIcon from '@/components/icons/ListViewIcon.vue';
import DetailsViewIcon from '@/components/icons/DetailsViewIcon.vue';
import DetailsPaneIcon from '@/components/icons/DetailsPaneIcon.vue';
import PreviewPaneIcon from '@/components/icons/PreviewPaneIcon.vue';

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
                <Icon :icon="ICONS['list']" />
                <span>
                    View
                </span>
                <Icon :icon="ICONS['chevron-down']" />
            </button>
        </DropdownMenuTrigger>
        <OnClickOutside @trigger="closeMenu">
            <DropdownMenuContent class="p-2.5 bg-gray-100 dark:bg-[#11112bbb]">
                <DropdownMenuGroup tabindex="1" class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <ExtraLargeViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Extra large icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <LargeViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Large icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <MediumViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Medium-sized icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <SmallViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Small icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <ListViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>List</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <DetailsViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Details</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup tabindex="1" class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <DetailsPaneIcon class="dark:text-[#eeeeee]" />
                            </span>
                            <span>Details Pane</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb] focus:outline outline-gray-900 dark:outline-white">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <PreviewPaneIcon class="w-full dark:text-[#eeeeee]" />
                            </span>
                            <span>Preview Pane</span>
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
                                <span>Show</span>
                                <ChevronRight class="text-[#757575bb] dark:text-[#eeeeee]" />
                            </div>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </OnClickOutside>
    </DropdownMenu>
</template>

<style scoped></style>