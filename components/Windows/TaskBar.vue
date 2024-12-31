<script lang="ts" setup>
import { animate } from "motion/mini";
import { stubTaskbarIcons } from '~/utils/desktop';
const desktop = useDesktop();
const innerBar = useTemplateRef("taskbar-inner");
const isCentered = ref(desktop.config.taskbar.iconPosition === "center");
const { charging, level } = inject(BATTERY)!
const now = useNow()
const taskbarTime = useDateFormat(now, 'h:mm A')
const taskbarDate = useDateFormat(now, 'MM/DD/YYYY')

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
	<div id="taskbar" class="fixed z-[999] w-full py-[4px] bottom-0 left-0 place-content-center select-none">
		<div class="w-full">
			<div ref="taskbar-inner" class="flex items-center gap-0.5 absolute top-1/2 -translate-y-1/2"
				:class="{ 'left-1/2 -translate-x-1/2': isCentered }">
				<!-- <WindowsTaskBarIcon :active="false" name="Start" icon="/icons/windows_11.svg" />
				<WindowsTaskBarIcon :active="false" name="File Explorer" icon="/icons/explorer.svg" />
				<WindowsTaskBarIcon :active="false" name="Google Chrome" icon="/icons/chrome.svg" />
				<WindowsTaskBarIcon :active="true" name="VLC Media Player" icon="/icons/vlc.svg" /> -->

				<WindowsTaskBarIcon v-for="{ icon, name, rClick } in stubTaskbarIcons" :key="name" :name="name"
					:icon="icon" :rClick="rClick" />

			</div>
		</div>



	<div class="taskbar-right h-full flex gap-[5px] absolute right-4 top-1/2 -translate-y-1/2">
		<div class="chevron-ic">
			<Icon :name="ICONS['chevron-up']" />
		</div>

		<div class="adjustible-icons h-full flex">
			<div>
				<Icon :name="ICONS['online']" />
			</div>

			<!-- :title="charging ? `${chargingTime} ${level * 100}%` : `${dischargingTime} ${level * 100}%`" -->
			<div :title="`${level * 100}% left`">
				<Icon
					:name="charging ? ICONS['battery-charging'] : (level > 0.75) ? ICONS['battery'] : ICONS['battery-half']" />
			</div>

			<div>
				<Icon :name="ICONS['volume-high']" />
			</div>
		</div>

		<div class="date-group h-full flex items-center">
			<div class="flex flex-col text-right text-sm px-[5px]">
				<div>{{ taskbarTime }}</div>
				<div>{{ taskbarDate }}</div>
			</div>
			<div>
				<Icon :name="ICONS['notification']" />
			</div>
		</div>
	</div>

	</div>
</template>

<style scoped>
#taskbar {
	background: #1b0027;
	background: var(--taskbar-bg);
	transition: 0.15s linear;
	min-height: 50px;
	z-index: 3;
}

.chevron-ic {
	padding: 0 7px;
}

.adjustible-icons > div {
	padding: 0 7px;
}

.chevron-ic,
.adjustible-icons > div,
.date-group > div {
	height: 100%;
	place-content: center;
	cursor: pointer;
}

.chevron-ic:hover,
.adjustible-icons > div:hover {
	background-color: rgba(255, 255, 255, 0.26);
}

.date-group > div:last-child {
	padding: 0 15px;
}

.date-group > div:hover {
	background-color: rgba(255, 255, 255, 0.26);
}
</style>