<script lang="ts">
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import {getLegibleTextColorFromHex} from '$lib/utils'

    export let palette: Palette;
    let paletteDataURI: string;
    let elemPaletteDownload: HTMLAnchorElement;

    /**
     * Copy the color to the clipboard
     * @param color The color to copy
     */
    function copyColor(color: PaletteColor) {
        navigator.clipboard.writeText(color.hex);
        toast.success(`Copied to clipboard ${color.hex}`);
    }

    function setDownloadForPalette(palette: Palette) {
        // Create a canvas to draw the palette on so that we can later download it
        let c: HTMLCanvasElement = document.createElement('canvas');
        const canvasWidth = 180;
        const canvasHeight = 56;
        const paletteColorHeight = 30;

        c.width = canvasWidth;
        c.height = canvasHeight;

        let ctx = c.getContext('2d');
        if (ctx) {
            // Add BG color to the canvas based on the first color the palette
            ctx.fillStyle = palette.colors[0].hex;
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            // Add each color
            palette.colors.forEach((color, i) => {
                ctx!.fillStyle = color.hex;
                ctx!.fillRect((i * canvasWidth) / 5, 0, canvasWidth / 5, paletteColorHeight);
            });
            // Get a legible text and border color to be used based on the first color in the palette
            const legibleColor = getLegibleTextColorFromHex(palette.colors[0].hex);
            // Add border
            ctx.fillStyle = legibleColor;
            ctx.fillRect(0, paletteColorHeight, canvasWidth, 1);
            // Add info text
            ctx!.fillStyle = legibleColor;
            ctx!.font = '10px sans-serif';
            ctx!.fillText("colorcauldron.app", 4, paletteColorHeight + 17)
        }

        elemPaletteDownload.href = c.toDataURL();
    }

    onMount(() => {
        setDownloadForPalette(palette);
    });
</script>

<div class="flex flex-col rounded-[13px] border border-zinc-200 overflow-hidden h-[160px]">
    <div class="flex flex-row overflow-hidden w-full h-full">
        {#each palette.colors as color}
            <button class="h-full w-full flex justify-center items-center group transition-all hover:shadow-2xl hover:z-10 hover:scale-110 active:scale-100" style="background-color: {color.hex};" on:click={() => copyColor(color)}>
                <span class="flex justify-center items-center text-xl bg-white rounded-full w-10 h-10 transition-all opacity-0 group-hover:opacity-100"><i class="fa-sharp fa-regular fa-clipboard" /></span>
            </button>
        {/each}
    </div>
    <div class="flex justify-between">
        <div class="px-4 py-3">
            <p class="font-medium text-lg leading-tight text-zinc-500">{palette.name}</p>
        </div>
        <div class="flex border-l border-zinc-200">
            <a class="text-black hover:text-zinc-400 flex justify-center items-center transition-colors w-12 h-full text-base" href={paletteDataURI} download="{palette.name} palette" bind:this={elemPaletteDownload}>
                <i class="fa-sharp fa-regular fa-down-from-dotted-line" />
            </a>
        </div>
    </div>
</div>
