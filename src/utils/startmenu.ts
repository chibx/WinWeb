import { animate } from "motion";

function extractTransformX(el: Element) {
    return /translateX\(.*?\)/.exec((el as HTMLElement).style.transform)?.[0] || "";
}

export function onBeforeEnter(el: Element) {
    (el as HTMLElement).style.opacity = "0";
}

export function onEnter(el: Element, done: () => void) {
    const tx = extractTransformX(el);
    animate(
        el,
        {
            transform: [`translateY(100px) ${tx}`, `translateY(0px) ${tx}`],
            // y: [100, 0],
            opacity: 1,
        },
        { duration: 0.25, onComplete: done },
    );
}

export function onLeave(el: Element, done: () => void) {
    const tx = extractTransformX(el);
    animate(
        el,
        {
            transform: `translateY(100px) ${tx}`,
            // y: 100,
            opacity: 0,
        },
        { duration: 0.25, onComplete: done },
    );
}
