import { openDB } from "idb";
import type { User, WinWebSchema } from "@/types/idb";
import { uid } from "uid";
import { useUser } from "@/stores/user";
import { initAppTable, initBackgroundTable, initDesktopTable, initFilesTable, initUserTable } from "../schema";

export const idb = await openDB<WinWebSchema>("winweb", 1, {
    upgrade(database) {
        initUserTable(database);

        initFilesTable(database);

        initBackgroundTable(database);

        initAppTable(database);

        initDesktopTable(database);
    },
});

export async function isDBAvalaible() {
    return idb.count("users").then((a) => a > 0);
}

const defaultUser: User = {
    avatar: null,
    fullName: "Default",
    isCurrent: true,
    password: "1234",
    uid: uid(),
    userName: "User",
};

const defaultApps = ["File Explorer", "Microsoft Store"];

export async function refreshDB() {
    const userStore = useUser();
    // deleteAllUsers(tx);
    const _tx = idb.transaction(idb.objectStoreNames, "readwrite");
    const promises = Array.from(idb.objectStoreNames).map((name) => _tx.objectStore(name).clear());
    promises.push(_tx.done);
    await Promise.all(promises);

    const tx = idb.transaction(idb.objectStoreNames, "readwrite");
    const users = tx.objectStore("users");
    const apps = tx.objectStore("apps");
    await Promise.all([
        users.put(defaultUser),
        apps.put(
            {
                installedApps: defaultApps,
            },
            defaultUser.uid,
        ),
        tx.done,
    ]);

    userStore.$patch({
        currentUser: defaultUser,
    });
}
