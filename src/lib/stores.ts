import { persisted } from 'svelte-persisted-store';

export const favoritePalettes = persisted('favoritePalettes', {
    palettes: [] as Palette[]
});
