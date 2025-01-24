import type { InjectionKey } from "vue"
import type { ApplicationProps, OpenWindow, OpenWindowDescriptorMap } from "./types"
import { uid } from "uid"

/** @internal */
export const APP_ID: InjectionKey<string> = Symbol()

export const openWindows = shallowRef<OpenWindow[]>([])


/** 
 * @param name Application name 
 * @param opener Data about the resource that called the app 
*/
export function createWindowObject(name: string, props: ApplicationProps) {
    const obj = {} as OpenWindow;
    const { height, width } = dimensions

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
            // TODO Change dimensions
            value: reactive({
                height: height * 0.6,
                width: width * 0.7,
                x: width * 0.15,
                y: height * 0.2
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


