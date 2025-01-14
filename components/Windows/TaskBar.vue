<script lang="ts" setup>
import { animate } from "motion";
import { stubTaskbarIcons } from "~/utils/desktop";
const ICON_SIZE = 50; // 50px
const SPACE_AFTER_RIGHT_BAR = 16; // 16px

const desktop = useDesktop();

const taskbarEl = useTemplateRef("taskbar");
const innerBar = useTemplateRef("taskbar-inner");
const rightBar = useTemplateRef("taskbar-right");

const isCentered = computed(() => desktop.config.taskbar.iconPosition === "center");
const { charging, level } = inject(BATTERY)!;
const now = useNow();
const taskbarTime = useDateFormat(now, "h:mm A");
const taskbarDate = useDateFormat(now, "MM/DD/YYYY");

let initialClientX = 0;
let initialElX = 0;
let taskbarIconIndex = -1;
let taskbarIcons: HTMLElement[] = [];
let isPointerDown = false;
let focusedTaskbarIcon: HTMLElement | null = null;
let initialTranslateX = 0;

useEventListener(document, "pointerdown", (ev) => {
	if (ev.target && (ev.target as HTMLElement).closest("#taskbar-inner") !== null) {
		focusedTaskbarIcon = (ev.target as HTMLElement).closest(".icon");
		if (!focusedTaskbarIcon) return;
		initialClientX = ev.clientX;
		initialElX = focusedTaskbarIcon!.getBoundingClientRect().left;
		taskbarIconIndex = Array.from(unref(innerBar)?.querySelectorAll(".icon") || []).findIndex((el) => el === focusedTaskbarIcon);
		taskbarIcons = Array.from(unref(innerBar)?.querySelectorAll(".icon") || []);
		const domMatrix = new DOMMatrixReadOnly(getComputedStyle(focusedTaskbarIcon).transform);
		initialTranslateX = domMatrix.m41;
		focusedTaskbarIcon.classList.remove('moving');
		isPointerDown = true;
	}
});
useEventListener(document, "pointerup", () => {
	isPointerDown = false;
	focusedTaskbarIcon?.classList.add('moving');
	focusedTaskbarIcon = null;
});

useEventListener(document, "pointermove", (ev) => {
	const innerBarEl = unref(innerBar);
	if (!isPointerDown || !innerBarEl || !focusedTaskbarIcon) {
		return;
	}

	const { clientX } = ev;
	const { left: innerBarLeft, width: innerBarWidth } = innerBarEl.getBoundingClientRect();

	// Translate x
	let resolvedPos = clientX - initialClientX + initialTranslateX;
	const newLeft = initialElX + resolvedPos;
	// TODO: Fix the position reset when dragging taskbar icons
	if (newLeft <= innerBarLeft) {
		resolvedPos = innerBarLeft - newLeft + resolvedPos;
	} else if (newLeft + ICON_SIZE > innerBarLeft + innerBarWidth) {
		// resolvedPos = resolvedPos - ICON_SIZE - (newLeft - (innerBarLeft + innerBarWidth));
		resolvedPos = (taskbarIcons.length - taskbarIconIndex - 1) * ICON_SIZE;
	}
	// --------------------------------------------------------

	const isGoingLeft = clientX < initialClientX
	const inferredLeft = (focusedTaskbarIcon.getBoundingClientRect().left - innerBarLeft)
	// This is the index of the closest hovered icon based on position
	const inferredIndex = Math.floor(inferredLeft / ICON_SIZE)
	const pixelHovered = inferredLeft % ICON_SIZE

	if (clientX < initialClientX) {
		// console.log(inferredIndex, pixelHovered)
		const el = taskbarIcons.at(inferredIndex);
		if (el) {
			const curTranslateX = new DOMMatrixReadOnly(el.style.transform).m41
			if (pixelHovered > 30) {
				el.style.transform = `translateX(${ICON_SIZE + curTranslateX}px)`
			}
		}
	}
	else if (clientX > initialClientX) {
		const el = taskbarIcons.at(inferredIndex);
		if (el) {
			const curTranslateX = new DOMMatrixReadOnly(el.style.transform).m41
			if (pixelHovered > 30) {
				el.style.transform = `translateX(-${ICON_SIZE + curTranslateX}px)`
			}
		}
	}

	focusedTaskbarIcon.style.transform = `translateX(${resolvedPos}px)`;
});

watch(
	() => desktop.config.taskbar.iconPosition,
	async (newPos) => {
		const innerBar = document.querySelector("#task-wrapper");
		if (!innerBar) {
			return;
		}
		const style =
			newPos === "center"
				? {
					transform: ["translate(0, -50%)", "translate(-50%, -50%)"],
					left: ["0", "50%"],
				}
				: {
					transform: ["translate(-50%, -50%)", "translate(0, -50%)"],
					left: ["50%", "0"],
				};

		animate(
			innerBar,
			{ ...style, opacity: [0.75, 0, 1] },
			{
				duration: 0.3,
			}
		);
	}
);
</script>

<template>
	<div ref="taskbar" id="taskbar"
		class="fixed z-[999] w-full py-[4px] bottom-0 left-0 place-content-center select-none" @contextmenu.prevent="">
		<div class="w-full">
			<div id="task-wrapper" class="flex items-center gap-0.5 absolute top-1/2 -translate-y-1/2"
				:class="{ 'left-1/2 -translate-x-1/2': isCentered }">
				<WindowsTaskBarIcon name="Start" icon="/icons/windows_11.svg" :rClick />

				<WindowsTaskBarIcon name="Microsoft Copilot" icon="/icons/microsoft-copilot.svg" :rClick />

				<div ref="taskbar-inner" id="taskbar-inner" class="flex items-center">
					<WindowsTaskBarIcon v-for="{ icon, name, rClick } in stubTaskbarIcons" :key="name" :name="name"
						:icon="icon" :rClick="rClick" />
				</div>
			</div>
		</div>

		<div ref="taskbar-right" class="taskbar-right h-full flex gap-[5px] absolute right-4 top-1/2 -translate-y-1/2">
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
						:name="charging ? ICONS['battery-charging'] : level > 0.75 ? ICONS['battery'] : ICONS['battery-half']" />
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
