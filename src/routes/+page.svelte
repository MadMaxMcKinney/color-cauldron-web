<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';

    import heroCauldron from '$lib/assets/videos/cauldron-hero-v3.mp4';
</script>

<Container>
    <section class="pt-10 sm:pt-20 relative">
        <h1 class="text-5xl max-w-lg leading-snug font-bold font-serif">Brew beautiful palettes with the magic of AI.</h1>
        <p class="mt-10 text-xl font-medium max-w-lg">Easily create mystical color palettes by describing how you would use the colors, then sit back and let the magic happen.</p>
        <div class="flex flex-col gap-4 items-start">
            <HeroButton text="Start brewing" icon="fa-sharp fa-regular fa-wand-sparkles" class="mt-16" url="/brew" />
            <span class="ml-2 text-zinc-400 font-medium"><i class="fa-brands fa-github" /> 100% free and <a class="underline transition-colors hover:text-zinc-300" href="#">open source</a></span>
        </div>
        <video autoplay loop muted playsinline class="absolute top-[300px] -right-[200px] -z-10 max-w-[1000px]">
            <source src={heroCauldron} type="video/mp4" />
        </video>
    </section>
</Container>
