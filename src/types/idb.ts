import type { DBSchema } from "idb";

export type User = {
    id: number;
    fullName: string;
    userName: string;
    password: string;
    avatar: ArrayBuffer | null;
    isCurrent: boolean;
};

export type NewUser = Omit<User, "uid" | "isCurrent">;

export type Background = {
    userId: number/* "system" for all users */;
    uid: string;
    data: Blob;
};

export type ApplicationTable =
    | {
          installedApps: string[];
      }
    | {
          [key: string]: Record<string, unknown>;
      };

export type DesktopTable = {
    desktopIcons: string[];
    taskbarIcons: string[];
};

export enum ResIDX {
    SHORTCUT = -1,
    FILE = 1,
}

type ResourceProps = {
    id: number;
    userId: string;
    name: string;
    parentId?: number;
};

export interface WinWebSchema extends DBSchema {
    users: {
        key: number;
        value: Omit<User, "id">;
        indexes: {
            userName: string;
            id: number;
        };
    };
    apps: {
        key: string;
        value: ApplicationTable;
    };
    desktop: {
        key: string;
        value: DesktopTable;
    };
    files: {
        key: string;
        value: ResourceProps &
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
        indexes: {
            id: string;
            userId: string;
            name_user_pid: [string, string, number];
        };
    };
    folder: {
        key: string;
        value: ResourceProps;
        indexes: {
            id: string;
            user_folderId: [string, number];
            name_user_pid: [string, string, number];
        };
    };
    file_metadata: {
        key: string;
        value: {
            size: number;
            modified: Date;
            created?: Date;
            accessed?: Date;
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
