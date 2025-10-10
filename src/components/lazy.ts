import { defineAsyncComponent } from "vue";

const LazyLoginWindowsForm = defineAsyncComponent(() => import("@/components/Login/WindowsForm.vue"));

export { LazyLoginWindowsForm };
