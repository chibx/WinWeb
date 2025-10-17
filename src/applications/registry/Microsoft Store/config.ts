import { rClick } from "@/utils/desktop";
import type { ApplicationConfig } from "@/applications/types";

export default {
    install() {},
    uninstall() {},
    canOpen() {
        return {
            success: true,
        };
    },
    onRightClick: rClick,
} satisfies ApplicationConfig;
