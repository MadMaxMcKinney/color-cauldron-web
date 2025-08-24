<script lang="ts">
    import { fade, slide } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import PaletteCard from '$lib/components/PaletteCard.svelte';
    import BrewInput from '$lib/components/BrewInput.svelte';
    import Container from '$lib/components/Container.svelte';
    import { linear, quadInOut } from 'svelte/easing';
    import GridBg from '$lib/components/GridBG.svelte';
    let isFetchingPalette: boolean = false;
    let hasPalettes: boolean = false;
    let brewInput: string = '';
    let palettes = [] as Palette[];
    let palettesDiv: HTMLElement;

    async function brew() {
        if (brewInput.length === 0) return;
        // Result the current palette
        isFetchingPalette = true;
        // Fetch the palette from the server
        let res = await fetch(`/api/brew?prompt=${brewInput}`, {
            method: 'GET'
        });
        let newPalette = await res.json();
        if (newPalette) hasPalettes = true;
        // Short delay to allow for animation
        await new Promise((resolve) => setTimeout(resolve, 500));
        // Svelte doesn't rerender when you push to an array, so we need to create a new array with the new palette
        palettes = [newPalette, ...palettes];
        // Stop the loading animation
        isFetchingPalette = false;
    }

    // Client side length limit for the prompt. The server will also check this.
    $: {
        if (brewInput.length > 100) {
            brewInput = brewInput.slice(0, 100);
        }
    }
</script>

<div class="animate-fade-in grid flex-1 {hasPalettes ? 'grid-rows-[0fr_auto_0fr]' : 'grid-rows-[1fr_auto_1fr]'} transition-all duration-[1000ms] ease-in-out">
    <!-- Spacer -->
    <div></div>
    <Container size="small">
        <div class="flex flex-col py-8">
            <!-- Info -->
            {#if !hasPalettes}
                <div class="mb-8 flex flex-col items-center gap-4 text-center" out:slide={{ duration: 700, easing: quadInOut }}>
                    <p class="font-serif text-3xl font-bold">Brew a palette</p>
                    <p class="w-full max-w-[550px] text-base text-zinc-600 md:text-lg">Describe the theme of your colors, vibes, or use cases.</p>
                </div>
            {/if}
            <!-- Palettes (Mobile) -->
            {#if palettes.length > 0}
                <section class="block md:hidden" in:fade={{ duration: 1000, delay: 500 }} bind:this={palettesDiv}>
                    <div class="flex flex-col gap-8">
                        {#each palettes as palette, index (palette.id)}
                            <div in:fade={{ duration: 1000, delay: 700 }} animate:flip={{ duration: 700 }}>
                                <PaletteCard {palette} freshlyCreated />
                            </div>
                        {/each}
                    </div>
                </section>
            {/if}
            <div class="{hasPalettes ? 'fixed right-6 bottom-20 left-6' : ''} z-30 block md:sticky md:inset-auto md:top-4">
                <div class="flex flex-col gap-2 md:mt-0 md:mb-10">
                    <BrewInput bind:value={brewInput} loading={isFetchingPalette} onBrew={() => brew()} isFloating={hasPalettes} />
                    <div class="flex w-full items-center justify-end gap-2">
                        {#if brewInput.length > 80}
                            <span class="text-sm font-medium text-zinc-500">{brewInput.length}/100</span>
                        {/if}
                    </div>
                    <GridBg />
                </div>
            </div>
            <!-- Palettes (Desktop) -->
            {#if palettes.length > 0}
                <section class="hidden md:block" in:fade={{ duration: 1000, delay: 500 }} bind:this={palettesDiv}>
                    <div class="flex flex-col gap-8">
                        {#each palettes as palette, index (palette.id)}
                            <div in:fade={{ duration: 1000, delay: 700 }} animate:flip={{ duration: 700 }}>
                                <PaletteCard {palette} freshlyCreated />
                            </div>
                        {/each}
                    </div>
                </section>
            {/if}
        </div>
    </Container>
    <!-- Spacer -->
    <div></div>
</div>
