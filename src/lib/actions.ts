import tippy from 'tippy.js';
import Dialog from '$lib/components/Dialog.svelte';
import type { SvelteComponent } from 'svelte';

interface TooltipOptions {
    text: string;
    offset?: [number, number];
}

export function tooltip(elem: HTMLElement, { text, offset }: TooltipOptions) {
    tippy(elem, {
        content: text,
        delay: 300,
        arrow: false,
        theme: 'cauldron',
        hideOnClick: true,
        offset: offset ? offset : [0, -10]
    });

    return {
        destroy() {
            tippy(elem).destroy();
        }
    };
}

/**
 * Create a dialog component and expose an event to listen for the answer via `on:dialoganswer`
 * @param node The node this action is attached to via use:
 * @param options Parameters for the dialog
 * @returns a destroy function to clean up the dialog component
 */
export function dialog(node: Node, options: { title: string; confirmPrompt?: string; cancelPrompt?: string }) {
    let dialogComponent: SvelteComponent;

    function openDialog(title: string, confirmPrompt?: string, cancelPrompt?: string) {
        dialogComponent = new Dialog({
            target: document.body,
            intro: true,
            props: { visible: false, title, confirmPrompt, cancelPrompt }
        });

        //
        dialogComponent.$set({ visible: true });

        // Event from dispatchEvent of the component
        dialogComponent.$on('close', (event) => {
            const { answer } = event.detail;
            node.dispatchEvent(new CustomEvent('dialoganswer', { detail: { answer } }));
            //dialogComponent.$destroy();
        });
    }

    // Listen for a click from the node this action is attached to
    node.addEventListener('click', () => openDialog(options.title || 'Are you sure?', options.confirmPrompt || 'Confirm', options.cancelPrompt || 'Cancel'));

    return {
        destroy() {
            if (dialogComponent) {
                dialogComponent.$destroy();
            }
        }
    };
}
