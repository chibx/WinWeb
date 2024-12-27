<script lang="ts" setup>
import { animate } from "motion/mini";
const desktop = useDesktop();
const innerBar = useTemplateRef("taskbar-inner");
const isCentered = ref(desktop.config.taskbar.iconPosition === "center");

watch(
	() => desktop.config.taskbar.iconPosition,
	async (newPos) => {
		// let animationControl: ReturnType<typeof animate> | undefined
		if (!innerBar.value) {
			return;
		}
		if (newPos === "center") {
			await animate(
				innerBar.value,
				{
					transform: ["translate(0, -50%)", "translate(-50%, -50%)"],
					left: ["0", "50%"],
				},
				{ duration: 0.3, ease: "linear" },
			);
			isCentered.value = true;
			return;
		}
		await animate(
			innerBar.value,
			{
				transform: ["translate(-50%, -50%)", "translate(0, -50%)"],
				left: ["50%", "0"],
			},
			{ duration: 0.3, ease: "linear" },
		);
		isCentered.value = false;
	},
);
</script>

<template>
  <div class="taskbar fixed z-[999] w-full py-[4px] bottom-0 left-0 place-content-center">
    <div class="w-full">
      <div ref="taskbar-inner" class="flex items-center gap-0.5 absolute top-1/2 -translate-y-1/2"
      :class="{'left-1/2 -translate-x-1/2': isCentered}"
        >
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
  background: #1b0027;
  background: var(--taskbar-bg);
  transition: 0.15s linear;
  min-height: 50px;
  z-index: 3;
}
</style>