import type { WinWebSchema } from "@/types/idb";
import type { IDBPDatabase } from "idb";

export function initUserTable(database: IDBPDatabase<WinWebSchema>) {
    const users = database.createObjectStore("users", {
        keyPath: "uid",
    });
    users.createIndex("userName", "userName", { unique: true });
    users.createIndex("uid", "uid", { unique: true });
}

export function initFilesTable(database: IDBPDatabase<WinWebSchema>) {
    const files = database.createObjectStore("files", {
        keyPath: "uid",
    });
    files.createIndex("uid", "uid", { unique: true });
}

export function initBackgroundTable(database: IDBPDatabase<WinWebSchema>) {
    const backgrounds = database.createObjectStore("backgrounds", {
        keyPath: "uid",
    });
    backgrounds.createIndex("user", "user", { unique: false });
}

export function initAppTable(database: IDBPDatabase<WinWebSchema>) {
    database.createObjectStore("apps");
}

export function initDesktopTable(database: IDBPDatabase<WinWebSchema>) {
    database.createObjectStore("desktop", {
        keyPath: "userId",
    });
}
