<script lang="ts" setup>
import type { ShallowRef } from "vue";
import type { DragPaneCoords } from "~/types/desktop";

const desktop = useDesktop();
const desktopIcons = new Set<[Readonly<ShallowRef<HTMLElement | null>>, Ref<boolean, boolean>]>();
const lastBg = useLocalStorage("background", (await getSystemBackgrounds(1))[0].uid);
const bg = await (await idb).get("backgrounds", lastBg.value);
const background = useObjectUrl(bg?.data);
const isPointerDown = ref(false);
const homeEl = useTemplateRef('home-screen')
const focusedIcons = ref([])
provide(DESTOP_ICON_SET, desktopIcons);

const validator = (ev: MouseEvent) => {
	// console.time('res')
	const res = ![...desktopIcons].some(([el]) => {
		const element = unref(el);
		if (!element) {
			return;
		}
		const { left: cl, top: ct, width: cw, height: ch } = element.getBoundingClientRect();
		return ev.clientX >= cl && ev.clientX <= cl + cw && ev.clientY >= ct && ev.clientY <= ct + ch;
	});
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

useEventListener(homeEl, 'pointerdown', (ev) => {
	const deskEl = (ev.target as HTMLElement).closest('.desktop-icon');
	if (!deskEl) { desktopIcons.forEach(([, focused]) => {focused.value=false});return }

	desktopIcons.forEach(([el, focused]) => { 
		if(unref(el)===deskEl){
        focused.value = true
		}
		else{
			focused.value=false
		}
	});
	isPointerDown.value=true
})

useEventListener(homeEl, 'pointermove', (ev) => {
	// if(!isPointerDown.value){return}

	// const deskEl = (ev.target as HTMLElement).closest('.desktop-icon');
	// if (!deskEl) { desktopIcons.forEach(([, focused]) => {focused.value=false});return }

	// desktopIcons.forEach(([el, focused]) => { 
	// 	if(unref(el)===deskEl){
    //     focused.value = true
	// 	}
	// 	else{
	// 		focused.value=false
	// 	}
	// })
})

onMounted(() => {
	const audio = new Audio("/audio/startup.mp3");
	audio.play();
});
</script>

<template>
	<div :style="desktop.desktopVars" ref="home">
		<div ref="home-screen"
			class="home-screen select-none h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
			:style="{ backgroundImage: background && `url(${background})` }">
			<WindowsDragPane :canDrag="validator" :onMove="onDrag">
				<div class="h-full desk-house py-2.5 jsdjlj">
					<!-- <WindowsDesktopIcon name="File Explorer" icon="/icons/explorer.svg"
						:rClick="() => ({} as DesktopIcon['rClick'])" />
					<WindowsDesktopIcon name="Google Chrome" icon="/icons/chrome.svg"
						:rClick="() => ({} as DesktopIcon['rClick'])" />
					<WindowsDesktopIcon name="Mozilla Firefox" icon="/icons/firefox.svg"
						:rClick="() => ({} as DesktopIcon['rClick'])" />
					<WindowsDesktopIcon name="Microsoft Store" icon="/icons/microsoft_store.svg"
						:rClick="() => ({} as DesktopIcon['rClick'])" /> -->

					<WindowsDesktopIcon v-for="{ icon, name, rClick } in stubDesktopIcons" :name :icon :rClick ></WindowsDesktopIcon>

					<!-- <button style="background-color: black; padding: 20px;"
						@click="desktop.config.taskbar.iconPosition = (desktop.config.taskbar.iconPosition == 'center') ? 'left' : 'center'">
						Toggle pos
					</button> -->
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

:deep(.desk-house) {
	
}
</style>
