<script>
    import Container from '$lib/components/Container.svelte';
    import logo from '$lib/assets/color-cauldron-logo-pot.svg';
    import Button from '$lib/components/Button.svelte';
</script>

<div class="h-[80px] flex items-center border-b border-zinc-200 bg-white animate-fade-in">
    <Container>
        <div class="flex justify-between">
            <a class="flex justify-between transition-all hover:opacity-70" href="/">
                <span class="flex items-center gap-2 font-serif text-xl font-bold"><img src={logo} alt="Black cauldron logo" class="w-[19px] h-auto" /> Color Cauldron</span>
            </a>
            <div class="flex items-center gap-4">
                <Button icon="fa-regular fa-cauldron" type="icon" href="/brew" />
                <Button text="Favorites" icon="fa-regular fa-heart" href="/favorites" />
            </div>
        </div>
    </Container>
</div>
