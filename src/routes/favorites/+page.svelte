<script lang="ts">
    import { tooltip } from '$lib/actions';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import Container from '$lib/components/Container.svelte';
    import { favoritePalettes } from '$lib/stores';
    import PaletteCard from '$lib/components/PaletteCard.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<Container>
    <div class="animate-fade-in mx-auto flex flex-col">
        <section class="mt-14 flex items-center gap-3">
            <p class="font-serif text-3xl font-bold">Favorites</p>
            <i class="fa-regular fa-circle-info text-zinc-400 transition-colors hover:text-zinc-500" use:tooltip={{ text: 'Palettes are saved locally in your browser', offset: [0, 8], touch: true }} />
        </section>

        <div class="mt-16">
            {#if $favoritePalettes.palettes.length === 0}
                <div class="flex flex-col items-center justify-center text-center">
                    <p class="mb-10 max-w-lg text-xl font-medium text-zinc-500">Favorite your first palette to get started.</p>
                    <Button text="Brew a palette" icon="fa-solid fa-cauldron" href="/brew" />
                </div>
            {:else}
                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                    {#each $favoritePalettes.palettes.reverse() as palette (palette.id)}
                        <div in:fade={{ duration: 1000, delay: 700 }} out:fade animate:flip={{ duration: 700, delay: 250 }}>
                            <PaletteCard {palette} favoriteControlsVisible />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div>
</Container>
