<script>
    import Container from './Container.svelte';
    import HellishCreativeLogo from '$lib/assets/hellish-creative-logo-black.svg';
</script>

<footer class="py-8 mt-16 bg-white animate-fade-in-slower">
    <Container>
        <div class="flex justify-between items-center gap-8">
            <a href="https://hellishcreative.com" class="text-sm sm:text-base text-black font-bold flex items-center gap-2 opacity-100 transition-all hover:opacity-60"
                ><img class="h-[32px]" src={HellishCreativeLogo} alt="Hellish Creative Logo" /><i class="fa-sharp fa-arrow-up-right-from-square text-sm text-zinc-500" /></a
            >
        </div>
    </Container>
</footer>
