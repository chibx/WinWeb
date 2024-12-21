import { defineStore, acceptHMRUpdate } from "pinia";

export const useDesktop = defineStore("desktop", () => {
    const taskbarIcons = ref<TaskBarIcon[]>([]);
    const desktopIcons = ref<[][]>([])
    const windows = ref([])
    const config = reactive({
        taskbar: {
            position: 'down',
            iconPosition: 'center',
            bgColor: '#d6f0cf',
            iconHoverColor: '#ffffff41',
            count: 0
        }
   })
   const desktopVars = computed(()=>{
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
        windows
    }
});

// Hot Module Replacement
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useDesktop, import.meta.hot));
}

