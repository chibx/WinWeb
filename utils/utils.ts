export function delay(number: number) {
    return new Promise<void>((resolve) => {
        setTimeout(resolve, number);
    });
}

export function pad(str: string | number) {
    return ("" + str).padStart(2, "0");
}