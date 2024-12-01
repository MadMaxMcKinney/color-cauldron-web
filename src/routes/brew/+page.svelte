<script lang="ts">
    import { fade } from 'svelte/transition';
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

    $: {
        // When the palettesDiv appears, scroll to it. This only happens when the first palette gets made
        if (palettesDiv) {
            window.scrollTo({ top: palettesDiv.offsetTop, left: 0, behavior: 'smooth' });
        }
    }
</script>

<div class="animate-fade-in">
    <Container size="small" bg="bg-bg-secondary">
        <div class="my-10">
            <p class="font-serif text-3xl font-bold">Brew a palette</p>
            <p class="mt-4 w-full text-base font-medium text-zinc-600 md:text-lg">Describe how you would use the colors, the theme of the colors, or something that makes you think of colors, then sit back and let the magic happen.</p>
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
        </div>
    </Container>
    <Container size="small">
        {#if palettes.length > 0}
            <section class="mt-16" in:fade={{ duration: 1000, delay: 700 }} bind:this={palettesDiv}>
                <p class="mb-6 font-serif text-lg font-bold">Recent creations</p>
                <div class="flex flex-col gap-8">
                    {#each palettes as palette, index (palette.id)}
                        <div in:fade={{ duration: 1000, delay: 700 }} animate:flip={{ duration: 700 }}>
                            <PaletteCard {palette} />
                        </div>
                    {/each}
                </div>
            </section>
        {/if}
    </Container>
</div>
