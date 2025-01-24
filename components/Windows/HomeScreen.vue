<script lang="ts" setup>
import { getAppWindows } from "~/applications/index";
import type { DragPaneCoords } from "~/types/desktop";
import { desktopIcons, keyboardKeys } from "~/utils/utils";

const desktop = useDesktop();
const lastBg = useLocalStorage("background", (await getSystemBackgrounds(1))[0].uid);
const bg = await idb.get("backgrounds", lastBg.value);
const background = useObjectUrl(bg?.data);
const isPointerDown = ref(false);
const homeEl = useTemplateRef('home-screen')
const openWindows = getAppWindows()

const validator = (ev: MouseEvent) => {
	// console.time('res')
	// Ensure the mouse is really on the home-screen element and not on other apps that did not register the event-listener
	const res = (ev.target as Element).closest('#taskbar') === null && (ev.target as Element).closest('#desk-house') !== null && (ev.target as Element).closest('.desktop-icon') === null
	// && ![...desktopIcons].some(([el]) => {
	// 	const element = unref(el);
	// 	if (!element) { 
	// 		return;
	// 	}
	// 	const { left: cl, top: ct, width: cw, height: ch } = element.getBoundingClientRect();
	//  return ev.clientX >= cl && ev.clientX <= cl + cw && ev.clientY >= ct && ev.clientY <= ct + ch;
	// });
	// console.timeEnd('res')
	return res;
};

function onDrag(_: MouseEvent, { height, left, top, width, x, y }: DragPaneCoords) {
	// console.time('res')
	const right = left + width;
	const bottom = top + height;

	desktopIcons.forEach(([el, focused]) => {
		const element = unref(el);
		if (!element) {
			return;
		}
		const { left: cl, top: ct, width: cw, height: ch } = element.getBoundingClientRect();
		const cr = cl + cw;
		const cb = ct + ch;
		const isDraggingLeft = left < x
		const isDraggingUp = top < y

		const inScope = (height > 0 && width > 0) && (
			(!isDraggingLeft && !isDraggingUp && bottom > ct + 20 && right > cl + 15 && y < cb - 20 && x < cr - 15) ||
			(isDraggingLeft && !isDraggingUp && bottom > ct + 20 && left < cr - 15 && y < cb - 20 && x > cr - 15) ||
			(isDraggingLeft && isDraggingUp && top < cb - 20 && left < cr - 15 && y > ct + 20 && x > cr - 15) ||
			(!isDraggingLeft && isDraggingUp && top < cb - 20 && right > cl + 15 && y > ct - 20 && x < cr - 15)
		);

		focused.value = inScope;
	});
	// console.timeEnd('res')
}

useEventListener(homeEl, 'mousedown', (ev) => {
	const deskEl = (ev.target as HTMLElement).closest('.desktop-icon');
	const { shift, ctrl } = keyboardKeys;
	const isKeyModPressed = ctrl || shift
	if (!deskEl && !isKeyModPressed) { desktopIcons.forEach(([, focused]) => { focused.value = false }); return }
	desktopIcons.forEach(([el, focused]) => {
		if (el.value === deskEl) {
			// TODO There is an illogical bug where the left click does not work but the right click unfocuses as expected 🤷🏼‍♂️
			if (isKeyModPressed && focused.value === true) {
				focused.value = false
			}
			else {
				focused.value = true
			}
		}
		else if (!isKeyModPressed) {
			focused.value = false
		}
	});
	isPointerDown.value = true
})

onMounted(() => {
	const audio = new Audio("/audio/startup.mp3");
	audio.play();
});
</script>

<template>
	<div :style="desktop.desktopVars" ref="home" class="text-white">
		<div ref="home-screen"
			class="home-screen select-none h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
			:style="{ backgroundImage: background && `url(${background})` }">
			<WindowsDragPane :canDrag="validator" :onMove="onDrag">
				<div id="desk-house" class="h-full py-2.5 jsdjlj">

					<WindowsDesktopIcon v-for="{ icon, name, rClick } in stubDesktopIcons.slice(0, 5)" :name :icon
						:rClick></WindowsDesktopIcon>

					<button style="background-color: black; padding: 20px;"
						@click="desktop.config.taskbar.iconPosition = (desktop.config.taskbar.iconPosition == 'center') ? 'left' : 'center'">
						Toggle pos
					</button>

				</div>
			</WindowsDragPane>
		</div>


		<ApplicationWindowWrapper
			v-for="{ id, coords, isActive, isMinimized, manual, name, props, zIndex, isMaximized } in openWindows"
			:id="id" :name="name" :coords="coords" :zIndex="zIndex" :isActive="isActive" :isMinimized="isMinimized"
			:isMaximized="isMaximized" :manual="manual" :props="props" :key="id" />


		<WindowsTaskBar />
	</div>
</template>

<style scoped>
.home-screen {
	background-repeat: no-repeat;
	background-size: cover;
	/* z-index: 1; */
}
</style>
