<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import logo from '$lib/assets/color-cauldron-logo-pot.svg';
    import Button from '$lib/components/Button.svelte';
    import { favoritePalettes } from '$lib/stores';

    let favButton: Button;

    let previousPaletteCount = $favoritePalettes.palettes.length || 0;

    $: {
        if (previousPaletteCount < $favoritePalettes.palettes.length) {
            favButton.notify();
        }
        previousPaletteCount = $favoritePalettes.palettes.length;
    }
</script>

<!-- Primary top nav -->
<nav class="flex h-[80px] animate-fade-in items-center border-b border-zinc-200 bg-white">
    <Container>
        <div class="flex justify-between">
            <a class="flex justify-between transition-all hover:opacity-70" href="/">
                <span class="flex items-center gap-2 font-serif text-xl font-bold"><img src={logo} alt="Black cauldron logo" class="h-auto w-[19px]" /> Color Cauldron</span>
            </a>
            <div class="hidden items-center gap-4 md:flex">
                <Button icon="fa-regular fa-cauldron" layout="icon" href="/brew" />
                <Button text="Favorites" icon="fa-regular fa-heart" href="/favorites" />
            </div>
        </div>
    </Container>
</nav>

<!-- Mobile nav bar -->
<!-- TODO: Make this it's own component -->
<div class="pointer-events-none fixed bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white to-white/0 md:hidden">
    <div class="flex w-full justify-end gap-4 px-6 py-4">
        <Button icon="fa-regular fa-cauldron" layout="icon" href="/brew" class="pointer-events-auto" />
        <Button text="Favorites" icon="fa-regular fa-heart" href="/favorites" class="pointer-events-auto" bind:this={favButton} />
    </div>
</div>
