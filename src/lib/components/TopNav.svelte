<script>
    import Container from '$lib/components/Container.svelte';
    import logo from '$lib/assets/color-cauldron-logo-pot.svg';
</script>

<div class="py-6 border-b border-zinc-200 bg-white">
    <Container>
        <a class="flex justify-between transition-all hover:opacity-70" href="/">
            <span class="flex items-center gap-2 font-serif text-xl font-bold"><img src={logo} alt="Black cauldron logo" class="w-[19px] h-auto" /> Color Cauldron</span>
        </a>
    </Container>
</div>
