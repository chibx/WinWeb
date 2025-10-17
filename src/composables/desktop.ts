import type { DragPaneCoords } from "@/types/desktop";
import { noop_true } from "@/utils/utils";
import { useEventListener } from "@vueuse/core";
import { reactive, ref } from "vue";

type useDragPaneOptions = {
    canDrag?: (e: MouseEvent) => boolean;
    onMove?: (e: MouseEvent, coords: DragPaneCoords) => void;
    target?: HTMLElement;
};

export function useDragPane({ canDrag = noop_true, onMove, target = document.documentElement }: useDragPaneOptions) {
    const coords = reactive({
        x: 0,
        y: 0,
        left: 0,
        top: 0,
        width: 0,
        height: 0,
    });
    const dragEl = ref<HTMLElement>();
    // const dragParent = useTemplateRef('dragParent');
    const isMouseDown = ref(false);

    useEventListener(target, "mousedown", setCoords);
    useEventListener(target, "mouseup", () => {
        isMouseDown.value = false;
        coords.width = 0;
        coords.height = 0;
    });
    useEventListener(target, "mousemove", dragPane, { passive: true });

    function setCoords(e: PointerEvent) {
        if (e.button === 1 || !canDrag(e)) {
            return;
        }
        coords.left = coords.x = e.clientX;
        coords.top = coords.y = e.clientY;
        isMouseDown.value = true;
    }

    function dragPane(e: MouseEvent) {
        if (!isMouseDown.value) {
            return;
        }
        const xdiff = e.clientX - coords.x;
        const ydiff = e.clientY - coords.y;
        if (xdiff < 0) {
            // user goes left behind coords.x
            coords.left = coords.x - Math.abs(coords.x - e.clientX);
        } else {
            coords.left = coords.x;
        }
        if (ydiff < 0) {
            // user goes up before coords.y
            coords.top = coords.y - Math.abs(coords.y - e.clientY);
        } else {
            coords.top = coords.y;
        }
        coords.width = Math.abs(e.clientX - coords.x);
        coords.height = Math.abs(e.clientY - coords.y);
        onMove?.(e, coords);
    }

    return [dragEl, coords, isMouseDown] as const;
}
