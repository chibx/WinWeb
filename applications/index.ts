import type { Application, ApplicationConfig, ApplicationProps, OpenWindow, SpecialComponent } from "./types";
import { APP_ID, createWindowObject, openWindows } from "./utils"

let registry: Application[] | undefined;
const installedApps: Set<string> = new Set()

export async function loadApplicationRegistry() {
    if (registry) return registry;
    try {
        registry = await import('./registry/index').then(c => c.default);
    } catch {
        // TODO Write Error
    }
}

export function getAppRegistry() {
    return registry
}

export function getInstalledApps() {
    return registry?.filter(el => installedApps.has(el.name)) || []
}

export async function openApp(name: string, data: ApplicationProps = {}) {
    await loadApplicationRegistry().catch()
    const $app = registry?.find(app => app.name === name);
    if (!$app) return false // |Application not found|

    // Initialize once
    if ($app.config instanceof Function) {
        $app.config = await $app.config().then(c => c.default) as ApplicationConfig
    }

    if ($app.instance instanceof Function) {
        $app.instance = await ($app.instance as () => Promise<{ default: SpecialComponent }>)().then(c => c.default)
    }

    if (!installedApps.has($app.name)) {
        await $app.config.install()
        installedApps.add($app.name)
    }

    const windows = openWindows.value;
    const numberOfInstances = windows.filter(e => e.name === $app.name).length
    const canOpen = $app.config.canOpen(numberOfInstances, data['opener']);
    if (!canOpen) {
        // TODO Consider throwing an error
        return false
    }

    windows.push(createWindowObject(name, data))
    openWindows.value = windows;
    // TODO Maybe I should just test for any nextTick issue
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
export function getAppWindows() {
    return openWindows.value
}

/** This gives a list of open apps by name avoid duplicate  */
export function getOpenApps() {
    const set = new Set<string>();
    const windows = getAppWindows();

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