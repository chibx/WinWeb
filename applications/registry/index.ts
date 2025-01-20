import type { Application } from '../types';

export default [
    {
        name: 'File Explorer',
        icon: '/icons/explorer.svg',
        instance: () => import('./File Explorer/index.vue'),
        config: () => import('./File Explorer/config')
    },
    {
        name: 'Microsoft Store',
        icon: '/icons/microsoft_store.svg',
        instance: () => import('./Microsoft Store/index.vue'),
        config: () => import('./Microsoft Store/config')
    }
] satisfies Application[]