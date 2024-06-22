import tippy from 'tippy.js';

interface TooltipOptions {
    text: string;
    offset?: [number, number];
}

export function tooltip(elem: HTMLElement, { text, offset }: TooltipOptions) {
    tippy(elem, {
        content: text,
        delay: 100,
        arrow: false,
        theme: 'cauldron',
        offset: offset ? offset : [0, -10]
    });

    return {
        destroy() {
            tippy(elem).destroy();
        }
    };
}
