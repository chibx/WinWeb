import type { InjectionKey } from "vue";

const IS_LOGIN_SUCCESS: InjectionKey<Ref<boolean>> = Symbol("is-login-success");
const SHOW_LOGIN: InjectionKey<Ref<boolean>> = Symbol("show-login");
const SELECTED_USER: InjectionKey<Ref<User>> = Symbol("selected-user");
const TOTAL_USERS: InjectionKey<Ref<User[]>> = Symbol("total-users");
const IS_ASSET_LOADED = Symbol("is-asset-loading");
const WINDOW_SIZE = Symbol("window-size");




export { IS_LOGIN_SUCCESS, SHOW_LOGIN, SELECTED_USER, TOTAL_USERS, IS_ASSET_LOADED, WINDOW_SIZE };