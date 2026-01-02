import type { NewUser, User } from "@/types/idb";
import { idb } from ".";

export async function getUsers() {
    return idb.getAll("users");
}

export async function getUser(id: number) {
    return idb.get("users", IDBKeyRange.only(id));
}

export async function addUser(newUser: NewUser) {
    const user = { ...newUser, isCurrent: false } as User;
    user.id = await idb.add("users", user);
    return user;
}

export async function deleteAllUsers() {
    return idb.clear("users");
}
