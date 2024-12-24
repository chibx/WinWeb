import type { InjectionKey } from "vue";

const IS_LOGIN_SUCCESS: InjectionKey<Ref<boolean>> = Symbol();
const SHOW_LOGIN: InjectionKey<Ref<boolean>> = Symbol();
const SELECTED_USER: InjectionKey<Ref<User>> = Symbol();
const TOTAL_USERS: InjectionKey<Ref<User[]>> = Symbol();
const IS_ASSET_LOADED: InjectionKey<Ref<boolean>> = Symbol();
const WINDOW_SIZE:InjectionKey<{width: number; height: number}> = Symbol();
const DRAG_PANE_KEY: InjectionKey<DragPaneValidator> = Symbol()
const DESTOP_ICON_SET: InjectionKey<Set<HTMLElement>> = Symbol()



export { IS_LOGIN_SUCCESS, SHOW_LOGIN, SELECTED_USER, TOTAL_USERS, IS_ASSET_LOADED, WINDOW_SIZE, DRAG_PANE_KEY, DESTOP_ICON_SET };