<script lang="ts" setup>

</script>

<template>
  <div class="taskbar fixed w-full py-[2.5px] bottom-0 left-0 place-content-center">
     <div class="w-full">
        <div class="flex items-center gap-0.5">
          <WindowsIcon name="Start" icon="/icons/windows_11.svg" />
          <WindowsIcon name="File Explorer" icon="/icons/explorer.svg" />
          <WindowsIcon name="Google Chrome" icon="/icons/chrome.svg" />
          <WindowsIcon name="VLC Media Player" icon="/icons/vlc.svg" />
        </div>
     </div>
  </div>
</template>

<style scoped>
.taskbar {
     background: rgb(230, 230, 230);
     min-height: 50px;
     z-index: 3;
}
</style>