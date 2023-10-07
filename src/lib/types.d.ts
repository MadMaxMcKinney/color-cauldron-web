interface Palette {
    name: string;
    colors: PaletteColor[];
}

type PaletteColor = {
    name: string;
    hex: string;
};
