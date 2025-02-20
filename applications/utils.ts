import type { ApplicationProps, OpenWindow, OpenWindowDescriptorMap } from "./types"
import { uid } from "uid"

export const TASKBAR_HEIGHT = 50;

export const openWindows = shallowRef<OpenWindow[]>([])

/** 
 * @param name Application name 
 * @param opener Data about the resource that called the app 
*/
export function createWindowObject(name: string, props: ApplicationProps) {
    const obj = {} as OpenWindow;
    const { height, width } = screenDimensions

    return Object.defineProperties(obj, {
        id: {
            writable: false,
            value: uid(15)
        },
        name: {
            writable: false,
            value: name
        },
        coords: {
            value: reactive({
                height: (height - TASKBAR_HEIGHT) * 0.8,
                width: width * 0.7,
                x: width * 0.15,
                y: (height - TASKBAR_HEIGHT) * 0.1
            })
        },
        props: {
            writable: false,
            value: props
        },
        isActive: {
            value: ref(true)
        },
        isMinimized: {
            value: ref(false)
        },
        isMaximized: {
            value: ref(false)
        },
        zIndex: {
            value: ref(openWindows.value.length)
        },
    } as OpenWindowDescriptorMap)
}


export function getTaskIconX(appName: string) {
    const taskbarIconEl = document.querySelector(`#task-wrapper [data-name="${appName}"]`)

    return taskbarIconEl?.getBoundingClientRect().left
}