import type { DBSchema } from "idb";
import { uid } from "uid";

export type User = {
	uid: string;
	fullName: string;
	userName: string;
	password: string;
	avatar: ArrayBuffer | null;
	isCurrent: boolean;
};

export type NewUser = Omit<User, "uid" | "isCurrent">;

export type Background = {
	userId: string; /* "system" for all users */
	uid: string;
	data: Blob
}

export type ApplicationTable = {
	installedApps: string[];
} | {
	[key: string]: Record<string, unknown>
}

export type DesktopTable = {
	desktopIcons: string[]
	taskbarIcons: string[]
}

export interface WinWebSchema extends DBSchema {
	users: {
		key: number;
		value: User;
		indexes: {
			userName: string;
			uid: string;
		};
	};
	apps: {
		key: string;
		value: ApplicationTable
	},
	desktop: {
		key: string;
		value: DesktopTable
	},
	files: {
		key: string;
		value: {
			uid: string;
			user: string;
			name: string;
			size: number;
			path: string;
			isDir: boolean;
		};
		indexes: {
			uid: string;
			fullPath: string;
			path: string;
			userName: string;
		};
	};
	backgrounds: {
		key: string;
		value: Background;
		indexes: {
			user: string
		}
	}
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
