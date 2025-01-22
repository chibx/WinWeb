import type { UseBatteryReturn } from "@vueuse/core";
import type { InjectionKey } from "vue";

const SELECTED_USER: InjectionKey<Ref<User | null>> = Symbol();
const WINDOW_SIZE: InjectionKey<{ width: number; height: number }> = Symbol();
const BATTERY: InjectionKey<UseBatteryReturn> = Symbol()



export {
    BATTERY,
    WINDOW_SIZE,
    SELECTED_USER,
};