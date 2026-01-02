import { openDB } from "idb";
import type { User, WinWebSchema } from "@/types/idb";
import { useUser } from "@/stores/user";
import {
    initAppTable,
    initBackgroundTable,
    initDesktopTable,
    initFileMetadataTable,
    initFilesTable,
    initFoldersTable,
    initUserTable,
} from "../schema";

export const idb = await openDB<WinWebSchema>("winweb", 1, {
    upgrade(database) {
        initUserTable(database);

        initFilesTable(database);

        initFoldersTable(database);

        initFileMetadataTable(database);

        initBackgroundTable(database);

        initAppTable(database);

        initDesktopTable(database);
    },
});

export async function isDBAvalaible() {
    return idb.count("users").then((a) => a > 0);
}

const defaultUser: User = {
    id: 1,
    avatar: null,
    fullName: "Default",
    isCurrent: true,
    password: "1234",
    userName: "User",
};

const defaultApps = ["File Explorer", "Microsoft Store"];

export async function refreshDB() {
    const userStore = useUser();
    // deleteAllUsers(tx);
    const tx$1 = idb.transaction(idb.objectStoreNames, "readwrite");
    const promises = Array.from(idb.objectStoreNames).map((name) => tx$1.objectStore(name).clear());
    promises.push(tx$1.done);
    await Promise.all(promises);

    const tx$2 = idb.transaction(idb.objectStoreNames, "readwrite");
    const users = tx$2.objectStore("users");
    const apps = tx$2.objectStore("apps");
    await Promise.all([
        users.put(defaultUser),
        apps.put(
            {
                installedApps: defaultApps,
            },
            defaultUser.id,
        ),
        tx$2.done,
    ]);

    userStore.$patch({
        currentUser: defaultUser,
    });
}
