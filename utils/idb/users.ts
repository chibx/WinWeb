import { uid } from "uid";
import type { NewUser, User } from "~/types/idb";

export async function getUsers() {
	return (await idb).getAll('users');
}

export async function getUser(id: string) {
	// const tx = await transaction("users", "readonly");
	// const cursor = await tx.objectStore("users").index("uid").openCursor(IDBKeyRange.only(id));
	return (await idb).get('users', IDBKeyRange.only(id))
}

export async function addUser(newUser: NewUser) {
	// const store = tx.objectStore("users");
	const user = { ...newUser, uid: uid(), isCurrent: false };
	return (await idb).add('users', user)
}

export async function deleteAllUsers() {
	// const store = tx.objectStore("users");
	return (await idb).clear('users');
}

export async function deleteUser(id: string) {
	// const store = tx.objectStore("users");
	// const cursor = await store.index("uid").openCursor(id)
	// if (cursor) {
	// 	await cursor.delete();
	// }

	(await idb).delete('users', IDBKeyRange.only(id))
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
	const db = await idb;
	await Promise.all(Array.from(db.objectStoreNames).map((name)=>db.clear(name)));
	
	const tx = await transaction(void 0, "readwrite");
	const store = tx.objectStore("users");
	defaultUsers.forEach((user) => { store.put(user) });
	await tx.done;
	userStore.$patch({
		currentUser: defaultUsers[0],
	}); 
}


