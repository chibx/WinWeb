import type { Application } from '../types';

export default [
    {
        name: 'File Explorer',
        icon: '/icons/explorer.svg',
        // instance: import.meta.dev ? FileExplorer : () => defy(import('./File Explorer/index.vue')),
        instance: defineAsyncComponent(() => import('./File Explorer/index.vue')),
        config: () => defy(import('./File Explorer/config')),
    },
    {
        name: 'Microsoft Store',
        icon: '/icons/microsoft_store.svg',
        instance: defineAsyncComponent(() => import('./Microsoft Store/index.vue')),
        config: () => defy(import('./Microsoft Store/config'))
    }
] satisfies Application[]

/** defaultify  */
type ExtractDefaultImportType<T extends Promise<{ default: unknown }>> = Promise<Awaited<T>['default']>;

async function defy<T extends Promise<{ default: unknown }>>(prom: T): ExtractDefaultImportType<T> {
    const c = await prom;
    return c.default;
}