import type { DBSchema, IDBPTransaction, StoreNames } from "idb";

export type IDBTransactionWithWrite = IDBPTransaction<
	WinWebSchema,
	ArrayLike<StoreNames<WinWebSchema>>,
	"readwrite"
>;

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

export interface WinWebSchema extends DBSchema {
	users: {
		key: number;
		value: User;
		indexes: {
			userName: string;
			uid: string;
		};
	};
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
