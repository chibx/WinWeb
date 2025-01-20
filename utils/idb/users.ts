import { uid } from "uid";
import type { NewUser } from "~/types/idb";

export async function getUsers() {
	return idb.getAll('users');
}

export async function getUser(id: string) {
	return idb.get('users', IDBKeyRange.only(id))
}

export async function addUser(newUser: NewUser) {
	const user = { ...newUser, uid: uid(), isCurrent: false };
	return idb.add('users', user)
}

export async function deleteAllUsers() {
	return idb.clear('users');
}




