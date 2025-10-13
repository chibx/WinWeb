<script setup lang="ts">
import { isLoginSuccess, totalUsers, showLogin, delay } from "@/utils/utils";

import LoginWindowsLoading from "@/components/Login/WindowsLoading.vue";
import LoginLockScreen from "@/components/Login/LockScreen.vue";
import GettingWindowsReady from "@/components/GettingWindowsReady.vue";
import WindowsHomeScreen from "@/components/Windows/HomeScreen.vue";
import { LazyLoginWindowsForm } from "@/components/lazy";
import { useUser } from "@/stores/user";
import { ref } from "vue";
import type { User } from "@/types/idb";
import { isDBAvalaible, refreshDB } from "@/utils/idb";
import { preloadBackgrounds } from "@/utils/idb/backgounds";
import { getUsers } from "@/utils/idb/users";
import { useLocalStorage, asyncComputed } from "@vueuse/core";
const gettingWindowsReady = ref(true);

const userStore = useUser();
const isFirstTime = useLocalStorage("first-time", true);
const hideLogin = asyncComputed(async () => {
    const res = isLoginSuccess.value;
    if (res) {
        await delay(1000);
    }
    return res;
});

function $showLogin() {
    // Had to use a function to update this state because TS wouldn't stop yelling `Cannot assign to 'showLogin' because it is a read-only property.`
    // Can't just do `showLogin = true`
    showLogin.value = true;
}

(async function () {
    try {
        let users: User[] = [];
        const isDBValid = await isDBAvalaible();
        if (!isDBValid || isFirstTime.value !== false) {
            localStorage.clear();
            await refreshDB().catch(console.error);
            await preloadBackgrounds();
            users = await getUsers();
            isFirstTime.value = false;
        } else {
            users = await getUsers();
            // TODO change this
            userStore.$patch({
                currentUser: users.find((user) => user.isCurrent == true),
            });
        }
        totalUsers.value = users;
    } catch {}

    await delay(2000);
    gettingWindowsReady.value = false;
})();
</script>

<template>
    <Transition name="fade">
        <GettingWindowsReady v-if="gettingWindowsReady" />
    </Transition>

    <div v-if="!hideLogin" class="h-full overflow-hidden relative text-white" @click="$showLogin">
        <!-- Disable animation until user decides to go to login  -->
        <LoginWindowsLoading :stop-blur="!showLogin">
            <template #default>
                <div class="h-full w-full relative">
                    <Transition name="fade">
                        <div
                            v-if="!showLogin"
                            class="h-full absolute z-[2] select-none flex-col gap-4 w-full flex items-center justify-center"
                        >
                            <LoginLockScreen />
                        </div>
                        <div v-else class="h-full w-full absolute flex justify-center">
                            <LazyLoginWindowsForm />
                        </div>
                    </Transition>
                </div>
            </template>
        </LoginWindowsLoading>
    </div>

    <Transition name="fade">
        <Suspense>
            <WindowsHomeScreen v-if="isLoginSuccess" @contextmenu.prevent="" />
        </Suspense>
    </Transition>
</template>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html,
body,
#app {
    height: 100%;
    overflow: hidden;
}

#app {
    background-color: white;
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.segoe {
    font-family: "Segoe UI", serif;
}

.roboto {
    font-family: "Roboto", serif;
}

.poppins {
    font-family: "Poppins", serif;
}

.gothic-a1 {
    font-family: "Gothic A1", serif;
}

/* .bebas {
  font-family: "Bebas Neue", serif;
} */
</style>
