<script setup lang="ts">
import { ICONS } from "@/utils/icons";
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const curLocation = ref("Home");
</script>

<template>
    <div class="w-full bg-[#eaeaea60] dark:bg-[#00000030] py-2.5">
        <div class="controls px-2.5">
            <div class="nav flex items-center gap-1 text-black dark:text-white">
                <span>
                    <Icon :icon="ICONS['arrow-left']" height="20" width="20" />
                </span>
                <span>
                    <Icon :icon="ICONS['arrow-right']" height="20" width="20" />
                </span>
                <span>
                    <Icon :icon="ICONS['arrow-up']" height="20" width="20" />
                </span>
                <span>
                    <Icon :icon="ICONS['refresh']" height="20" width="20" />
                </span>
            </div>
            <div class="filepath rounded-[5px]"></div>
            <div class="search rounded-[5px]">
                <input
                    type="text"
                    class="text-black dark:text-white placeholder:text-black/60"
                    :placeholder="`Search ${curLocation}`"
                />
                <Icon
                    class="absolute top-1/2 -translate-y-1/2 right-2.5 text-black/60 dark:text-white"
                    :icon="ICONS['search']"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.controls {
    display: grid;
    grid-template-columns: 200px minmax(20%, 70%) max(200px, 25%);
    gap: 10px;
}

.nav span {
    display: block;
    padding: 7.5px;
    cursor: pointer;
    border-radius: 5px;
}

.nav span:hover {
    background-color: #eeeeee;
}

.nav span:hover {
    background-color: #eeeeee;
}

.filepath {
    border-radius: 5px;
    background-color: white;
    color: black;
}

.dark .filepath {
    background-color: rgb(77, 77, 117);
}

.search {
    border-radius: 5px;
    position: relative;
}

.search input {
    background-color: white;
    padding: 0 10px 0 15px;
    width: 100%;
    height: 100%;
    outline: none;
}

.dark .search input {
    background-color: rgb(77, 77, 117);
}
</style>
