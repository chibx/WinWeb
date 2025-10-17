export type TaskBarIcon = {
    name: string;
    icon: string;
    pinned?: boolean;
    rClick(): Promise<TaskBarMenu[]>;
};

export type TaskBarMenu = {
    group: string;
    fields: TaskBarMenuField[];
};

type TaskBarMenuField = {
    name: string;
    title?: string;
    onclick(): void;
};
