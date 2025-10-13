import type { DesktopConfig, StartMenuStyles, TaskBarIcon } from "@/types/desktop";
import { toReactive, useLocalStorage } from "@vueuse/core";
import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

const DESKTOP_CONFIG_KEY = "desktop-config";

export const useDesktop = defineStore("desktop", () => {
    const desktopIcons = ref<[][]>([]);
    // TODO Implement a background ref for this store
    // const config = reactive<DesktopConfig>({});
    const config = toReactive(useLocalStorage<DesktopConfig>(DESKTOP_CONFIG_KEY, {}));
    const desktopVars = computed(() => {
        return {};
    });
    return {
        config,
        desktopIcons,
        desktopVars,
    };
});

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDesktop, import.meta.hot));
}
