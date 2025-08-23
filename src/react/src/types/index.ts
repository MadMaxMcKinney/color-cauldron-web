export interface PaletteColor {
  hex: string
  name: string
}

export interface Palette {
  id: string
  name: string
  colors: PaletteColor[]
  prompt?: string
  createdAt?: string
}