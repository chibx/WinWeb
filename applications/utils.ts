import type { InjectionKey } from "vue"
import type { OpenWindow, OpenWindowDescriptorMap } from "./types"
import { uid } from "uid"

/** @internal */
export const APP_ID: InjectionKey<string> = Symbol()

export const openWindows = shallowRef<OpenWindow[]>([])


/** @param name Application name */
export function createWindowObject(name: string) {
    const obj = {} as OpenWindow;

    return Object.defineProperties(obj, {
        id: {
            writable: false,
            value: uid()
        },
        name: {
            writable: false,
            value: name
        },
        coords: {
            // TODO Change dimensions
            value: reactive({
                height: 0,
                width: 0,
                x: 0,
                y: 0
            })
        },
        isActive: {
            value: shallowRef(true)
        },
        isMinimized: {
            value: shallowRef(false)
        },
        zIndex: {
            value: shallowRef(openWindows.value.length)
        }
    } as OpenWindowDescriptorMap)
}


