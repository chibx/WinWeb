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


const showLogin = ref(false);
const isLoginSuccess = ref(false);
provide('isLoginSuccess', isLoginSuccess);
provide('showLogin', showLogin); 
</script>

<template>
  <div class="h-full overflow-hidden relative" @click="showLogin = true">
    <!-- Disable animation until user decides to go to login  -->
    <LoginWindowsLoading :stopBlur="!showLogin">
      <template #default>
        <div class="h-full w-full relative z-[2]">
          <!-- <Transition name="fade-lift">
            <div v-if="!showLogin"
              class="absolute select-none z-10 flex-col gap-4 h-full w-full flex items-center justify-center">
              <LockScreen />
            </div>
          </Transition>
          <div class="h-full w-full absolute flex justify-center">
            <Transition name="lift" mode="in-out">
              <WindowsLogin v-if="showLogin" />
            </Transition>
          </div> -->

          <Transition name="fade-lift">
            <div v-if="!showLogin"
              class="absolute select-none z-10 flex-col gap-4 h-full w-full flex items-center justify-center">
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

.fade-lift-enter-active,
.fade-lift-leave-active {
  transition: all .5s ease;
}

.fade-lift-enter-from,
.fade-lift-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {

  .lift-enter-active,
  .lift-leave-active {
    transition: all 1s cubic-bezier(0.55, 0, 0.1, 1);
  }
}

.lift-enter-from,
.lift-leave-to {
  opacity: 0;
  transform: translateY(400px);
  filter: blur(30px);

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

.gothic {
  font-family: "Gothic A1", serif;
}

.bebas {
  font-family: "Bebas Neue", serif;
}
</style>