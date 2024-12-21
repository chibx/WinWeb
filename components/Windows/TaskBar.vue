<script lang="ts" setup>

</script>

<template>
  <div class="taskbar fixed w-full py-[4px] bottom-0 left-0 place-content-center">
     <div class="w-full">
        <div class="flex items-center gap-0.5">
          <WindowsTaskBarIcon name="Start" icon="/icons/windows_11.svg" />
          <WindowsTaskBarIcon name="File Explorer" icon="/icons/explorer.svg" />
          <WindowsTaskBarIcon name="Google Chrome" icon="/icons/chrome.svg" />
          <WindowsTaskBarIcon name="VLC Media Player" icon="/icons/vlc.svg" />
        </div>
     </div>
     <div>
        
     </div>
  </div>
</template>

<style scoped>
.taskbar {
     /* background: #333333; */
     background: var(--taskbar-bg);
     transition: 0.15s linear;
     min-height: 50px;
     z-index: 3;
}
</style>