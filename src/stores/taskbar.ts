import type { TaskBarIcon } from "@/types/taskbar";
import { defineStore } from "pinia";
import { reactive, computed } from "vue";
import { useSettings } from "./settings";

export const useTaskbar = defineStore("taskbar", () => {
    const settings = useSettings();
    const config = computed(() => settings.config.taskbar);
    const taskbarIcons = reactive<TaskBarIcon[]>([]);
    const taskbarVars = computed(() => {
        return {
            "--taskbar-bg": settings.config.taskbar.bgColor,
            "--icon-hover-color": settings.config.taskbar.iconHoverColor,
        };
    });

    return {
        config,
        taskbarIcons,
        taskbarVars,
    };
});
