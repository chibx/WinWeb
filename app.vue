<script setup lang="ts">

useHead({
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com"
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous"
    },
    {
      href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Gothic+A1:wght@400;700&family=Poppins:wght@400;500;700&family=Roboto:wght@500;700&display=swap",
      rel: "stylesheet"
    }
  ]
})


const gettingWindowsReady = ref(true)
const showLogin = ref(false);
const isLoginSuccess = ref(false);
const hasAssetLoaded = ref(false);
const totalUsers = ref<User[]>([]);
const dimensions = reactive(useWindowSize());

provide(IS_LOGIN_SUCCESS, isLoginSuccess);
provide(WINDOW_SIZE, dimensions);
provide(IS_ASSET_LOADED, hasAssetLoaded);
provide(SHOW_LOGIN, showLogin);
provide(TOTAL_USERS, totalUsers);


const userStore = useUser();
const isFirstTime = useLocalStorage('first-time', true)
const hideLogin = asyncComputed(async () => {
  const res = isLoginSuccess.value && hasAssetLoaded.value;
  if(res){
    await delay(1000)
  }
  return res
})

const HomeScreen = defineAsyncComponent({
  loader: async () => {
    return delay(1500).then(() => import('~/components/Windows/HomeScreen.client.vue').then(res => (hasAssetLoaded.value = true, res.default)))
  }
})

if (import.meta.browser) {
  (async function() {
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
    gettingWindowsReady.value=false;
  })()
}

watch(isLoginSuccess, (newVal) => {
  if (newVal && !hasAssetLoaded.value) {
    // TODO THIS INTERNAL METHOD COULD CHANGE ANYTIME
    HomeScreen?.__asyncLoader?.();
  }
})
</script>

<template>
  <Transition name="fade">
    <GettingWindowsReady v-if="gettingWindowsReady" />
  </Transition>

  <ClientOnly>
    <div v-if="!hideLogin" class="h-full overflow-hidden relative" @click="showLogin = true">
      <!-- Disable animation until user decides to go to login  -->
      <LoginWindowsLoading :stopBlur="!showLogin">
      <template #default>
        <div class="h-full w-full relative z-[1]">

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
</ClientOnly>

  <Transition name="fade" mode="in-out">
    <HomeScreen v-if="hasAssetLoaded" />
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