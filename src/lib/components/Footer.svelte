<script>
    import Container from './Container.svelte';
    import HellishCreativeLogo from '$lib/assets/hellish-creative-logo-black.svg';
</script>

<footer class="animate-fade-in-slower mt-16 py-8">
    <Container>
        <div class="flex items-center justify-between gap-8">
            <a href="https://hellishcreative.com" class="flex items-center gap-2 text-sm font-bold text-black opacity-100 transition-all hover:opacity-60 sm:text-base"
                ><img class="h-[32px]" src={HellishCreativeLogo} alt="Hellish Creative Logo" /><i class="fa-regular fa-arrow-up-right-from-square text-sm text-zinc-500" /></a
            >
        </div>
    </Container>
</footer>
