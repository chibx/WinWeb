<script lang="ts" setup>
const desktop = useDesktop();
const desktopIcons = new Set<HTMLElement>()
const lastBg = useLocalStorage('background', (await getSystemBackgrounds(1))[0].uid)
const bg = await(await idb).get('backgrounds', lastBg.value)
const background = useObjectUrl(bg?.data)
const homeEl = useTemplateRef('home')
provide(DESTOP_ICON_SET, desktopIcons);

const validator = (ev: MouseEvent) => {
  // console.time('res')
  const res = ![...desktopIcons].some((el)=>{
        const { left: cl, top: ct, width: cw, height: ch } = el.getBoundingClientRect()
        return ((ev.clientX >= cl) && (ev.clientX <= (cl + cw))) && (ev.clientY >= ct) && (ev.clientY <= (ct + ch))
  });
  // console.timeEnd('res')
  return res 
}

onMounted(() => {
  const audio = new Audio('/audio/startup.mp3');
  audio.play();
})
</script>

<template>
  <div :style="desktop.desktopVars" ref="home">
    <div class="home-screen select-none h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
      :style="{ backgroundImage: background && `url(${background})` }">
      <WindowsDragPane :validator="validator">
        <div class="h-full py-2.5 jsdjlj">
          <WindowsDesktopIcon name="File Explorer" icon="/icons/explorer.svg"
            :rClick="() => ({} as DesktopIcon['rClick'])" />
          <WindowsDesktopIcon name="Google Chrome" icon="/icons/chrome.svg"
            :rClick="() => ({} as DesktopIcon['rClick'])" />
          <WindowsDesktopIcon name="Mozilla Firefox" icon="/icons/firefox.svg"
            :rClick="() => ({} as DesktopIcon['rClick'])" />
        </div>
      </WindowsDragPane>

    </div>

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