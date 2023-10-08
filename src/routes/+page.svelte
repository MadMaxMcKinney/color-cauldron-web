<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';

    import heroCauldron from '$lib/assets/videos/cauldron-hero-v3.mp4';
</script>

<Container>
    <section class="pt-10 sm:pt-20 relative">
        <h1 class="text-4xl md:text-5xl max-w-lg leading-snug font-bold font-serif">Brew beautiful palettes with the magic of AI.</h1>
        <p class="mt-10 text-xl font-medium max-w-lg">Easily create mystical color palettes by describing how you would use the colors, then sit back and let the magic happen.</p>
        <div class="flex flex-col gap-4 items-start">
            <HeroButton text="Start brewing" icon="fa-sharp fa-regular fa-wand-sparkles" class="mt-16" url="/brew" />
            <span class="ml-2 text-zinc-400 font-medium"><i class="fa-brands fa-github" /> 100% free and <a class="underline transition-colors hover:text-zinc-300" href="#">open source</a></span>
        </div>
        <video autoplay loop muted playsinline class="fixed -bottom-[400px] -left-40 md:top-[450px] -z-10 max-w-[1000px] sm:left-[60%] sm:-translate-x-[50%]">
            <source src={heroCauldron} type="video/mp4" />
        </video>
    </section>
</Container>
