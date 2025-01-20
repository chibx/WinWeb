import {
	openDB,
} from "idb";
import type { WinWebSchema } from "../../types/idb";

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
