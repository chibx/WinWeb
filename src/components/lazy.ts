import { delay, isHomeScreenLoading } from "@/utils/utils";
import { defineAsyncComponent } from "vue";

async function loadHomeScreen() {
    isHomeScreenLoading.value = true;
    try {
        const cmp = await import("@/components/Windows/HomeScreen.vue");
        await delay(1000);
        console.log("Loading...");
        return cmp;
    } finally {
        console.log("Loaded!!!");
        isHomeScreenLoading.value = false;
    }
    // return import("@/components/Windows/HomeScreen.vue")
    //   .then(
    //       /* @__PURE__ */ async (cmp) => {
    //           // isHomeScreenLoading.value = false;
    //           return cmp;
    //       },
    //   )
    //   .finally(
    //       /* @__PURE__ */ () => {
    //           isHomeScreenLoading.value = false;
    //       },
    //   );
}

const LazyLoginWindowsForm = defineAsyncComponent(() => import("@/components/Login/WindowsForm.vue"));
const LazyWindowsHomeScreen = defineAsyncComponent(loadHomeScreen);

export { LazyLoginWindowsForm, LazyWindowsHomeScreen };
