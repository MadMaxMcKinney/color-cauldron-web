<script lang="ts">
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Palette from '$lib/components/Palette.svelte';
    import BrewInput from '$lib/components/BrewInput.svelte';

    let isFetchingPalette: boolean = false;
    let palettes: any[] = [];
    let brewInput: string = '';

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

<div class="max-w-[500px] px-6 flex flex-col mx-auto animate-fade-in">
    <section class="mt-14 flex flex-col gap-4">
        <p class="font-bold text-3xl font-serif">Brew a palette</p>
        <p class="font-medium text-lg w-full text-zinc-600">Describe how you would use the colors, then sit back and let the magic happen.</p>
    </section>
    <div class="mt-16">
        <div class="flex flex-col gap-2">
            <BrewInput bind:value={brewInput} loading={isFetchingPalette} onBrew={() => brew()} />
            <div class="flex items-center w-full justify-end gap-2">
                {#if brewInput.length > 80}
                    <span class="text-zinc-500 font-medium text-sm">{brewInput.length}/100</span>
                {/if}
            </div>
        </div>
    </div>
    <div class="mt-16 flex flex-col gap-8">
        {#each palettes as palette (palette)}
            <div in:fade={{ duration: 1000, delay: 700 }} animate:flip={{ duration: 700 }}>
                <Palette {palette} />
            </div>
        {/each}
    </div>
</div>
