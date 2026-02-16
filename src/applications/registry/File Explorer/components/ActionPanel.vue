<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
import { ICONS } from '@/utils/icons';
import { Icon } from '@iconify/vue';
import ActionNew from './action-panel/ActionNew.vue';

</script>

<template>
    <div class="w-full bg-white dark:bg-transparent px-2 py-1.5 border-y border-[#c9c9c9] dark:border-white/50">
        <div class="w-full overflow-x-auto">
            <div class="flex gap-2">
                <div class="flex gap-2.5">
                    <ActionNew />
                    <Separator class="bg-[#eeeeee] dark:bg-[#58588ebb]" orientation="vertical" />
                </div>
                <div class="flex items-center gap-2 text-gray-950 dark:text-white">
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['scissors']" />
                    </button>
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['copy']" />
                    </button>
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['paste']" />
                    </button>
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['rename']" />
                    </button>
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['share']" />
                    </button>
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['delete']" />
                    </button>
                    <Separator class="bg-[#eeeeee] dark:bg-[#58588ebb]" orientation="vertical" />
                </div>
                <div class="flex gap-2.5 text-gray-950 dark:text-white">
                    <button
                        class="cursor-pointer flex items-center gap-1.5 px-3 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb]">
                        <Icon :icon="ICONS['sort']" />
                        <span>
                            Sort
                        </span>
                        <Icon :icon="ICONS['chevron-down']" />
                    </button>
                    <button
                        class="cursor-pointer flex items-center gap-1.5 px-3 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb]">
                        <Icon :icon="ICONS['list']" />
                        <span>
                            View
                        </span>
                        <Icon :icon="ICONS['chevron-down']" />
                    </button>
                    <button
                        class="cursor-pointer flex items-center gap-1.5 px-3 py-2 hover:bg-[#eeeeee] dark:hover:bg-[#41415ebb]">
                        <Icon :icon="ICONS['filter']" />
                        <span>
                            Filter
                        </span>
                        <Icon :icon="ICONS['chevron-down']" />
                    </button>
                    <Separator class="bg-[#eeeeee] dark:bg-[#58588ebb]" orientation="vertical" />
                </div>
                <div class="flex items-center">
                    <button class="sq-menu-btn">
                        <Icon :icon="ICONS['3dots']" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sq-menu-btn {
    cursor: pointer;
    padding: 10px;
    border-radius: calc(0.625rem - 2px);
}

.active-menu-btn {
    background-color: #eeeeee;
}

.dark .active-menu-btn {
    background-color: #41415ebb;
}

.sq-menu-btn:hover {
    background-color: #eeeeee;
}

.dark .sq-menu-btn:hover {
    background-color: #41415ebb;
}
</style>
