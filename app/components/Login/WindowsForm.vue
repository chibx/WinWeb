<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { showLogin, isLoginSuccess, totalUsers } from "~/utils/utils";

// TODO: Remove this
// await delay(5000);
const userStore = useUser();
const passwordEl = useTemplateRef("passwordEl");
const { focused } = useFocus(passwordEl);
const isPasswordVisible = ref(false);
const isPasswordValid = ref(true);
const isValidating = ref(false);
const password = ref("");

const { currentUser: selectedUser } = storeToRefs(userStore);
useEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        showLogin.value = false;
    }
});

/** AvailableUsers.vue */
provide(SELECTED_USER, selectedUser);
watch(selectedUser, () => {
    focused.value = true;
});

async function validatePassword() {
    if (isValidating.value) return;
    isValidating.value = true;
    const userPassword = selectedUser.value?.password;
    await delay(1000);
    isValidating.value = false;

    if (password.value === userPassword) {
        isLoginSuccess.value = true;
        return;
    }
    isPasswordValid.value = false;
    password.value = "";
}

onMounted(() => {
    setTimeout(() => {
        focused.value = true;
    }, 100);
});
</script>

<template>
    <!-- <button v-if="!isLoginSuccess" class="px-3 py-2 rounded fixed top-10 left-5" aria-label="Go Back" title="Go Back"
        @click="showLogin = false">
        <Icon class="text-white" :name="ICONS['arrow-left']" size="40" />
    </button> -->

    <div class="w-[600px] flex flex-col relative mt-40 gap-5 items-center">
        <ProfileIcon class="login-profile w-[200px] h-[200px]" :src="selectedUser?.avatar" />
        <span class="segoe text-white text-3xl">{{ selectedUser?.userName }}</span>
        <!-- <div></div> -->
        <!-- <input type="text" class="password mt-5" v-model="password" placeholder="Enter your password" /> -->
        <div v-if="!isLoginSuccess">
            <Transition name="lift" mode="out-in" @after-enter="() => passwordEl?.focus()">
                <div v-if="isPasswordValid">
                    <div class="password relative">
                        <input
                            ref="passwordEl"
                            v-model="password"
                            name="password"
                            label="Login Password"
                            :type="isPasswordVisible ? 'text' : 'password'"
                            placeholder="Enter your password"
                            @keypress.enter="validatePassword"
                        />

                        <Icon
                            v-if="isValidating"
                            class="absolute top-1/2 -translate-y-1/2 right-3.5"
                            :name="ICONS['circle']"
                            size="25"
                        />
                        <button
                            v-else
                            class="absolute top-1/2 -translate-y-1/2 right-3.5"
                            :aria-label="isPasswordVisible ? 'Hide Password' : 'Show Password'"
                            :title="isPasswordVisible ? 'Hide Password' : 'Show Password'"
                            @click="isPasswordVisible = !isPasswordVisible"
                        >
                            <Icon :name="isPasswordVisible ? ICONS['eye-closed'] : ICONS['eye-open']" size="25" />
                        </button>
                    </div>
                    <div v-if="selectedUser?.userName == 'User'" class="text-center mt-2.5">
                        Your default password is {{ selectedUser?.password }}
                    </div>
                </div>
                <div
                    v-else
                    class="password-error h-full w-[600px] flex flex-col relative gap-5 items-center justify-center text-center"
                >
                    <div>
                        <div>The password you put is incorrect!</div>
                        <div>Please try again</div>
                    </div>
                    <button @click="isPasswordValid = true">Try again</button>
                </div>
            </Transition>
        </div>
        <div v-else class="mt-5 flex flex-col items-center justify-center">
            <div class="text-center font-medium segoe tracking-wider text-3xl">Please Wait</div>
            <Icon :name="ICONS['spinner']" size="50" class="mt-6" />
        </div>

        <!-- svg-spinners:8-dots-rotate -->
    </div>

    <LoginAvailableUsers v-if="!isLoginSuccess" :users="totalUsers" class="fixed left-2.5 bottom-7" />
    <!-- <DotLoader style="--uib-size: 50px;" /> -->
</template>

<style scoped>
.password {
    color: black;
    width: 400px;
}

.password input {
    width: 100%;
    padding: 7px 5px;
    border-radius: 5px 5px 0 0;
    outline: none;
    border-bottom: 1px solid white;
    color: rgb(255, 255, 255);
    background-color: rgba(0, 0, 0, 0.096);
    letter-spacing: 1px;
}

.password input::placeholder {
    color: white;
}

.password input:focus {
    background-color: rgb(0, 3, 39);
}

.password :deep(svg) {
    color: white;
    opacity: 1;
}

.login-profile :deep(.svg-bg) {
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.2);
    /* background-image: linear-gradient(to bottom, rgba(0, 3, 39, 0.25) 0%, rgba(85, 85, 85, 0.2) 82%, rgba(255, 255, 255, 0.2) 97%); */
}

.password-error button {
    background-color: rgba(0, 0, 0, 0.212);
    color: white;
    outline: 2px solid rgb(255, 255, 255);
    /* border: 1px solid rgb(199, 199, 199); */
    padding: 10px 25px;
    border-radius: 5px;
}

.password-error button:hover {
    background-color: rgba(255, 255, 255, 0.1);
}

@media (prefers-reduced-motion: no-preference) {
    .lift-enter-active,
    .lift-leave-active {
        transition: all 0.2s cubic-bezier(0.55, 0, 0.1, 1);
    }
}

.lift-enter-from,
.lift-leave-to {
    opacity: 0;
    transform: translateY(10px);
}
</style>
