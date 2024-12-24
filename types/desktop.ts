export type TaskBarIcon = {
    name: string;
    icon: string;
    rClick(): Promise<TaskBarMenu[]>
}

export type DesktopIcon = {
    /** Name of the resource */
    name: string;
    /** Icon url to show */
    icon: string;
    /** Function that would be called on right-click  */
    rClick(): Promise<DesktopIconMenu[]>
}

export type DesktopConfig = {
    taskbar: {
        position: 'top' | 'right' | 'bottom' | 'left',
        iconPosition: 'center' | 'left',
        bgColor: string,
        iconHoverColor: string,
    }
}

export type DragPaneValidator = (func: (ev: MouseEvent)=>boolean)=>void

export type Windows = {
    appName: string;
    /** Unique ID of the instance (Obviously gonna be the key) */
    id: string;
    isMini: boolean;
    
}

type TaskBarMenu = {
    group: string;
    fields: TaskBarMenuField[]
}

type TaskBarMenuField = {
    name: string;
    title?: string;
    onclick(): void
}

type DesktopIconMenu = {
    name: string;
    onclick?(): void;
    children?: DesktopIconMenu[]
}