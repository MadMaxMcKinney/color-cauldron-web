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
    <div class="flex flex-col mx-auto animate-fade-in">
        <section class="mt-14 flex gap-3 items-center">
            <p class="font-bold text-3xl font-serif">Favorites</p>
            <i class="fa-regular fa-circle-info text-zinc-400 text-[20p] transition-colors hover:text-zinc-500" use:tooltip={{ text: 'Palettes are saved locally in your browser', offset: [0, 8] }} />
        </section>

        <div class="mt-16">
            {#if $favoritePalettes.palettes.length === 0}
                <div class="flex flex-col text-center justify-center items-center">
                    <i class="fa-light fa-palette text-[55px] text-brand-green mb-6" />
                    <p class="text-xl font-medium max-w-lg text-zinc-500 mb-10">Looks like there aren’t any favorited palettes yet, why don’t you head over to the cauldron and see what you can brew up!</p>
                    <Button text="Brew something awesome" icon="fa-regular fa-cauldron" href="/brew" />
                </div>
            {:else}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {#each $favoritePalettes.palettes.reverse() as palette (palette.id)}
                        <div in:fade={{ duration: 1000, delay: 700 }} out:fade animate:flip={{ duration: 700, delay: 250 }}>
                            <PaletteCard {palette} isFavorite />
                        </div>
                    {/each}
                </div>
            {/if}
        </div>
    </div></Container
>
