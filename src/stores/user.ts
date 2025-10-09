import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import type { User } from "@/types/idb";
import { idb } from "@/utils/idb";

export const useUser = defineStore("user", () => {
    const currentUser = ref<User | null>(null);
    const isLoggedIn = ref(false);

    async function deleteUser(id: string) {
        const tx = idb.transaction("users", "readwrite");
        const store = tx.objectStore("users");
        const totalUsers = await store.count();
        if (totalUsers <= 1) {
            try {
                tx.abort();
            } catch {
                throw Error("Cannot delete only user");
            }
        }
        await store.delete(IDBKeyRange.only(id));
        return tx.done;
    }

    async function changeUser(id: string) {
        if (!currentUser.value || currentUser.value.uid === id) {
            throw Error("Invalid action during user change");
        }
        const tx = idb.transaction("users", "readwrite");
        const store = tx.objectStore("users");
        const newUser = await store.get(IDBKeyRange.only(id));
        const curUser = await store.get(IDBKeyRange.only(currentUser.value.uid));
        if (!newUser || !curUser) return;
        curUser.isCurrent = false;
        newUser.isCurrent = true;
        await Promise.all([tx.done, store.put(curUser), store.put(newUser)]);

        // TODO Handle Error

        isLoggedIn.value = false;
    }

    return {
        currentUser,
        isLoggedIn,
        changeUser,
        deleteUser,
    };
});

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useUser, import.meta.hot));
}
