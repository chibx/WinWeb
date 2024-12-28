<script lang="ts" setup>
import type { ShallowRef } from "vue";
import type { DragPaneCoords } from "~/types/desktop";

const desktop = useDesktop();
const desktopIcons = new Set<[Readonly<ShallowRef<HTMLElement | null>>, Ref<boolean, boolean>]>();
const lastBg = useLocalStorage("background", (await getSystemBackgrounds(1))[0].uid);
const bg = await (await idb).get("backgrounds", lastBg.value);
const background = useObjectUrl(bg?.data);
// const homeEl = useTemplateRef('home')
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

onMounted(() => {
	const audio = new Audio("/audio/startup.mp3");
	audio.play();
});
</script>

<template>
	<div :style="desktop.desktopVars" ref="home">
		<div class="home-screen select-none h-full w-full fixed top-0 left-0 overflow-hidden bg-blue-950"
			:style="{ backgroundImage: background && `url(${background})` }">
			<WindowsDragPane :canDrag="validator" :onMove="onDrag" />
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
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 20px;
}
</style>
