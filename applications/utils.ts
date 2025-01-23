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
export function createWindowObject(name: string, props: ApplicationProps & { manual: boolean }) {
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
        props: {
            writable: false,
            value: props
        },
        manual: {
            value: props.manual
        },
        isActive: {
            value: ref(true)
        },
        isMinimized: {
            value: ref(false)
        },
        zIndex: {
            value: ref(openWindows.value.length)
        },
    } as OpenWindowDescriptorMap)
}


