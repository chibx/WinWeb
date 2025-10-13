import type { StartMenuStyles } from "@/types/desktop";
import { toReactive, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { ref } from "vue";

const START_MENU_CONFIG_KEY = "startMenu";

export const useStartMenu = defineStore("start-menu", () => {
    const isOpen = ref(false);
    const startMenuIcon = ref<HTMLElement | null>(null); // This is only to ensure that during HMR updates i dont store an old copy
    const styles = toReactive(
        useLocalStorage<StartMenuStyles>(START_MENU_CONFIG_KEY, {
            bgColor: [0, 0, 0],
            opacity: 0.5,
            /** Gradient has a higher precedence
             *  Set to none
             */
            gradient: "",
        }),
    );

    return {
        isOpen,
        styles,
        startMenuIcon,
    };
});
