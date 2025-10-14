// Identifiers for internal clipboard operations
export const CL_FILE = Symbol();
export const CL_TEXT = Symbol();
export const CL_IMAGE = Symbol();

export type ClipboardFileItem = {
    name: string;
    path: string;
    ext: string | null;
};

export type ClipboardImageItem = string; // base64 data:image
export type ClipboardTextItem = string;

type ClipboardManagerItem = {
    type: symbol;
    data: unknown;
};

// let clipboard =

export class ClipboardManager {
    items: ClipboardManagerItem[] = [];

    async get() {
        const value = this.items.at(-1);
        return value;
    }

    async add(type: symbol, data: unknown) {
        // TODO: Implement property equality instead of instance equality
        const has = this.items.some((it) => {
            return it.type === type && it.data === data;
        });
        if (has) return;
        this.items.push({
            type,
            data,
        });
    }

    async clear() {
        this.items.length = 0;
    }

    static default() {}
}
