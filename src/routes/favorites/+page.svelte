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
    <div class="mx-auto flex animate-fade-in flex-col">
        <section class="mt-14 flex items-center gap-3">
            <p class="font-serif text-3xl font-bold">Favorites</p>
            <i class="fa-regular fa-circle-info text-[20p] text-zinc-400 transition-colors hover:text-zinc-500" use:tooltip={{ text: 'Palettes are saved locally in your browser', offset: [0, 8] }} />
        </section>

        <div class="mt-16">
            {#if $favoritePalettes.palettes.length === 0}
                <div class="flex flex-col items-center justify-center text-center">
                    <i class="fa-light fa-palette mb-6 text-[55px] text-brand-green" />
                    <p class="mb-10 max-w-lg text-xl font-medium text-zinc-500">Looks like there aren’t any favorited palettes yet, why don’t you head over to the cauldron and see what you can brew up!</p>
                    <Button text="Brew something awesome" icon="fa-regular fa-cauldron" href="/brew" />
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
    </div></Container
>
