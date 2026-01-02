<script lang="ts" setup>
import { useObjectUrl } from "@vueuse/core";
const props = defineProps<{
    src?: Blob | null;
    // height?: string,
    // width?: string
}>();

const imgSrc = useObjectUrl(props.src ? props.src : undefined);
</script>

<template>
    <div class="rounded-full overflow-hidden">
        <img v-if="imgSrc" :src="imgSrc" class="w-full h-full object-cover" alt="Profile" />
        <div v-else class="svg-bg w-full h-full">
            <svg
                role="img"
                alt="Placeholder Profile"
                class="w-full h-full"
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <g id="Group">
                    <path
                        id="Path"
                        d="M40 78.2222C30.1787 78.2222 21.1733 76.4418 14.2036 70.5476C5.52178 63.2045 0 52.2347 0 40C0 17.944 17.944 0 40 0C62.056 0 80 17.944 80 40C80 52.2356 74.4782 63.2044 65.7964 70.5476C58.8276 76.4427 49.8213 78.2222 40 78.2222C40 78.2222 40 78.2222 40 78.2222Z"
                        fill="#FFFFFF"
                        fill-opacity="0"
                    />
                    <path
                        id="Path"
                        d="M18.5049 37.0089C8.30134 37.0089 0 28.7076 0 18.5049C0 8.30133 8.30134 0 18.5049 0C28.7085 0 37.0089 8.30133 37.0089 18.5049C37.0089 28.7076 28.7085 37.0089 18.5049 37.0089C18.5049 37.0089 18.5049 37.0089 18.5049 37.0089Z"
                        fill="#FFFFFF"
                        transform="translate(21.495 16.956)"
                    />
                    <path
                        id="Path"
                        d="M26.4331 29.5911C16.9993 29.5911 7.83578 26.2373 0.630445 20.1467C0.0544462 19.6596 -0.151776 18.8631 0.115779 18.1582C4.24111 7.29689 14.818 0 26.4331 0C38.0482 0 48.6251 7.29689 52.7504 18.1582C53.018 18.8631 52.8118 19.6596 52.2358 20.1467C45.0304 26.2373 35.8669 29.5911 26.4331 29.5911C26.4331 29.5911 26.4331 29.5911 26.4331 29.5911Z"
                        fill="#FFFFFF"
                        transform="translate(13.567 50.409)"
                    />
                </g>
            </svg>
        </div>
    </div>
</template>

<style scoped></style>
