/**
 * Given a hex color, return the color that contrasts it, either black or white based on the luminance of the color provided.
 * @param color The hex of the chosen color
 * @returns The color that contrasts the chosen color
 */
export function getContrastColorFromHex(color: string): string {
    // If the color is in the format #RRGGBB, remove the #.
    if (color.includes('#')) color = color.replace('#', '');
    // Convert the hex color to RGB.
    const r = isValidHex(color.substring(0, 2)) ? parseInt(color.substring(0, 2), 16) / 255 : 0;
    const g = isValidHex(color.substring(2, 4)) ? parseInt(color.substring(2, 4), 16) / 255 : 0;
    const b = isValidHex(color.substring(4, 6)) ? parseInt(color.substring(4, 6), 16) / 255 : 0;

    function isValidHex(hex: string): boolean {
        const regex = /^[0-9A-Fa-f]{2}$/;
        return regex.test(hex);
    }
    // Calculate the luminance of the color.
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.5 ? '#000' : '#fff';
}
