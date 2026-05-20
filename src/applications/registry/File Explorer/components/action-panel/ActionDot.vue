<script setup lang="ts">
import { ICONS } from '@/utils/icons';
import { Icon } from '@iconify/vue';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuGroup, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { callWithDelay, noop } from '@/utils/utils';
import { ref } from 'vue';
import FEPinIcon from '../icons/FEPinIcon.vue';
import FEGridSelectedIcon from '../icons/FEGridSelectedIcon.vue';
import FEGridUnSelectedIcon from '../icons/FEGridUnSelectedIcon.vue';
import FEInvertSelectedIcon from '../icons/FEInvertSelectedIcon.vue';
import FEWrenchIcon from '../icons/FEWrenchIcon.vue';
import FESettingsIcon from '../icons/FESettingsIcon.vue';


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
                class="cursor-pointer flex items-center gap-1.5 p-2.5 rounded-[10px] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                <Icon :icon="ICONS['3dots']" />
            </button>
        </DropdownMenuTrigger>
        <OnClickOutside @trigger="closeMenu">
            <DropdownMenuContent class="p-1.5 mt-1.5 bg-gray-100 dark:bg-[#090916bb]">
                <DropdownMenuGroup class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <!-- <FEUndoIcon class="text-[#41415ebb] dark:text-[#eeeeee]" /> -->
                                <Icon :icon="ICONS['undo']" class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Undo</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <FEPinIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Pin to Quick access</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <FEGridSelectedIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Select all</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <FEGridUnSelectedIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Select none</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <FEInvertSelectedIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Invert selection</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup class=" min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <FEWrenchIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Properties</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span>
                                <FESettingsIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Options</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </OnClickOutside>
    </DropdownMenu>
</template>

<style scoped></style>