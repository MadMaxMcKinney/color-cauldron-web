<script lang="ts">
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import { tooltip } from '$lib/actions';
    import { getContrastColorFromHex } from '$lib/utils';
    import { favoritePalettes } from '$lib/stores';

    // PROPS
    export let palette: Palette;
    // Whether the palette is a favorite
    export let isFavorite: boolean = false;
    /////

    let paletteDataURI: string;
    let elemPaletteDownload: HTMLAnchorElement;
    // Whether the palette is being set as a favorite, but not yet saved so we don't want to show the additional saved palette controls
    let isSettingAsFavorite: boolean = false;

    function copyColor(color: PaletteColor) {
        navigator.clipboard.writeText(color.hex);
        toast.success(`Copied to clipboard ${color.hex}`, {
            iconTheme: {
                primary: color.hex,
                secondary: getContrastColorFromHex(color.hex)
            }
        });
    }

    function setDownloadForPalette(palette: Palette) {
        // Create a canvas to draw the palette on so that we can later download it
        let c: HTMLCanvasElement = document.createElement('canvas');
        const canvasWidth = 300;
        const canvasHeight = 256;
        const paletteColorHeight = 210;

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
            const legibleColor = getContrastColorFromHex(palette.colors[0].hex);
            // Add border
            ctx.fillStyle = legibleColor;
            ctx.fillRect(0, paletteColorHeight, canvasWidth, 1);
            // Add info text
            ctx!.fillStyle = legibleColor;
            ctx!.font = '14px sans-serif';
            ctx!.fillText('colorcauldron.app', 4, paletteColorHeight + 17);
        }

        elemPaletteDownload.href = c.toDataURL();
    }

    function savePaletteAsFavorite() {
        if (isSettingAsFavorite) return;
        // Save the palette as a favorite
        isSettingAsFavorite = true;
        try {
            $favoritePalettes.palettes = [...$favoritePalettes.palettes, palette];
            toast.success('Saved as favorite');
        } catch {
            toast.error('Failed to save, please try again');
            isSettingAsFavorite = false;
        }
    }

    function removeFavorite() {
        $favoritePalettes.palettes = $favoritePalettes.palettes.filter((p) => p.id !== palette.id);
    }

    onMount(() => {
        setDownloadForPalette(palette);
    });
</script>

<div class="flex flex-col rounded-[13px] border border-zinc-200 overflow-hidden h-[160px]">
    <div class="flex flex-row overflow-hidden w-full h-full">
        {#each palette.colors as color}
            <button
                class="h-full w-full flex justify-center items-center group transition-all hover:shadow-[var(--shadow-color)] hover:shadow-xl hover:z-10 hover:scale-110 active:scale-100"
                style="background-color: {color.hex}; --shadow-color: {color.hex}"
                on:click={() => copyColor(color)}
                use:tooltip={{ text: `${color.name} ${color.hex}` }}
            >
                <span class="flex justify-center items-center text-xl bg-white rounded-full w-10 h-10 transition-all opacity-0 group-hover:opacity-100"><i class="fa-regular fa-copy" /></span>
            </button>
        {/each}
    </div>
    <div class="flex justify-between">
        <!-- Palette name -->
        <div class="px-4 py-3">
            <p class="font-medium text-lg leading-tight text-zinc-500">{palette.name}</p>
        </div>
        <!-- Actions -->
        <!-- Todo: Make these action icons a component -->
        <div class="flex">
            {#if !isFavorite}
                <!-- Favorite -->
                <button class="text-brand-green hover:text-green-200 flex justify-center items-center transition-colors w-10 h-full text-base" use:tooltip={{ text: 'Favorite' }} on:click={savePaletteAsFavorite}>
                    <i class={`${isSettingAsFavorite ? 'fa-solid' : 'fa-regular'} fa-heart text-lg`} />
                </button>
            {/if}
            <!-- Download -->
            <a class="text-brand-green hover:text-green-200 flex justify-center items-center transition-colors w-10 h-full text-base" href={paletteDataURI} download="{palette.name} palette" bind:this={elemPaletteDownload} use:tooltip={{ text: 'Download' }}>
                <i class="fa-regular fa-download text-lg" />
            </a>
            {#if isFavorite}
                <span class="h-full w-[1px] bg-zinc-100" />
                <!-- Delete -->
                <button class="text-zinc-500 hover:text-zinc-200 flex justify-center items-center transition-colors w-10 h-full text-base" use:tooltip={{ text: 'Remove favorite' }} on:click={removeFavorite}>
                    <i class="fa-regular fa-xmark text-lg" />
                </button>
            {/if}
        </div>
    </div>
</div>
