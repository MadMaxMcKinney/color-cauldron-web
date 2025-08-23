<script lang="ts">
    import { blur, fade, slide } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import PaletteCard from '$lib/components/PaletteCard.svelte';
    import BrewInput from '$lib/components/BrewInput.svelte';
    import Container from '$lib/components/Container.svelte';
    let isFetchingPalette: boolean = false;
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

<div class="animate-fade-in flex flex-1 items-center transition-all duration-700">
    <Container size="small">
        <div class="my-10">
            <!-- Info -->
            {#if palettes.length === 0}
                <div class="flex flex-col items-center text-center" out:slide={{ duration: 2800 }}>
                    <p class="font-serif text-3xl font-bold">Brew a palette</p>
                    <p class="mt-4 w-full max-w-[550px] text-base text-zinc-600 md:text-lg">Describe the theme of your colors, vibes, or use cases.</p>
                </div>
            {/if}
            <!-- Prompt -->
            <div class="mt-10">
                <div class="flex flex-col gap-2">
                    <BrewInput bind:value={brewInput} loading={isFetchingPalette} onBrew={() => brew()} />
                    <div class="flex w-full items-center justify-end gap-2">
                        {#if brewInput.length > 80}
                            <span class="text-sm font-medium text-zinc-500">{brewInput.length}/100</span>
                        {/if}
                    </div>
                </div>
            </div>
            <!-- Palettes -->
            {#if palettes.length > 0}
                <section class="mt-12 mb-16" in:fade={{ duration: 1000, delay: 700 }} bind:this={palettesDiv}>
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
</div>
