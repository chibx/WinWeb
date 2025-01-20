import {
	openDB,
} from "idb";
import type { WinWebSchema } from "../../types/idb";
import { uid } from "uid";

export const idb = await openDB<WinWebSchema>("winweb", 1, {
	upgrade(database) {
		// User related
		const users = database.createObjectStore("users", {
			keyPath: "uid",
		});
		users.createIndex("userName", "userName", { unique: true });
		users.createIndex("uid", "uid", { unique: true });

		// File related
		const files = database.createObjectStore("files", {
			keyPath: "uid",
		});
		files.createIndex("uid", "uid", { unique: true });

		// Background Image Related
		const backgrounds = database.createObjectStore("backgrounds", {
			keyPath: "uid",
		});
		backgrounds.createIndex("user", "user", { unique: false });

		// Application Data Related
		database.createObjectStore("apps", {
			keyPath: 'userId'
		});

		// Desktop Data Related
		database.createObjectStore("desktop", {
			keyPath: 'userId'
		});
	},
});

export async function isDBAvalaible() {
	return idb.count('users').then(a => a > 0);
}


const defaultUser: User = {
	avatar: null,
	fullName: "Default",
	isCurrent: true,
	password: "1234",
	uid: uid(),
	userName: "User",
};

const defaultApps = [
	'File Explorer',
	'Microsoft Store',
];

export async function refreshDB() {
	const userStore = useUser();
	// deleteAllUsers(tx);
	const _tx = idb.transaction(idb.objectStoreNames, 'readwrite');
	const promises = Array.from(idb.objectStoreNames).map((name) => _tx.objectStore(name).clear())
	promises.push(_tx.done)
	await Promise.all(promises);

	const tx = idb.transaction(idb.objectStoreNames, "readwrite");
	const users = tx.objectStore("users");
	const apps = tx.objectStore('apps')
	await Promise.all([
		users.put(defaultUser),
		apps.put({
			installedApps: defaultApps
		}),
		tx.done
	])

	userStore.$patch({
		currentUser: defaultUser,
	});
}
