import { delay, isHomeScreenLoading } from "@/utils/utils";
import { defineAsyncComponent } from "vue";

async function loadHomeScreen() {
    isHomeScreenLoading.value = true;
    try {
        const cmp = await import("@/components/Windows/HomeScreen.vue");
        // Simulate some delay
        await delay(1000);
        return cmp;
    } finally {
        isHomeScreenLoading.value = false;
    }
}

const LazyLoginWindowsForm = defineAsyncComponent(() => import("@/components/Login/WindowsForm.vue"));
const LazyWindowsHomeScreen = defineAsyncComponent(loadHomeScreen);

export { LazyLoginWindowsForm, LazyWindowsHomeScreen };
