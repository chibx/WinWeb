export type Application = {
    name: string,
    icon: string,
    instance: () => Promise<Component<ApplicationProps, ApplicationExpose>>
    install(): Promise<void> | void
    uninstall(): Promise<void> | void
    /** 
       @param n Number of instance windows open 
       @param data Information about what caused the request to open
    */
    canOpen(n: number, data: ApplicationProps['opener']): Promise<boolean> | boolean
}


export type ApplicationExpose = {
    minHeight: Ref<number>
    minWidth: Ref<number>
}

export type ApplicationProps = {
    /** This is null if the app is opened through the windows system (Taskbar or Start Menu) */
    opener: {
        type: 'shortcut' | 'file' | 'app' | null
        name: string
        /** This is null when type is not file */
        path: string | null
    } | null
}


export type OpenWindow = {
    id: string
    name: string
    zIndex: number
    isActive: Ref<boolean>
    isMinimized: Ref<boolean>
    /** Coordinate and size of the width */
    coords: {
        x: number
        y: number
        width: number
        height: number
    }
}

export type OpenWindowDescriptorMap = {
    [key in keyof OpenWindow]: PropertyDescriptor | {
        value: OpenWindow[key]
    }
}