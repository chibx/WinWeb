import type { ApplicationConfig } from "~/applications/types";

export default {
    install() { },
    uninstall() { },
    canOpen() {
        return true
    },
    onRightClick: rClick
} satisfies ApplicationConfig