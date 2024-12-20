import {
	openDB,
	type IDBPDatabase,
	type IDBPTransaction,
	type StoreNames,
} from "idb";
import type { WinWebSchema } from "../../types/idb";

export let idb: Promise<IDBPDatabase<WinWebSchema>>;

//TODO: Watch this
const stores: Array<StoreNames<WinWebSchema>> = ["files", "users"];

if (import.meta.client) {
	idb = openDB<WinWebSchema>("winweb", 1, {
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
		},
	});
}

export function delay(number: number) {
	return new Promise<void>((resolve) => {
		setTimeout(resolve, number);
	});
}

export async function transaction<
	M extends "readonly" | "readwrite" = "readonly"
>(
	store?: StoreNames<WinWebSchema> | ArrayLike<StoreNames<WinWebSchema>>,
	mode?: M
): Promise<
	M extends "readonly"
		? IDBPTransaction<
				WinWebSchema,
				ArrayLike<StoreNames<WinWebSchema>>,
				"readonly"
		  >
		: IDBTransactionWithWrite
> {
	return (await idb).transaction<ArrayLike<StoreNames<WinWebSchema>>, M>(
		store ? (Array.isArray(store) ? store : [store]) : stores,
		mode
	) as M extends "readonly"
		? IDBPTransaction<WinWebSchema, ArrayLike<StoreNames<WinWebSchema>>, M>
		: IDBTransactionWithWrite;
}

export function pad(str: string | number) {
	return ("" + str).padStart(2, "0");
}

export async function isDBAvalaible() {
	const db = await idb;

	return db.count('users').then(a=> a>0);
}
