import type { ApplicationConfig } from "~/applications/types";

export default {
    install() { },
    uninstall() { },
    canOpen() {
        return true
    },
} satisfies ApplicationConfig