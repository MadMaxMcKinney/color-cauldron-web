// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
    namespace App {
        // interface Error {}
        // interface Locals {}
        // interface PageData {}
        // interface Platform {}
    }

    declare namespace svelteHTML {
        interface HTMLAttributes<T> {
            'on:dialoganswer'?: (event: CustomEvent<any> & { target: EventTarget & T }) => void;
        }
    }

    interface Palette {
        name: string;
        colors: PaletteColor[];
        id: string;
        createdAt: Date;
    }

    type PaletteColor = {
        name: string;
        hex: string;
    };
}

export {};
