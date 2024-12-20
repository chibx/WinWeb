<script lang="ts" setup>
const background = ref('/backgrounds/background_6.webp')

</script>

<template>
  <div class="home-screen h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
    :style="{ backgroundImage: `url(${background})` }">

  </div>
  <WindowsTaskBar />
</template>

<style scoped>
.home-screen {
  background-repeat: no-repeat;
  background-size: cover;
}
</style>