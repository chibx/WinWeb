export type TaskBarIcon = {
    name: string;
    icon: string;
    menu: TaskBarMenu[]
}

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