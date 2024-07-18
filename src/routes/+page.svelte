<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';
    import OverviewCard from '$lib/components/OverviewCard.svelte';
</script>

<div class="animate-fade-in">
    <Container>
        <section class="relative pt-10 sm:pt-20">
            <h1 class="font-serif text-4xl font-bold leading-snug md:text-5xl lg:text-6xl">AI powered,<br /> imagination driven.</h1>
            <p class="mt-6 max-w-lg text-xl font-medium md:mt-10">Easily create mystical color palettes by describing how the colors will be used, then sit back and let the magic happen.</p>
            <div class="mt-10 flex flex-col items-start gap-4 md:mt-16 md:flex-row md:items-center">
                <HeroButton text="Start brewing" icon="fa-regular fa-cauldron" href="/brew" />
                <!-- <a class="inline-flex h-14 cursor-default items-center justify-center gap-3 rounded-[13px] border border-zinc-400 bg-white px-6 text-xl font-medium leading-none transition-all focus-visible:outline-offset-4" href="#">App Store - coming soon</a> -->
            </div>
            <video autoplay loop muted playsinline class="absolute -left-[70px] -z-10 mt-6 w-[780px] sm:-right-[150px] sm:left-auto sm:top-[300px] md:top-[250px] lg:top-[200px]">
                <source src="https://yhdbff7qdnrdylls.public.blob.vercel-storage.com/cauldron-hero-v3-2JZx5SmfomoctzHXijfBtpsxAljBzC.mp4" type="video/mp4" />
            </video>
            <div class="mt-[160px] grid grid-cols-1 gap-6 sm:mt-[100px] md:grid-cols-2">
                <OverviewCard title="The only limit is your imagination" description="Powered by an LLM trained with additional context, brewing a color palette has never been easier." type="imagination" />
                <OverviewCard title="Quickly save your palettes" description="Copy a color with a single click, or save the whole palette to your device for offline reference." type="quickly-save" />
                <OverviewCard title="Accessible API" description="Want to brew some palettes in your own projects? We have an easy to use endpoint that will get you started!" size="double" type="api" />
            </div>
        </section>
    </Container>
</div>
