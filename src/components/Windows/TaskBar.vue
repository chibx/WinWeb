<script lang="ts" setup>
import { animate } from "motion";
import WindowsTaskBarIcon from "@/components/Windows/TaskBarIcon.vue";
import { useNow, useDateFormat, useEventListener } from "@vueuse/core";
import { rClick, stubTaskbarIcons } from "@/utils/desktop";
import { useTemplateRef, computed, unref, nextTick, watch, onMounted } from "vue";
import { battery, delay } from "@/utils/utils";
import { ICONS } from "@/utils/icons";
import { Icon } from "@iconify/vue";
import { useTaskbar } from "@/stores/taskbar";
import { useStartMenu } from "@/stores/startmenu";
import { storeToRefs } from "pinia";
import { useTaskbarIconDrag } from "@/composables/taskbar";
import { useSettings } from "@/stores/settings";

const taskbar = useTaskbar();
const startMenu = useStartMenu();
const { startMenuIcon: startMenuIconRef } = storeToRefs(startMenu);

// const taskbarEl = useTemplateRef("taskbar");
// const rightBar = useTemplateRef("taskbar-right");
const innerBar = useTemplateRef("taskbar-inner");
useTaskbarIconDrag(innerBar);

const isCentered = computed(() => taskbar.config.iconPosition === "center");
const { charging, level } = battery;
const now = useNow();
const taskbarTime = useDateFormat(now, "h:mm A");
const taskbarDate = useDateFormat(now, "MM/DD/YYYY");

// TODO Handle positioning the taskbar on different screens
function animateBar(dur: number) {
    const taskbarWrapEl = document.querySelector("#task-wrapper");
    if (!taskbarWrapEl) {
        return;
    }
    const style = isCentered.value
        ? {
              transform: ["translateX(0)", "translateX(-50%)"],
              left: ["0", "50%"],
          }
        : {
              transform: ["translateX(-50%)", "translateX(0)"],
              left: ["50%", "0"],
          };

    animate(
        taskbarWrapEl,
        { ...style, opacity: [0.75, 0, 1] },
        {
            duration: dur,
        },
    );
}

function toggleTaskbarPos() {
    taskbar.config.iconPosition = taskbar.config.iconPosition == "center" ? "left" : "center";
}

watch(isCentered, async () => {
    animateBar(0.3);
});

onMounted(() => {
    animateBar(0.3);
});
</script>

<template>
    <div
        id="taskbar"
        class="fixed flex gap-2.5 z-[999] w-full py-[4px] bottom-0 left-0 place-content-center select-none"
        :style="taskbar.taskbarVars"
        @contextmenu.prevent=""
    >
        <div class="w-full">
            <div id="task-wrapper" class="w-fit h-full relative pl-2.5 flex items-center gap-0.5">
                <WindowsTaskBarIcon
                    ref="startMenuIconRef"
                    class="windows-start-icon"
                    name="Start"
                    icon="/icons/windows_11.svg"
                    :r-click="rClick"
                    @click="startMenu.isOpen = !startMenu.isOpen"
                />

                <WindowsTaskBarIcon name="Microsoft Copilot" icon="/icons/microsoft-copilot.svg" :r-click="rClick" />
                <WindowsTaskBarIcon
                    name="Toggle Align"
                    icon="/icons/home.svg"
                    :r-click="rClick"
                    @click="toggleTaskbarPos"
                />

                <div id="taskbar-inner" ref="taskbar-inner" class="flex items-center">
                    <WindowsTaskBarIcon
                        v-for="{ icon, name, rClick: rC } in stubTaskbarIcons"
                        :key="name"
                        :name="name"
                        :icon="icon"
                        :r-click="rC"
                    />
                </div>
            </div>
        </div>

        <div ref="taskbar-right" class="taskbar-right flex items-center gap-[5px]">
            <div class="chevron-ic">
                <Icon :icon="ICONS['chevron-up']" />
            </div>

            <div class="adjustible-icons h-full flex">
                <div>
                    <Icon :icon="ICONS['online']" />
                </div>

                <!-- :title="charging ? `${chargingTime} ${level * 100}%` : `${dischargingTime} ${level * 100}%`" -->
                <div :title="`${level * 100}% left`">
                    <Icon
                        :icon="
                            charging
                                ? ICONS['battery-charging']
                                : level > 0.75
                                  ? ICONS['battery']
                                  : ICONS['battery-half']
                        "
                    />
                </div>

                <div>
                    <Icon :icon="ICONS['volume-high']" />
                </div>
            </div>

            <div class="date-group h-full flex items-center">
                <div class="flex flex-col text-right text-sm px-[5px]">
                    <div>{{ taskbarTime }}</div>
                    <div>{{ taskbarDate }}</div>
                </div>
                <div>
                    <Icon :icon="ICONS['notification']" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#taskbar {
    background: var(--taskbar-bg);
    transition: 0.15s linear;
    min-height: 55px;
    z-index: 3;
}

.chevron-ic {
    padding: 0 7px;
}

.adjustible-icons > div {
    padding: 0 7px;
}

.chevron-ic,
.adjustible-icons > div,
.date-group > div {
    height: 100%;
    place-content: center;
    cursor: pointer;
}

.chevron-ic:hover,
.adjustible-icons > div:hover {
    background-color: rgba(255, 255, 255, 0.26);
}

.date-group > div:last-child {
    padding: 0 15px;
}

.date-group > div:hover {
    background-color: rgba(255, 255, 255, 0.26);
}
</style>
