<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';
</script>

<Container>
    <section class="pt-20">
        <h1 class="text-5xl max-w-lg leading-snug font-bold font-serif">Brew beautiful palettes with the magic of AI.</h1>
        <p class="mt-10 text-xl font-medium max-w-lg">Easily create mystical color palettes by describing how you would use the colors, then sit back and let the magic happen.</p>
        <div class="flex flex-col gap-4 items-start">
            <HeroButton text="Start brewing" icon="fa-sharp fa-regular fa-wand-sparkles" class="mt-10" url="/brew" />
            <span class="ml-2 text-zinc-400 font-medium"><i class="fa-brands fa-github" /> 100% free and <a class="underline transition-colors hover:text-zinc-300" href="#">open source</a></span>
        </div>
    </section>
</Container>
