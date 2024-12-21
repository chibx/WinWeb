<script lang="ts" setup>
const desktop = useDesktop()
const lastBg = useLocalStorage('background', (await getSystemBackgrounds(1))[0].uid)
const bg = await(await idb).get('backgrounds', lastBg.value)
const background = useObjectUrl(() => bg?.data)
let cPicker = ref()

onMounted(() => {
  const audio = new Audio('/audio/startup.mp3');
  audio.play();
})

watch(cPicker, () => {
  desktop.config.taskbar.bgColor = cPicker.value
})
</script>

<template>
  <div class="home-screen h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
    :style="{ ...desktop.desktopVars, backgroundImage: background && `url(${background})` }">
    <input type="color" ref="picker" @change="cPicker = ($event.target as HTMLInputElement).value" />

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