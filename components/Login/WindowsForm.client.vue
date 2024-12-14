<script lang="ts" setup>
import type { User } from '~/types/idb';
import { addUser, deleteAllUsers } from '~/utils/idb/users';
import { delay } from '~/utils/idb';

// TODO: Remove this
// await delay(5000);
const userStore = useUser();
const passwordEl = useTemplateRef('passwordEl');
const { focused } = useFocus(passwordEl, {initialValue: true});
const isFirstTime = useLocalStorage('first-time', true)
const isPasswordVisible = ref(false)
const isPasswordValid = ref(true);
const canGoThrough = ref(false);
const isValidating = ref(false)
const password = ref("");
const totalUsers = ref<User[]>([])
const showLogin = inject<Ref<boolean>>('showLogin')!;
const isLoginSuccess = inject<Ref<boolean>>('isLoginSuccess')!;
const { currentUser: selectedUser } = storeToRefs(userStore)

provide('selectedUser', selectedUser);
watch(selectedUser, () => {
    focused.value = true
})


const debouncedBack = useDebounceFn(() => {
    showLogin.value = false; 
}, 200);

try {
    let users: User[] = [];
    // const isFirstTime = localStorage.getItem('first-time');
    if (isFirstTime.value !== false) {
        const { refreshDB: refreshUser } = await import('~/utils/idb/users');
        await refreshUser();
        isFirstTime.value=false;
    }
    else {
        users = await getUsers();
        // TODO change this
        userStore.$patch({ currentUser: users.find((user) => user.isCurrent == true) });
    }
    totalUsers.value = users;
    console.log("user:", userStore.currentUser!.userName);
} catch{}


</script>

<template>
    <div class="w-[600px] flex flex-col relative mt-40 gap-5 items-center">
            <button class="px-3 py-2 rounded fixed top-10 left-5" aria-label="Go Back" title="Go Back" @click="debouncedBack">
                <Icon class="text-white" name="material-symbols:arrow-left-alt-rounded" size="40" />
            </button>


        <ProfileIcon class="login-profile w-[200px] h-[200px]"  :src="selectedUser?.avatar" />
        <span class="segoe text-white text-3xl">{{ selectedUser?.fullName }}</span>
        <!-- <div></div> -->
        <!-- <input type="text" class="password mt-5" v-model="password" placeholder="Enter your password" /> -->
        <div v-if="isPasswordValid" class="password relative">
            <input ref="passwordEl" name="password" v-model="password" :type="isPasswordVisible? 'text':'password'" placeholder="Enter your password" />
            
            <button class="absolute top-1/2 -translate-y-1/2 right-3.5" @click="isPasswordVisible = !isPasswordVisible">
                <Icon v-if="isValidating" name="i-svg-spinners:ring-resize" size="25" />
                <Icon v-else-if="isPasswordVisible" name="akar-icons:eye-closed" size="25" />
                <Icon v-else name="akar-icons:eye-open" size="25" />
            </button>
        </div>

        <LoginAvailableUsers :users="totalUsers" class="fixed left-2.5 bottom-7" />
    </div>
    <!-- <DotLoader style="--uib-size: 50px;" /> -->
</template>

<style scoped>
.password {
    color: black;
    width: 400px;
}

.password input{
   width: 100%;
   padding: 5px 5px;
   outline: none;
   border-bottom: 1px solid white;
   color: rgb(255, 255, 255);
   background-color: rgba(0, 0, 0, 0.096);
}

.password input::placeholder{
    color: white;
}

.password input:focus{
    background-color: rgb(0, 3, 39);
}

.password :deep(svg){
    color: white;
    opacity: 1;
}

.login-profile :deep(.svg-bg){
    /* background-color: rgba(0, 3, 39, 0.25); */
    padding: 20px;
    background-image: linear-gradient(to bottom, rgba(0, 3, 39, 0.25) 0%, rgba(85, 85, 85, 0.2) 82%, rgba(255, 255, 255, 0.2) 97%);
}
</style>