<script lang="ts" setup>
const lastBg = useLocalStorage('background', (await getAllBackgrounds(1))[0].uid)
const bg = await (await idb).get('backgrounds', lastBg.value)
const background = useObjectUrl(bg?.data)

onMounted(()=>{
  const audio = new Audio('/audio/startup.mp3');
  audio.play()
})
</script>

<template>
  <div class="home-screen h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
    :style="{ backgroundImage: background && `url(${background})` }">

    <WindowsTaskBar />
  </div>
</template>

<style scoped>
.home-screen {
  background-repeat: no-repeat;
  background-size: cover;
  z-index: 2;
}
</style>