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
                return initializeApp(app).then(() => (app.config as unknown as ApplicationConfig).install()).then(res)
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

export function getAppByName(name: string) {
    return registry.find(app => app.name === name)
}

export async function getInstalledApps() {
    return registry.filter(el => installedApps.has(el.name)) || []
}

export async function openApp(name: string, data = {} as ApplicationProps) {
    const windows = openWindows.value;
    // This is to enable the developer to focus on a small set of windows 
    if (import.meta.dev && windows.length >= 4) return false
    const $app = registry.find(app => app.name === name);
    if (!$app) return false // |Application not found|

    // Initialize once
    await initializeApp($app)

    if (!installedApps.has($app.name)) {
        await ($app.config as unknown as ApplicationConfig).install()
        installedApps.add($app.name)
    }

    const numberOfInstances = windows.filter(e => e.name === $app.name).length
    // TODO Handle case of multiple files
    const canOpen = await ($app.config as unknown as ApplicationConfig).canOpen(numberOfInstances, data['opener']);
    if (!canOpen.success) {
        // TODO Consider throwing an error
        return false
    }

    windows.push(createWindowObject(name, { ...data, manual: canOpen.manual || false }))
    openWindows.value = windows.slice();
    // TODO Maybe I should just test for any nextTick issue
    return true
}

async function initializeApp($app: Application) {
    const promises: Promise<unknown>[] = []
    if ($app.config instanceof Function) {
        promises.push($app.config().then(c => $app.config = c))
    }

    if ($app.instance instanceof Function) {
        promises.push(($app.instance as () => Promise<SpecialComponent>)().then(c => $app.instance = c))
    }
    // TODO Write error case later
    await Promise.all(promises)
}

export function useAppAction() {
    const appWindow = useApp()
    if (!appWindow) return;
    return {
        focus() {
            blurWindows()
            appWindow.isActive.value = true
        },
        close() {
            openWindows.value = openWindows.value.filter(el => el.id !== appWindow.id);
        },
    }
}

/** This is used to blur the windows in order of the way they were opened and focused */
function blurWindows() {

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
    return openWindows
}

/** This gives a list of open apps by name avoid duplicate  */
export function getOpenApps() {
    const set = new Set<string>();
    const windows = getAppWindows().value;

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