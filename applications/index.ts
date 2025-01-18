import type { OpenWindow } from "./types";
import { APP_ID, openWindows } from "./utils"

export async function openApp() {

}

export function useAppAction() {
    const appWindow = useApp()
    if (!appWindow) return;
    return {
        minimize() {
            appWindow.isMinimized.value = true
        },
        focus() {
            appWindow.isActive.value = true
        },
        close() {
            openWindows.value = openWindows.value.filter(el => el.id !== appWindow.id);
        },
    }
}

export function useAppId() {
    return inject(APP_ID)
}

export function useApp() {
    const appId = useAppId();
    if (!appId) return;
    return openWindows.value.find(el => el.id === appId)
}


/** This return the record of all open windows  */
export function useOpenWindows() {
    return openWindows.value
}

/** This gives a list of open apps by name avoid duplicate  */
export function getOpenApps() {
    const set = new Set<string>();
    const windows = useOpenWindows();

    windows.forEach(el => {
        set.add(el.name)
    })

    return Array.from(set.keys())
}

/** @param name The application name. May be undefined */
export function useAppInstances(name?: string) {
    if (!name) {
        name = useApp()?.name
    }

    const instances: OpenWindow[] = openWindows.value.filter(el => el.name === name)
    return instances
}