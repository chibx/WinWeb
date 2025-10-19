import type { DesktopConfig, TaskBarConfig } from "@/types/config";

export const TASKBAR_ICON_SIZE = 50; // 50px
// export const SPACE_AFTER_RIGHT_BAR = 16; // 16px
export const DEFAULT_TASKBAR_CONFIG: TaskBarConfig = {
    position: "bottom",
    iconPosition: "center",
    shouldHide: false,
    // TODO Make these two accept an array of value [r, g, b, a]
    bgColor: "#1b0027",
    iconHoverColor: "#ffffff41",
};

export const DEFAULT_DESKTOP_CONFIG: DesktopConfig = {};
export const SYSTEM_USER = 0;
