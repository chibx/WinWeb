import type { DBSchema } from "idb";

export type User = {
    id: number;
    fullName: string;
    userName: string;
    password: string;
    avatar: Blob | null;
    isCurrent: boolean;
};

export type NewUser = Omit<User, "id" | "isCurrent">;

export type Background = {
    userId: number /* set to `0` for all users */;
    uid: string;
    data: Blob;
};

export type ApplicationTable = {
    installedApps: string[];
};

export type DesktopTable = {
    desktopIcons: string[];
    taskbarIcons: string[];
};

export enum ResIDX {
    SHORTCUT = -1,
    FILE = 1,
}

export type ResourceProps = {
    id: number;
    userId: string;
    name: string;
    parentId?: number;
    created: Date;
};

type ResourceIndex = {
    id: string;
    name_user_pid: [string, string, number];
};

export interface WinWebSchema extends DBSchema {
    users: {
        key: number;
        value: User;
        indexes: {
            userName: string;
            id: number;
        };
    };
    apps: {
        key: number;
        value: ApplicationTable;
    };
    desktop: {
        key: string;
        value: DesktopTable;
    };
    files: {
        key: string;
        value: Omit<ResourceProps, "created"> &
            (
                | {
                      type: ResIDX.FILE;
                  }
                | {
                      type: ResIDX.SHORTCUT;
                      // `to` points to the real resource
                      to: number;
                  }
            );
        indexes: ResourceIndex;
    };
    folder: {
        key: string;
        value: ResourceProps;
        indexes: ResourceIndex & {
            user_parentId: [string, number];
        };
    };
    file_metadata: {
        key: string;
        value: {
            size: number;
            modified: Date;
            created: Date;
            accessed: Date;
            // for fast lookup with indexes
            parentId: number;
        };
        indexes: {
            file_metadata: number;
        };
    };
    backgrounds: {
        key: string;
        value: Background;
        indexes: {
            user: string;
        };
    };
}
