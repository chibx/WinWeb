import type { Application } from "~/applications/types";

export default {
    instance: () => import('./index.vue').then(a => a.default),
    install() { },
    uninstall() { },
    canOpen() {
        return true
    },
} satisfies Omit<Application, 'name' | 'icon'>