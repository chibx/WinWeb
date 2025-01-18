import { defineStore, acceptHMRUpdate } from "pinia";

export const useDesktop = defineStore("desktop", () => {
    const taskbarIcons = reactive<TaskBarIcon[]>([]);
    const desktopIcons = ref<[][]>([])
    const config = reactive<DesktopConfig>({
        taskbar: {
            position: 'bottom',
            iconPosition: 'center',
            bgColor: '#1b0027',
            iconHoverColor: '#ffffff41',
            shouldHide: false
        }
    })
    const desktopVars = computed(() => {
        return {
            '--taskbar-bg': config.taskbar.bgColor,
            '--icon-hover-color': config.taskbar.iconHoverColor
        }
    })

    useLocalStorage('config', config);

    return {
        config,
        taskbarIcons,
        desktopIcons,
        desktopVars,
    }
});

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDesktop, import.meta.hot));
}

