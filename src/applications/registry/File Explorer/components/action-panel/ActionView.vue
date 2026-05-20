<script setup lang="ts">
import { ICONS } from "@/utils/icons";
import { Icon } from "@iconify/vue";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { callWithDelay, noop } from "@/utils/utils";
import { ref } from "vue";
import { OnClickOutside } from "@vueuse/components";
import { ChevronRight } from "lucide-vue-next";
import ExtraLargeViewIcon from "../icons/ExtraLargeViewIcon.vue";
import LargeViewIcon from "../icons/LargeViewIcon.vue";
import MediumViewIcon from "../icons/MediumViewIcon.vue";
import SmallViewIcon from "../icons/SmallViewIcon.vue";
import ListViewIcon from "../icons/ListViewIcon.vue";
import DetailsViewIcon from "../icons/DetailsViewIcon.vue";
import DetailsPaneIcon from "../icons/DetailsPaneIcon.vue";
import PreviewPaneIcon from "../icons/PreviewPaneIcon.vue";

const isMenuOpen = ref(false);
let _open = noop;

let _close = noop;

function openMenu() {
    _close();
    if (isMenuOpen.value) return;
    _open = callWithDelay(() => {
        isMenuOpen.value = true;
    }, 200);
}

function closeMenu() {
    _open();
    if (!isMenuOpen.value) return;
    _close = callWithDelay(() => {
        isMenuOpen.value = false;
    }, 200);
}
</script>

<template>
    <DropdownMenu v-model:open="isMenuOpen">
        <DropdownMenuTrigger as-child>
            <button
                class="cursor-pointer flex items-center gap-1.5 px-3 py-2 hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]"
                @pointerdown="openMenu">
                <Icon :icon="ICONS['list']" />
                <span> View </span>
                <Icon :icon="ICONS['chevron-down']" />
            </button>
        </DropdownMenuTrigger>
        <OnClickOutside @trigger="closeMenu">
            <DropdownMenuContent class="p-1.5 mt-1.5 bg-gray-100 dark:bg-[#090916bb]">
                <DropdownMenuGroup tabindex="1" class="min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <ExtraLargeViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Extra large icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <LargeViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Large icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <MediumViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Medium-sized icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <SmallViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Small icons</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <ListViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>List</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <DetailsViewIcon class="text-[#41415ebb] dark:text-[#eeeeee]" />
                            </span>
                            <span>Details</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup tabindex="1" class="min-w-[200px] text-sm">
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <DetailsPaneIcon class="dark:text-[#eeeeee]" />
                            </span>
                            <span>Details Pane</span>
                        </button>
                    </DropdownMenuItem>
                    <DropdownMenuItem as-child>
                        <button tabindex="1"
                            class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                            <span class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                            <span>
                                <PreviewPaneIcon class="w-full dark:text-[#eeeeee]" />
                            </span>
                            <span>Preview Pane</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator class="my-1.5" />
                <DropdownMenuGroup tabindex="1" class="min-w-[200px] text-sm">
                    <DropdownMenuSub>
                        <DropdownMenuItem as-child>
                            <DropdownMenuSubTrigger as-child>
                                <button tabindex="1"
                                    class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                                    <span class="p-0.5 bg-transparent"></span>
                                    <div class="w-full flex items-center justify-between">
                                        <span>Show</span>
                                        <ChevronRight class="text-[#757575bb] dark:text-[#eeeeee]" />
                                    </div>
                                </button>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent class="bg-gray-100 dark:bg-[#090916bb]">
                                    <DropdownMenuGroup class=" min-w-[200px] text-sm">
                                        <DropdownMenuItem as-child>
                                            <button tabindex="1"
                                                class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                                                <span>
                                                    <span
                                                        class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                                                    <Icon :icon="ICONS['undo']"
                                                        class="text-[#41415ebb] dark:text-[#eeeeee]" />
                                                </span>
                                                <span>Navigation Pane</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator class="my-1.5" />
                                    <DropdownMenuGroup class=" min-w-[200px] text-sm">
                                        <DropdownMenuItem as-child>
                                            <button tabindex="1"
                                                class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                                                <span
                                                    class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                                                <span>
                                                    <Icon :icon="ICONS['undo']"
                                                        class="text-[#41415ebb] dark:text-[#eeeeee]" />
                                                </span>
                                                <span>Compact View</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator class="my-1.5" />
                                    <DropdownMenuGroup class=" min-w-[200px] text-sm">
                                        <DropdownMenuItem as-child>
                                            <button tabindex="1"
                                                class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                                                <span
                                                    class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                                                <span>
                                                    <Icon :icon="ICONS['undo']"
                                                        class="text-[#41415ebb] dark:text-[#eeeeee]" />
                                                </span>
                                                <span>Item check boxes</span>
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem as-child>
                                            <button tabindex="1"
                                                class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                                                <span
                                                    class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                                                <span>
                                                    <Icon :icon="ICONS['undo']"
                                                        class="text-[#41415ebb] dark:text-[#eeeeee]" />
                                                </span>
                                                <span>File name extensions</span>
                                            </button>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem as-child>
                                            <button tabindex="1"
                                                class="cursor-pointer w-full flex gap-2.5 pl-2 py-2.5 focus:bg-[#e8e9e8] hover:bg-[#e8e9e8] dark:hover:bg-[#41415ebb]">
                                                <span
                                                    class="p-0.5 rounded-full bg-[#41415ebb] dark:bg-[#eeeeee]"></span>
                                                <span>
                                                    <Icon :icon="ICONS['undo']"
                                                        class="text-[#41415ebb] dark:text-[#eeeeee]" />
                                                </span>
                                                <span>Hidden items</span>
                                            </button>
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuItem>
                    </DropdownMenuSub>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </OnClickOutside>
    </DropdownMenu>
</template>

<style scoped></style>
