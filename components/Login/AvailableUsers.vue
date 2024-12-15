<script lang="ts" setup>
defineProps<{
    users: User[]
}>()

const GROUP_HEIGHT = 48;

const isClosed = ref(true)
const selectedUser = inject<Ref<User>>('selectedUser')
const userGroup = useTemplateRef('user-group')
const userGroupContainer = useTemplateRef('user-group-container')
onClickOutside(userGroupContainer, () => isClosed.value = true)



function selectUser(user: User) {
    if (!selectedUser) return
    selectedUser.value = user
    isClosed.value = true
}

watch(isClosed, (newVal) => {
    if (!userGroup.value) return;
    const el = userGroup.value;
    if (newVal) {
        // el.style.height = '0px'
        el.style.transform = `translateY(${el.scrollHeight/2}px) scaleY(0)`;
        return
    }
    el.style.transform = `translateY(0px) scaleY(1)`;
})
</script>

<template>
        <div class="w-[200px]" ref="user-group-container">
            <div ref="user-group" :style="`--group-height: ${(users.length * GROUP_HEIGHT)/2}px`" class="user-group glass overflow-y-scroll h-fit max-h-[200px]">
                <button v-for="user in users"
                    class="w-full h-fit transition duration-150 flex items-center gap-2.5 px-2.5 py-3 cursor-pointer"
                    @click="selectUser(user)">
                    <ProfileIcon class="icon w-[20px] h-[20px]" :src="user.avatar" />
                    <span :title="selectedUser?.userName" class="overflow-x-hidden max-w-[120px] text-ellipsis whitespace-nowrap">{{ user.userName }}</span>
                </button>
            </div>
            <div class="current-user-block cursor-pointer flex items-center justify-between gap-2.5 px-2.5 py-2.5"
                @click="isClosed = !isClosed">
                <div class="flex items-center gap-2.5">
                    <ProfileIcon class="w-[20px] h-[20px]" :src="selectedUser?.avatar" />
                    <span :title="selectedUser?.userName" class="overflow-x-hidden max-w-[120px] text-ellipsis whitespace-nowrap">{{ selectedUser?.userName }}</span>
                </div>
                <Icon role="button" name="material-symbols:expand-more" class="transition duration-500"
                    :class="{ 'rotate-180': !isClosed }" :aria-label="isClosed ? 'Expand' : 'Collapse'" />
            </div>
        </div>
</template>

<style scoped>
.user-group {
    background-color: rgba(255, 255, 255, 0.123);
    transform: translateY(var(--group-height)) scaleY(0);
    /* height: 0px; */
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
        transition: all 0.3s;
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

/* .user-group button{
    padding: 10px 5px
} */
</style>