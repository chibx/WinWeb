import type { DesktopConfig, StartMenuStyles, TaskBarIcon } from "@/types/desktop";
import { toReactive, useLocalStorage } from "@vueuse/core";
import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

const DESKTOP_CONFIG_KEY = "desktop-config";
const START_MENU_CONFIG_KEY = "startMenu";

export const useDesktop = defineStore("desktop", () => {
    const taskbarIcons = reactive<TaskBarIcon[]>([]);
    const desktopIcons = ref<[][]>([]);
    // TODO Implement a background ref for this store
    const config = reactive<DesktopConfig>({
        taskbar: {
            position: "bottom",
            iconPosition: "center",
            shouldHide: false,
            // TODO Make these two accept an array of value [r, g, b, a]
            bgColor: "#1b0027",
            iconHoverColor: "#ffffff41",
        },
    });
    const desktopVars = computed(() => {
        return {
            "--taskbar-bg": config.taskbar.bgColor,
            "--icon-hover-color": config.taskbar.iconHoverColor,
        };
    });

    useLocalStorage(DESKTOP_CONFIG_KEY, config);

    return {
        config,
        taskbarIcons,
        desktopIcons,
        desktopVars,
    };
});

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDesktop, import.meta.hot));
}

export const startMenuStyles = toReactive(
    useLocalStorage<StartMenuStyles>(START_MENU_CONFIG_KEY, {
        bgColor: [0, 0, 0],
        opacity: 0.5,
        /** Gradient has a higher precedence
         *  Set to none
         */
        gradient: "",
    }),
);
