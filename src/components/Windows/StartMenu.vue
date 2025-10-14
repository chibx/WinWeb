<script lang="ts" setup>
import { useTaskbar } from "@/stores/taskbar";
import { useStartMenu } from "@/stores/startmenu";
import { ICONS } from "@/utils/icons";
import { delay } from "@/utils/utils";
import { Icon } from "@iconify/vue";
import { onClickOutside, useElementBounding } from "@vueuse/core";
import { computed, onMounted, type CSSProperties } from "vue";
import { watch } from "vue";
import { ref } from "vue";

// defineProps<StartMenuProps>();

// Access start menu icon
const startMenuEl = ref<HTMLElement | null>(null);
const taskbar = useTaskbar();
const startMenu = useStartMenu();
// const { left, update } = useElementBounding(startMenuIcon);
const { left, update } = useElementBounding(() => startMenu.startMenuIcon);
update();
onClickOutside(startMenuEl, () => {
    startMenu.isOpen = false;
});

watch(
    () => taskbar.config.iconPosition,
    () => {
        delay(350).then(update);
    },
);

// TODO Handle the case of when users change taskbar position
const trueLeft = computed(() => {
    return taskbar.config.iconPosition === "center" ? left.value - 100 : left.value + 20;
});

const bgStyles = computed<CSSProperties>(() => {
    if (startMenu.styles.gradient) {
        return {
            // TODO:  Make the gradient possibly and array of gradients
            backgroundImage: startMenu.styles.gradient,
        };
    }
    // const [r, g, b] = startMenuStyles.bgColor;

    return {
        // backgroundColor: mat2Color(r, g, b, startMenuStyles.opacity),
    };
});
</script>

<template>
    <div
        ref="startMenuEl"
        class="start-menu w-[600px] h-150 rounded-xl p-5"
        :style="{
            position: 'absolute',
            // left: trueLeft + 'px',
            transform: `translateX(${trueLeft}px)`,
            bottom: '70px',
            ...bgStyles,
        }"
    >
        <div class="flex flex-col gap-5">
            <div class="relative">
                <input name="start-search" type="text" class="start-search" placeholder="Search for anything..." />
                <Icon class="absolute text-blue-600 left-2.5 top-1/2 -translate-y-1/2" :icon="ICONS['search']" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.start-menu {
    /*background-image: linear-gradient(
        to bottom left,
        rgb(50, 169, 255) 20%,
        rgba(0, 149, 255, 0.435) 50%,
        rgb(122, 200, 255)
    );*/

    background-color: #f1f1f1;
    box-shadow:
        inset 10px 0px 50px #929292ad,
        inset -10px 0px 50px #929292ad;
}

.start-search {
    width: 100%;
    /*border: none;*/
    color: black;
    outline: none;
    background-color: white;
    padding: 5px 20px 5px 30px;
    /*border-radius: 0 0 10px 10px;*/
}

.start-search::placeholder {
    color: grey;
}

.start-search:focus {
    border-bottom: 2px solid #006dff;
}
</style>
