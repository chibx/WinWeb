<script lang="ts" setup>
import { startMenuStyles, useDesktop } from "@/stores/desktop";
import type { StartMenuProps } from "@/types/desktop";
import { ICONS } from "@/utils/icons";
import { delay, startMenuIconRef } from "@/utils/utils";
import { Icon } from "@iconify/vue";
import { useElementBounding } from "@vueuse/core";
import { computed, onMounted, ref, type CSSProperties } from "vue";

defineProps<StartMenuProps>();

// Access start menu icon
// const startMenuIcon = ref<HTMLElement | null>(null);
const canShow = ref(false)
// const { left, update } = useElementBounding(startMenuIcon);
const { left, update } = useElementBounding(startMenuIconRef);
// watch(
//     left,
//     () => {
//         console.log(left.value);
//     },
//     { immediate: true },
// );

const desktop = useDesktop()

// TODO Handle the case of when users change taskbar position
const trueLeft = computed(() => {
    console.log("Left: ", left.value)
    return desktop.config.taskbar.iconPosition === "center" ? left.value : left.value + 20
})

const bgStyles = computed<CSSProperties>(() => {
    if (startMenuStyles.gradient) {
        return {
            // TODO:  Make the gradient possibly and array of gradients
            backgroundImage: startMenuStyles.gradient,
        };
    }
    // const [r, g, b] = startMenuStyles.bgColor;

    return {
        // backgroundColor: mat2Color(r, g, b, startMenuStyles.opacity),
    };
});

onMounted(() => {
    // startMenuIcon.value = document.querySelector<HTMLElement>(".windows-start-icon");
    delay(100).then(() => {
        update()
        canShow.value = true
    })
});
</script>

<template>
    <div v-if="canShow && open" class="start-menu w-[600px] h-150 rounded-xl p-5" :style="{
        position: 'absolute',
        left: trueLeft + 'px',
        bottom: '70px',
        ...bgStyles,
    }">
        <div class="flex flex-col gap-5">
            <div class="relative">
                <input type="text" class="start-search">
                <Icon class="absolute" :icon="ICONS['search']" />
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
        inset 15px 0px 80px #929292ad,
        inset -15px 0px 80px #929292ad;
}

.start-search {
    width: 100%;
    border: none;
}
</style>
