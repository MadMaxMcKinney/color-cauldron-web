<script lang="ts">
    import { onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import { tooltip } from '$lib/actions';
    import { getContrastColorFromHex } from '$lib/utils';
    import { favoritePalettes } from '$lib/stores';
    import { fade, scale } from 'svelte/transition';
    import Button from './Button.svelte';
    import { text } from '@sveltejs/kit';

    // PROPS
    export let palette: Palette;
    // Whether the palette is a favorite
    export let isFavorite: boolean = false;
    /////

    let paletteDataURI: string;
    let elemPaletteDownload: HTMLAnchorElement;
    // Whether the palette is being set as a favorite, but not yet saved so we don't want to show the additional saved palette controls
    let isSettingAsFavorite: boolean = false;
    let isExpanded: boolean = false;

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

    function closeLargePalette(e?: Event) {
        if (isExpanded) isExpanded = false;
    }

    onMount(() => {
        setDownloadForPalette(palette);
    });
</script>

<svelte:window
    on:keydown={(e) => {
        console.log(e);
        if (e.key == 'Escape') closeLargePalette();
    }}
/>

<div class="flex flex-col overflow-hidden rounded-[13px] border border-zinc-200">
    <div class="flex h-[120px] w-full flex-row overflow-hidden">
        {#each palette.colors as color}
            <button
                class="group flex h-full w-full items-center justify-center transition-all hover:z-10 hover:scale-110 hover:shadow-xl hover:shadow-[var(--shadow-color)] active:scale-100"
                style="background-color: {color.hex}; --shadow-color: {color.hex}"
                on:click={() => copyColor(color)}
                use:tooltip={{ text: `${color.name} ${color.hex}` }}
            >
                <span class="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl opacity-0 transition-all group-hover:opacity-100"><i class="fa-regular fa-copy" /></span>
            </button>
        {/each}
    </div>
    <div class="flex justify-between bg-white">
        <!-- Palette name -->
        <div class="px-4 py-3">
            <p class="text-lg font-medium leading-tight text-zinc-500">{palette.name}</p>
        </div>
        <!-- Actions -->
        <!-- Todo: Make these action icons a component -->
        <div class="flex">
            {#if !isFavorite}
                <!-- Favorite -->
                <button class="flex h-full w-10 items-center justify-center text-base text-brand-green transition-colors hover:text-green-200" use:tooltip={{ text: `${isSettingAsFavorite ? 'Saved' : 'Favorite'}` }} on:click={savePaletteAsFavorite}>
                    <i class={`${isSettingAsFavorite ? 'fa-solid' : 'fa-regular'} fa-heart text-lg`} />
                </button>
            {/if}
            <!-- Download -->
            <a class="flex h-full w-10 items-center justify-center text-base text-brand-green transition-colors hover:text-green-200" href={paletteDataURI} download="{palette.name} palette" bind:this={elemPaletteDownload} use:tooltip={{ text: 'Download' }}>
                <i class="fa-regular fa-download text-lg" />
            </a>
            <!-- Expand -->
            <button class="flex h-full w-10 items-center justify-center text-base text-brand-green transition-colors hover:text-green-200" use:tooltip={{ text: 'Expand' }} on:click={() => (isExpanded = true)}>
                <i class={`fa-regular fa-up-right-and-down-left-from-center text-lg`} />
            </button>
            {#if isFavorite}
                <span class="h-full w-[1px] bg-zinc-100" />
                <!-- Delete -->
                <button class="flex h-full w-10 items-center justify-center text-base text-zinc-500 transition-colors hover:text-zinc-200" use:tooltip={{ text: 'Remove favorite' }} on:click={removeFavorite}>
                    <i class="fa-regular fa-xmark text-lg" />
                </button>
            {/if}
        </div>
    </div>
</div>

{#if isExpanded}
    <!-- Large Palette -->
    <div in:fade={{ duration: 200 }} out:fade={{ delay: 200 }} class="fixed inset-0 z-10 bg-white/70 backdrop-blur-md">
        <div in:scale={{ delay: 250 }} out:scale class="absolute inset-4 flex flex-col overflow-clip rounded-[13px] shadow-md md:inset-24">
            <!-- Colors -->
            <div class="flex flex-1 flex-col md:flex-row">
                {#each palette.colors as color}
                    <button
                        class="group group relative flex h-full w-full items-center justify-center transition-all hover:z-10 hover:scale-105 active:scale-100 md:hover:shadow-xl md:hover:shadow-[var(--shadow-color)]"
                        style="background-color: {color.hex}; --shadow-color: {color.hex}"
                        on:click={() => copyColor(color)}
                    >
                        <span class="z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl opacity-0 transition-all group-hover:opacity-100"><i class="fa-regular fa-copy" /></span>
                        <div class="absolute bottom-6 flex flex-col opacity-50 transition-all md:group-hover:bottom-12" style={`color: ${getContrastColorFromHex(color.hex)}`}>
                            <span class="font-bold">{color.hex}</span>
                            <span>{color.name}</span>
                        </div>
                    </button>
                {/each}
            </div>
            <!-- Footer -->
            <footer class="z-20 flex flex-col justify-between gap-4 bg-white px-4 py-3 md:h-[80px] md:flex-row md:items-center">
                <p class="text-base font-medium leading-tight text-zinc-500 md:text-lg">{palette.name}</p>
                <!-- Actions -->
                <div class="flex gap-4">
                    {#if !isFavorite}
                        <Button text={isSettingAsFavorite ? 'Saved' : 'Favorite'} icon="fa-heart {isSettingAsFavorite ? 'fa-solid' : 'fa-regular'}" on:click={savePaletteAsFavorite} class="w-full flex-1 md:w-auto" />
                    {/if}
                    <Button text="Close" on:click={closeLargePalette} class="w-full flex-1 md:w-auto" />
                </div>
            </footer>
        </div>
    </div>
{/if}
