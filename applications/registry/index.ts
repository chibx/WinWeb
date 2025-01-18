export default [
    {
        name: 'File Explorer',
        icon: '/icons/explorer.svg',
        config: () => import('./File Explorer/index')
    },
    {
        name: 'Microsoft Store',
        icon: '/icons/microsoft_store.svg',
        config: () => import('./Microsoft Store/index')
    }
]