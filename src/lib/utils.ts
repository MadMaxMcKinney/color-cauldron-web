export function getLegibleTextColorFromHex(color: string): string {
    // If the color is in the format #RRGGBB, remove the #.
    if(color.includes('#')) color = color.replace('#', '');
    // Convert the hex color to RGB.
    const r = parseInt(color.substring(0, 2), 16) / 255;
    const g = parseInt(color.substring(2, 2), 16) / 255;
    const b = parseInt(color.substring(4, 2), 16) / 255;
    // Calculate the luminance of the color.
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 0.5 ? '#000' : '#fff';
}
