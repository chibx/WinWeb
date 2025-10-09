<script lang="ts" setup>
import ProfileIcon from "@/components/ProfileIcon.vue";
import type { User } from "@/types/idb";
import { ICONS } from "@/utils/icons";
import { SELECTED_USER } from "@/utils/keys";
import { Icon } from "@iconify/vue";
import { onClickOutside } from "@vueuse/core";
import { animate } from "motion";
import { ref, inject, type Ref, useTemplateRef, watch } from "vue";

const props = defineProps<{
    users: User[];
}>();

const GROUP_HEIGHT = 50;

const isClosed = ref(true);
const selectedUser = inject<Ref<User>>(SELECTED_USER);
const userGroup = useTemplateRef("user-list");
const userGroupContainer = useTemplateRef("user-group-container");
let translateY = Math.min(props.users.length, 4) * GROUP_HEIGHT;

onClickOutside(userGroupContainer, () => (isClosed.value = true));

function selectUser(user: User) {
    if (!selectedUser) return;
    selectedUser.value = user;
    isClosed.value = true;
}

watch(isClosed, (newVal) => {
    if (!userGroup.value) return;
    const el = userGroup.value;
    if (newVal) {
        animate(el!, { y: translateY }, { duration: 0.2 });
        return;
    }
    animate(el!, { y: 0 }, { duration: 0.2 });
});
</script>

<template>
    <div ref="user-group-container" class="w-[200px] select-none">
        <div class="overflow-hidden w-full">
            <div
                ref="user-list"
                :style="{ transform: `translateY(${translateY}px)` }"
                class="user-group glass overflow-y-scroll h-fit max-h-[200px]"
            >
                <!-- :style="{ '--group-height': `${translateY}px` }"  -->
                <button
                    v-for="user in users"
                    :key="user.uid"
                    class="w-full h-fit transition duration-150 flex items-center gap-2.5 px-2.5 py-3 cursor-pointer"
                    @click="selectUser(user)"
                >
                    <ProfileIcon class="icon w-[20px] h-[20px]" :src="user.avatar" />
                    <span
                        :title="selectedUser?.userName"
                        class="overflow-x-hidden max-w-[120px] text-ellipsis whitespace-nowrap"
                        >{{ user.userName }}</span
                    >
                </button>
            </div>
        </div>
        <div
            class="current-user-block cursor-pointer flex items-center justify-between gap-2.5 px-2.5 py-2.5"
            @click="isClosed = !isClosed"
        >
            <div class="flex items-center gap-2.5">
                <ProfileIcon class="w-[20px] h-[20px]" :src="selectedUser?.avatar" />
                <span
                    :title="selectedUser?.userName"
                    class="overflow-x-hidden max-w-[120px] text-ellipsis whitespace-nowrap"
                    >{{ selectedUser?.userName }}</span
                >
            </div>
            <Icon
                role="button"
                :icon="ICONS['chevron-down']"
                class="transition duration-500"
                :class="{ 'rotate-180': isClosed }"
                :aria-label="isClosed ? 'Expand' : 'Collapse'"
            />
        </div>
    </div>
</template>

<style scoped>
.user-group {
    background-color: rgba(255, 255, 255, 0.123);
}

.user-group button:hover {
    background-color: rgba(255, 255, 255, 0.308);
}

.icon :deep(.svg-bg) {
    background-color: rgba(0, 3, 39, 0.25);
}

.current-user-block :deep(.svg-bg) {
    background-color: rgba(255, 255, 255, 0.25);
}

@media (prefers-reduced-motion: no-preference) {
    .user-group {
        transition: all 0.2s;
    }
}

.user-group::-webkit-scrollbar {
    appearance: none;
    width: 2px;
}

.glass {
    background-color: rgba(255, 255, 255, 0.308);
}

.current-user-block {
    background-color: rgba(202, 202, 202, 0.295);
}
</style>
