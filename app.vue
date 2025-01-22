<script setup lang="ts">
import { BATTERY } from './utils/keys';
import { isLoginSuccess, totalUsers, showLogin } from './utils/utils';

const gettingWindowsReady = ref(true)
const dimensions = reactive(useWindowSize());
const battery = useBattery()

provide(WINDOW_SIZE, dimensions);
provide(BATTERY, battery)

const userStore = useUser();
const isFirstTime = useLocalStorage('first-time', true)
const hideLogin = asyncComputed(async () => {
  const res = isLoginSuccess.value;
  if (res) {
    await delay(1000)
  }
  return res
});

function $showLogin() {
  // Had to use a function to update this state because TS wouldn't stop yelling `Cannot assign to 'showLogin' because it is a read-only property.`
  showLogin.value = true
}

// const HomeScreen = defineAsyncComponent({
//   loader: async () => {
//     return delay(1500).then(() => import('@/components/Windows/HomeScreen.client.vue').then(res => (hasAssetLoaded.value = true, res.default)))
//   }
// })

(async function () {
  try {
    let users: User[] = [];
    const isDBValid = await isDBAvalaible()
    if (!isDBValid || isFirstTime.value !== false) {
      localStorage.clear();
      await refreshDB().catch(console.error);
      await preloadBackgrounds()
      users = await getUsers();
      isFirstTime.value = false;
    }
    else {
      users = await getUsers();
      // TODO change this
      userStore.$patch({ currentUser: users.find((user) => user.isCurrent == true) });
    }
    totalUsers.value = users;
  } catch { }

  await delay(2000);
  gettingWindowsReady.value = false;
})()
</script>

<template>
  <Transition name="fade">
    <GettingWindowsReady v-if="gettingWindowsReady" />
  </Transition>

  <div v-if="!hideLogin" class="h-full overflow-hidden relative text-white" @click="$showLogin">
    <!-- Disable animation until user decides to go to login  -->
    <LoginWindowsLoading :stopBlur="!showLogin">
      <template #default>
        <div class="h-full w-full relative">

          <Transition name="fade">
            <div v-if="!showLogin"
              class="absolute select-none flex-col gap-4 h-full w-full flex items-center justify-center">
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
    <WindowsHomeScreen v-if="isLoginSuccess" @contextmenu.prevent="" />
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
#__nuxt {
  height: 100%;
  overflow: hidden;
}

#__nuxt {
  background-color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: all .5s ease;
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

.bebas {
  font-family: "Bebas Neue", serif;
}
</style>