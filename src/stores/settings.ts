import { defineStore } from "pinia";
import { useUser } from "./user";
import { toReactive, useLocalStorage } from "@vueuse/core";
import type { Setting } from "@/types/config";
import { DEFAULT_DESKTOP_CONFIG, DEFAULT_TASKBAR_CONFIG } from "@/utils/constants";

export const useSettings = defineStore("settings", () => {
    const user = useUser();
    const settings = toReactive(
        useLocalStorage<Setting>(() => `user-${user.currentUser?.uid}`, {
            taskbar: DEFAULT_TASKBAR_CONFIG,
            desktop: DEFAULT_DESKTOP_CONFIG,
        }),
    );

    return {
        config: settings,
    };
});
