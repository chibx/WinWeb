import { acceptHMRUpdate, defineStore } from "pinia";
import { computed, ref } from "vue";
import { useSettings } from "./settings";

export const useDesktop = defineStore("desktop", () => {
    const desktopIcons = ref<[][]>([]);
    const settings = useSettings();
    const config = computed(() => settings.config.desktop);
    // TODO Implement a background ref for this store
    // const config = reactive<DesktopConfig>({});
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
