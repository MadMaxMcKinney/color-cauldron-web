<script lang="ts">
    import { SvelteComponent, onMount } from 'svelte';
    import toast from 'svelte-french-toast';
    import { dialog, tooltip } from '$lib/actions';
    import { getContrastColorFromHex } from '$lib/utils';
    import { favoritePalettes } from '$lib/stores';
    import { scale } from 'svelte/transition';
    import Button from './Button.svelte';
    import Overlay from '$lib/components/utility/Overlay.svelte';
    import PaletteAction from '$lib/components/palette/PaletteAction.svelte';

    // PROPS
    export let palette: Palette;
    export let favoriteControlsVisible: boolean = false;
    export let showToolbar: boolean = true;
    export let size: 'small' | 'default' = 'default';
    /////

    const sizeClasses = {
        small: 'h-[70px]',
        default: 'h-[120px]'
    };

    const iconCopySizeClasses = {
        small: 'h-8 w-8 text-reg',
        default: 'h-10 w-10 text-xl'
    };

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

    async function downloadPalette() {
        toast.promise(savePalette(), {
            loading: 'Saving palette...',
            success: 'Palette saved!',
            error: 'Failed to save palette'
        });
        async function savePalette() {
            let paletteData = await fetch(`/api/palette/`, {
                method: 'POST',
                body: JSON.stringify(palette)
            });
            const paletteDataURI = await paletteData.blob();
            const paletteFile = new File([paletteDataURI], `${palette.name}.png`, { type: 'image/png' });
            if (navigator.share) {
                navigator.share({ files: [paletteFile] });
            } else {
                const url = URL.createObjectURL(paletteFile);
                const a = document.createElement('a');
                a.href = url;
                a.download = paletteFile.name;
                a.click();
                URL.revokeObjectURL(url);
            }
        }
    }

    function togglePaletteSavingAsFavorite() {
        if (isSettingAsFavorite) {
            isSettingAsFavorite = false;
            removeFavorite();
        } else {
            isSettingAsFavorite = true;
            setFavorite();
        }
    }

    function setFavorite() {
        // Make sure there isn't already a palette with the same id. Mostly a safety check that comes up during testing but let's be safe!
        if (!$favoritePalettes.palettes.find((p) => p.id === palette.id)) {
            $favoritePalettes.palettes = [...$favoritePalettes.palettes, palette];
        } else {
            toast.error('Palette already saved as favorite');
        }
    }

    function removeFavorite() {
        $favoritePalettes.palettes = $favoritePalettes.palettes.filter((p) => p.id !== palette.id);
    }

    function removeFavoriteHandler(e: any) {
        if (e.detail.answer === 'confirm') removeFavorite();
    }

    function closeLargePalette(e?: Event) {
        if (isExpanded) isExpanded = false;
    }
</script>

<svelte:window
    on:keydown={(e) => {
        console.log(e);
        if (e.key == 'Escape') closeLargePalette();
    }}
/>

<div class="shadow-elevated flex w-full flex-col overflow-hidden rounded-[13px] border-2 border-white">
    <div class="flex {sizeClasses[size]} w-full flex-row overflow-hidden">
        {#each palette.colors as color}
            <button
                class="group flex h-full w-full items-center justify-center transition-all hover:z-10 hover:scale-110 hover:shadow-[var(--shadow-color)] active:scale-105"
                style="background-color: {color.hex}; --shadow-color: {color.hex}"
                on:click={() => copyColor(color)}
                use:tooltip={{ text: `${color.name} ${color.hex}` }}
            >
                <span class="flex {iconCopySizeClasses[size]} items-center justify-center rounded-full bg-white opacity-0 transition-all group-hover:opacity-100 group-active:opacity-100"><i class="fa-regular fa-copy" /></span>
            </button>
        {/each}
    </div>
    <div class="bg-surface-primary flex justify-between">
        <!-- Palette name -->
        <div class="px-4 py-3">
            <p class="text-lg leading-tight font-medium text-zinc-500">{palette.name}</p>
        </div>
        <!-- Actions -->
        {#if showToolbar}
            <!-- Todo: Make these action icons a component -->
            <div class="flex">
                {#if !favoriteControlsVisible}
                    <!-- Favorite -->
                    {#if isSettingAsFavorite}
                        <PaletteAction icon="fa-solid fa-heart text-lg" on:click={togglePaletteSavingAsFavorite} tooltipParams={{ text: 'Unfavorite' }} />
                    {:else}
                        <PaletteAction icon="fa-regular fa-heart text-lg" tooltipParams={{ text: 'Favorite' }} on:click={togglePaletteSavingAsFavorite} />
                    {/if}
                {/if}
                <!-- Download -->
                <PaletteAction icon="fa-regular fa-download text-lg" on:click={downloadPalette} tooltipParams={{ text: 'Download' }} />
                <!-- Expand -->
                <PaletteAction icon="fa-regular fa-up-right-and-down-left-from-center text-lg" tooltipParams={{ text: 'Expand' }} on:click={() => (isExpanded = true)} />
                {#if favoriteControlsVisible}
                    <span class="h-full w-[1px] bg-zinc-100" />
                    <!-- Remove -->
                    <PaletteAction icon="fa-regular fa-xmark text-lg" tooltipParams={{ text: 'Remove favorite' }} type="secondary" dialogParams={{ title: `Remove: '${palette.name}' from favorites?`, confirmPrompt: 'Remove' }} on:dialoganswer={removeFavoriteHandler} />
                {/if}
            </div>
        {/if}
    </div>
</div>

{#if isExpanded}
    <!-- Large Palette -->
    <Overlay>
        <div in:scale={{ delay: 200, start: 0.8 }} out:scale={{ start: 0.8 }} class="absolute inset-4 flex flex-col overflow-clip rounded-[13px] text-clip shadow-md md:inset-24">
            <!-- Colors -->
            <div class="flex flex-1 flex-col md:flex-row">
                {#each palette.colors as color}
                    <button
                        class="group group relative flex h-full w-full items-center justify-center transition-all hover:z-10 hover:scale-105 active:scale-[102%] md:hover:shadow-[var(--shadow-color)] md:hover:shadow-xl"
                        style="background-color: {color.hex}; --shadow-color: {color.hex}"
                        on:click={() => copyColor(color)}
                    >
                        <span class="z-30 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl opacity-0 transition-all group-hover:opacity-100 group-active:opacity-100"><i class="fa-regular fa-copy" /></span>
                        <div class="absolute bottom-6 flex flex-col opacity-50 transition-all md:group-hover:bottom-12" style={`color: ${getContrastColorFromHex(color.hex)}`}>
                            <span class="font-bold">{color.hex}</span>
                            <span>{color.name}</span>
                        </div>
                    </button>
                {/each}
            </div>
            <!-- Footer -->
            <footer class="z-20 flex flex-col justify-between gap-4 bg-white px-4 py-3 md:h-[80px] md:flex-row md:items-center">
                <p class="text-base leading-tight font-medium text-zinc-500 md:text-lg">{palette.name}</p>
                <!-- Actions -->
                <div class="flex gap-4">
                    {#if !favoriteControlsVisible}
                        <Button text={isSettingAsFavorite ? 'Unfavorite' : 'Favorite'} icon="fa-heart {isSettingAsFavorite ? 'fa-solid' : 'fa-regular'}" on:click={togglePaletteSavingAsFavorite} class="w-full flex-1 md:w-auto" />
                    {/if}
                    <Button text="Close" on:click={closeLargePalette} class="w-full flex-1 md:w-auto" />
                </div>
            </footer>
        </div>
    </Overlay>
{/if}
