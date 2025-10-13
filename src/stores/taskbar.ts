import type { StartMenuStyles, TaskBarConfig, TaskBarIcon } from "@/types/desktop";
import { toReactive, useLocalStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { reactive, computed, ref } from "vue";

export const useTaskbar = defineStore("taskbar", () => {
    const taskbarIcons = reactive<TaskBarIcon[]>([]);
    const config = reactive<TaskBarConfig>({
        position: "bottom",
        iconPosition: "center",
        shouldHide: false,
        // TODO Make these two accept an array of value [r, g, b, a]
        bgColor: "#1b0027",
        iconHoverColor: "#ffffff41",
    });
    const taskbarVars = computed(() => {
        return {
            "--taskbar-bg": config.bgColor,
            "--icon-hover-color": config.iconHoverColor,
        };
    });

    return {
        config,
        taskbarIcons,
        taskbarVars,
    };
});
