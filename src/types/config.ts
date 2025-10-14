export type DesktopConfig = object;

export type TaskBarConfig = {
    position: "top" | "right" | "bottom" | "left";
    iconPosition: "center" | "left";
    bgColor: string;
    iconHoverColor: string;
    shouldHide: boolean;
};

export type Setting = {
    taskbar: TaskBarConfig;
    desktop: DesktopConfig;
};
