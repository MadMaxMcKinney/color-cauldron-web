<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import logo from '$lib/assets/color-cauldron-logo-pot.svg';
    import Button from '$lib/components/Button.svelte';
    import { favoritePalettes } from '$lib/stores';

    let favButtonMobile: Button;
    let favButton: Button;

    let previousPaletteCount = $favoritePalettes.palettes.length || 0;

    $: {
        if (previousPaletteCount < $favoritePalettes.palettes.length) {
            favButton.notify();
            favButtonMobile.notify();
        }
        previousPaletteCount = $favoritePalettes.palettes.length;
    }
</script>

<!-- Primary top nav -->
<nav class="animate-fade-in bg-surface-primary shadow-elevated z-30 flex h-16 items-center border-b-2 border-white md:h-[80px]">
    <Container>
        <div class="flex justify-between">
            <a class="flex justify-between transition-all hover:opacity-70" href="/">
                <span class="flex items-center gap-2 font-serif text-lg font-bold md:text-xl"><img src={logo} alt="Black cauldron logo" class="h-auto w-[19px]" /> Color Cauldron</span>
            </a>
            <div class="hidden items-center gap-4 md:flex">
                <Button icon="fa-solid fa-cauldron" layout="icon" href="/brew" />
                <Button text="Favorites" icon="fa-solid fa-heart" href="/favorites" bind:this={favButton} />
            </div>
            <div class="flex md:hidden"></div>
        </div>
    </Container>
</nav>

<!-- Mobile footer nav bar -->
<!-- TODO: Make this it's own component -->
<div class="pointer-events-none fixed right-0 bottom-0 left-0 z-20 bg-linear-to-t from-white to-white/0 md:hidden">
    <div class="flex w-full justify-end gap-4 px-6 py-4">
        <Button icon="fa-regular fa-heart" href="/favorites" class="pointer-events-auto" layout="icon" bind:this={favButtonMobile} />
        <Button text="Brew" icon="fa-regular fa-cauldron" href="/brew" class="pointer-events-auto" />
    </div>
</div>
