import type { InjectionKey } from "vue";
import type { FunctionHandler } from "./utils";

const SELECTED_USER: InjectionKey<Ref<User | null>> = Symbol();
const CLOSE_HANDLER: InjectionKey<FunctionHandler> = Symbol()



export {
    CLOSE_HANDLER,
    SELECTED_USER,
};