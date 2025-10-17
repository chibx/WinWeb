import type { Ref, ShallowRef } from "vue";

export type DesktopIcon = {
    /** Name of the resource */
    name: string;
    /** Icon url to show */
    icon: string;
    /** Function that would be called on right-click  */
    rClick(): Promise<DesktopIconMenu[]>;
};

export type DesktopIconWithFocus = [Readonly<ShallowRef<HTMLElement | null>>, Ref<boolean, boolean>];

export type DesktopCoords = {
    left: number;
    top: number;
};

export type DragPaneValidator = (func: (ev: MouseEvent) => boolean) => void;

export type DragPaneCoords = {
    x: number;
    y: number;
    width: number;
    height: number;
    left: number;
    top: number;
};

export type Windows = {
    appName: string;
    /** Unique ID of the instance (Obviously gonna be the key) */
    id: string;
    isMini: boolean;
};

export type DesktopIconMenu = {
    name: string;
    onclick?(): void;
    children?: DesktopIconMenu[];
};

export type StartMenuStyles = {
    bgColor: [number, number, number];
    /** Value should be from __0__ to __100__ */
    opacity: number;
    /** Gradient has a higher precedence
     *  Set to none
     */
    gradient?: string;
};

// export type StartMenuProps = {
//     open: boolean;
// };
