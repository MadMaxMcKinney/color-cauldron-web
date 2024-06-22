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
