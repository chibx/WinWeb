export default [
    {
        name: 'File Explorer',
        icon: '/icons/explorer.svg',
        instance: () => import('./File Explorer/index.vue').then(a => a.default),
        config: () => import('./File Explorer/config')
    },
    {
        name: 'Microsoft Store',
        icon: '/icons/microsoft_store.svg',
        instance: () => import('./Microsoft Store/index.vue').then(a => a.default),
        config: () => import('./Microsoft Store/config')
    }
]