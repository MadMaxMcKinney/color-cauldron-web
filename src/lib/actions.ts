import tippy from 'tippy.js';

export function tooltip(elem:HTMLElement, text:string) {
    tippy(elem, {
        content: text,
        delay: 100,
        arrow: false,
        theme: 'cauldron',
        offset: [0, -10]
    });

    return {
        destroy() {
            tippy(elem).destroy();
        }
    }
}