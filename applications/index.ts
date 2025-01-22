import type { Application, ApplicationConfig, ApplicationProps, OpenWindow, SpecialComponent } from "./types";
import { APP_ID, createWindowObject, openWindows } from "./utils"
import registry from "./registry/index";

const installedApps: Set<string> = reactive(new Set())

// Install apps found in the installed field in the application IDB table
try {
    const uid = useUser().currentUser?.uid;
    if (!uid) { throw Error('User is null') }
    const appTable = await idb.get('apps', IDBKeyRange.only(uid));
    if (appTable) {
        (appTable.installedApps as string[]).forEach(e => installedApps.add(e))

        const promises = registry.filter(e => installedApps.has(e.name)).map(app => {
            return new Promise((res) => {
                return initializeApp(app).then(() => (app.config as ApplicationConfig).install()).then(res)
            })
        })

        await Promise.all(promises)
    }
} catch {
    // TODO Handle this error
}
// -------------------------------------------------------------------------

export function getAppRegistry() {
    return registry
}

export async function getInstalledApps() {
    return registry?.filter(el => installedApps.has(el.name)) || []
}

export async function openApp(name: string, data: ApplicationProps = {}) {
    const $app = registry.find(app => app.name === name);
    if (!$app) return false // |Application not found|

    // Initialize once
    await initializeApp($app)

    if (!installedApps.has($app.name)) {
        await ($app.config as ApplicationConfig).install()
        installedApps.add($app.name)
    }

    const windows = openWindows.value;
    const numberOfInstances = windows.filter(e => e.name === $app.name).length
    const canOpen = ($app.config as ApplicationConfig).canOpen(numberOfInstances, data['opener']);
    if (!canOpen) {
        // TODO Consider throwing an error
        return false
    }

    windows.push(createWindowObject(name, data))
    openWindows.value = windows;
    // TODO Maybe I should just test for any nextTick issue
}

async function initializeApp($app: Application) {
    const promises: Promise<unknown>[] = []
    if ($app.config instanceof Function) {
        promises.push($app.config().then(c => $app.config = c.default))
    }

    if ($app.instance instanceof Function) {
        promises.push(($app.instance as () => Promise<{ default: SpecialComponent }>)().then(c => $app.instance = c.default))
    }
    // TODO Write error case later
    await Promise.all(promises)
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