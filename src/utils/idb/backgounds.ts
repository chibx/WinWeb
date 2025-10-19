import { uid } from "uid";
import { idb } from ".";
import type { Background } from "@/types/idb";
import { SYSTEM_USER } from "../constants";

export const defaultBgs = Array.from({ length: 7 }).map((_, i) => `/backgrounds/bg_${i + 1}.webp`);

export const getUserBackgrounds = async (userId: number) => {
    const bgTx = idb.transaction("backgrounds");
    let cursor = await bgTx.objectStore("backgrounds").openCursor();
    const backgrounds: Background[] = [];
    while (cursor) {
        if (cursor.value && cursor.value.userId == userId) {
            backgrounds.push(cursor.value);
        }
        cursor = await cursor.continue();
    }

    return backgrounds;
};

export const getSystemBackgrounds = async (count?: number) => {
    const bgTx = idb.transaction("backgrounds");
    let cursor = await bgTx.objectStore("backgrounds").openCursor();
    const backgrounds: Background[] = [];
    while (cursor) {
        if (cursor.value && cursor.value.userId == SYSTEM_USER) {
            backgrounds.push(cursor.value);
        }
        cursor = await cursor.continue();
    }

    return backgrounds.slice(0, count);
};

export const getAllBackgrounds = async (count?: number) => {
    return idb.getAll("backgrounds", null, count);
};

export const deleteBackground = async (id: string) => {
    return idb.delete("backgrounds", id);
};

export const addBackground = async (background: Omit<Background, "uid">) => {
    return idb.add("backgrounds", {
        uid: uid(),
        ...background,
    });
};

export async function preloadBackgrounds() {
    const promises: Promise<unknown>[] = [];
    defaultBgs.forEach((url) => {
        promises.push(
            fetch(url).then(async (res) => {
                const blob = await res.blob();
                return await addBackground({
                    userId: SYSTEM_USER,
                    data: blob,
                });
            }),
        );
    });

    return Promise.allSettled(promises);
}
