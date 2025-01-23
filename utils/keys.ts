import type { InjectionKey } from "vue";
import type { FunctionHandler } from "./utils";
import type { OpenWindow } from "~/applications/types";

const SELECTED_USER: InjectionKey<Ref<User | null>> = Symbol();
const CLOSE_HANDLER: InjectionKey<FunctionHandler> = Symbol();
const WINDOW_PROPS: InjectionKey<OpenWindow> = Symbol();


export {
    CLOSE_HANDLER,
    SELECTED_USER,
    WINDOW_PROPS,
};