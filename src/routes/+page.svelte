<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';

    import heroCauldron from '$lib/assets/videos/cauldron-hero-v3.mp4';
    import OverviewCard from '$lib/components/OverviewCard.svelte';
</script>

<div class="animate-fade-in">
    <Container>
        <section class="pt-10 sm:pt-20 relative">
            <h1 class="text-4xl md:text-5xl lg:text-6xl leading-snug font-bold font-serif">Brew beautiful palettes<br/> with the magic of AI.</h1>
            <p class="mt-10 text-xl font-medium max-w-lg">Easily create mystical color palettes by describing how you would use the colors, then sit back and let the magic happen.</p>
            <div class="flex flex-col gap-4 items-start">
                <HeroButton text="Start brewing" icon="fa-sharp fa-regular fa-wand-sparkles" class="mt-16" url="/brew" />
                <span class="ml-2 text-zinc-400 font-medium"><i class="fa-brands fa-github" /> 100% free and <a class="underline transition-colors hover:text-zinc-300" href="#">open source</a></span>
            </div>
            <video autoplay loop muted playsinline class="absolute sm:-right-[150px] sm:top-[300px] md:top-[250px] lg:top-[200px] w-[780px] -z-10">
                <source src={heroCauldron} type="video/mp4" />
            </video>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[100px]">
                <OverviewCard title="The only limit is your imagination" description="Powered by the GPT-3.5 ML model trained with additional context, brewing a color palette has never been easier." type="imagination"/>
                <OverviewCard title="Quickly save your palettes" description="Copy a color with a single click, or save the whole palette to your device for offline reference." type="quickly-save" />
                <OverviewCard title="Accessible API for everyone" description="Copy a color with a single click, or save the whole palette to your device for offline reference." size="double" type="api"/>
            </div>
        </section>
    </Container>
</div>
