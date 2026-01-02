import type { WinWebSchema } from "@/types/idb";
import type { IDBPDatabase } from "idb";
import { METADATA_IDX, NAME_USER_PID_IDX, USER_PARENT_IDX } from "../idb/files";

export function initUserTable(database: IDBPDatabase<WinWebSchema>) {
    const users = database.createObjectStore("users", {
        keyPath: "id",
        autoIncrement: true,
    });
    users.createIndex("userName", "userName", { unique: true });
    users.createIndex("id", "id", { unique: true });
}

export function initFilesTable(database: IDBPDatabase<WinWebSchema>) {
    const files = database.createObjectStore("files", {
        keyPath: "id",
        autoIncrement: true,
    });
    files.createIndex("id", "id", { unique: true });
    // files.createIndex(USER_PARENT_IDX, ["userId", "parentId"]);
    files.createIndex(NAME_USER_PID_IDX, ["name", "userId", "parentId"], { unique: true });
}

export function initFoldersTable(database: IDBPDatabase<WinWebSchema>) {
    const files = database.createObjectStore("folder", {
        keyPath: "id",
        autoIncrement: true,
    });
    files.createIndex("id", "id", { unique: true });
    files.createIndex(USER_PARENT_IDX, ["userId", "parentId"]);
    files.createIndex(NAME_USER_PID_IDX, ["name", "userId", "parentId"], { unique: true });
}

export function initFileMetadataTable(database: IDBPDatabase<WinWebSchema>) {
    const files = database.createObjectStore("file_metadata", {
        keyPath: "id",
        autoIncrement: true,
    });

    files.createIndex(METADATA_IDX, "parentId");
}

export function initBackgroundTable(database: IDBPDatabase<WinWebSchema>) {
    const backgrounds = database.createObjectStore("backgrounds", {
        keyPath: "uid",
    });
    backgrounds.createIndex("user", "user");
}

export function initAppTable(database: IDBPDatabase<WinWebSchema>) {
    database.createObjectStore("apps");
}

export function initDesktopTable(database: IDBPDatabase<WinWebSchema>) {
    database.createObjectStore("desktop", {
        keyPath: "userId",
    });
}
