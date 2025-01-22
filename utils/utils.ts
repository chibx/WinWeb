export const showLogin = ref(false);
export const isLoginSuccess = ref(false);
export const totalUsers = ref<User[]>([]);
export const desktopIcons = new Set<DesktopIconWithFocus>();
export const focusedIcons = new Set<DesktopIconWithFocus>();
export const events = ['keydown', 'keyup'] as (keyof WindowEventMap)[]
export const keyboardKeys = reactive({
    shift: useKeyModifier('Shift', { initial: false, events }),
    ctrl: useKeyModifier('Control', { initial: false, events }),
})


export function delay(number: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, number);
    });
}

export function pad(str: string | number) {
    return ("" + str).padStart(2, "0");
}