import type { InjectionKey } from "vue";
import type { FunctionHandler } from "./utils";
import type { OpenWindow } from "~/applications/types";

const SELECTED_USER: InjectionKey<Ref<User | null>> = Symbol();
const CLOSE_REQUEST: InjectionKey<() => void> = Symbol();
const CLOSE_HANDLER: InjectionKey<FunctionHandler> = Symbol();
const WINDOW_PROPS: InjectionKey<OpenWindow> = Symbol();
const APP_ID: InjectionKey<string> = Symbol()


export {
    CLOSE_HANDLER,
    CLOSE_REQUEST,
    SELECTED_USER,
    WINDOW_PROPS,
    APP_ID
};