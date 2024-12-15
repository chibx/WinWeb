import { uid } from "uid";
import type { IDBTransactionWithWrite, NewUser, User } from "~/types/idb";

export async function getUsers() {
	const tx = await transaction("users", "readonly");
	const store = tx.objectStore("users");
	const users = await store.getAll();
	return users;
}

export async function getUser(id: string) {
	const tx = await transaction("users", "readonly");
	const cursor = await tx.objectStore("users").index("uid").openCursor(IDBKeyRange.only(id));
	return cursor?.value
}

export async function addUser(tx: IDBTransactionWithWrite, newUser: NewUser) {
	const store = tx.objectStore("users");
	const user = { ...newUser, uid: uid(), isCurrent: false };
	return store.put(user);
}

export async function deleteAllUsers(tx: IDBTransactionWithWrite) {
	const store = tx.objectStore("users");
	return store.clear();
}

export async function deleteUser(tx: IDBTransactionWithWrite, id: string) {
	const store = tx.objectStore("users");
	const cursor = await store.index("uid").openCursor(id)
	if (cursor) {
		await cursor.delete();
	}
}

export async function refreshDB() {
	const userStore = useUser();
	const defaultUsers: User[] = [
		{
			avatar: null,
			fullName: "Default",
			isCurrent: true,
			password: "1234",
			uid: 'default',
			userName: "User",
		},
		{
			avatar: null,
			fullName: "Jane Tea",
			isCurrent: false,
			password: "12345",
			uid: uid(),
			userName: "Janet",
		},
		{
			avatar: null,
			fullName: "John Doe",
			isCurrent: false,
			password: "123456",
			uid: uid(),
			userName: "Johnny",
		},
	];
	// deleteAllUsers(tx);
	await Promise.all([
		(await idb).clear('users'),
		(await idb).clear('files')
	]);
	const tx = await transaction(void 0, "readwrite");
	const store = tx.objectStore("users");
	defaultUsers.forEach((user) => { store.put(user) });
	await tx.done;
	userStore.$patch({
		currentUser: defaultUsers[0],
	});
}
