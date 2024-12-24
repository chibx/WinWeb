<script lang="ts" setup>
const props = defineProps<{
    validator?: (e: MouseEvent)=>boolean
}>()

const dragEl = useTemplateRef('dragEl');
// const dragParent = useTemplateRef('dragParent');
let pointValidator: (e: PointerEvent) => boolean = props.validator || (() => true);

const x = ref(0);
const y = ref(0);
const left = ref<number>();
const top = ref<number>()
const width = ref<number>()
const height = ref<number>()
const isMouseDown = ref(false)
// let mouseUpStop: (() => void) | undefined
// provide(DRAG_PANE_KEY, (func) => {
//     pointValidator = func
// })



useEventListener(document, 'pointerdown', setCoords)
useEventListener(document, 'pointerup', () => {
    isMouseDown.value = false;
    width.value = 0;
    height.value = 0;
})
useEventListener(document, 'pointermove', dragPane)

function setCoords(e: PointerEvent) {
    if (e.button == 1 || !pointValidator(e)) { return }
    left.value = x.value = e.clientX;
    top.value = y.value = e.clientY;
    isMouseDown.value = true
    console.log(e.clientX, e.clientY)
}

function dragPane(e: MouseEvent) {
    if(!isMouseDown.value){return}
    const xdiff = e.clientX - x.value
    const ydiff = e.clientY - y.value
    if (xdiff < 0) {
        // user goes left behind x.value
        left.value = x.value - Math.abs(x.value - e.clientX)
    }
    else {
        left.value = x.value;
    }
    if (ydiff < 0) {
        // user goes up before y.value
        top.value = y.value - Math.abs(y.value - e.clientY);
    }
    else {
        top.value = y.value;
    }
    width.value = Math.abs(e.clientX - x.value)
    height.value = Math.abs(e.clientY - y.value)
}

// watch(isMouseDown, () => {
//     if (isMouseDown.value) {
//         mouseUpStop = useEventListener(document, 'pointermove', dragPane)
//         return
//     }
//     mouseUpStop?.()
//     mouseUpStop = undefined
// })

onMounted(()=>{})
</script>

<template>
        <div class="drag-pane absolute z-[900]" ref="dragEl"
            :style="{ width: width && `${width}px`, height: height && `${height}px`, left: `${left}px`, top: `${top}px` }">
        </div>
        <slot />
</template>

<style scoped>
.drag-pane {
    /* border: 1px solid blue; */
    background-color: rgba(82, 163, 255, 0.733);
}
</style>