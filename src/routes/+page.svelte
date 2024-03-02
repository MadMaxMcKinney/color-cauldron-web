<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';
    import OverviewCard from '$lib/components/OverviewCard.svelte';
</script>

<div class="animate-fade-in">
    <Container>
        <section class="pt-10 sm:pt-20 relative">
            <h1 class="text-4xl md:text-5xl lg:text-6xl leading-snug font-bold font-serif">AI powered,<br /> imagination driven.</h1>
            <p class="mt-10 text-xl font-medium max-w-lg">Easily create mystical color palettes by describing how the colors will be used, then sit back and let the magic happen.</p>
            <div class="flex flex-col gap-4 items-start mt-16 md:items-center md:flex-row">
                <HeroButton text="Start brewing" icon="fa-sharp fa-regular fa-wand-sparkles" url="/brew" />
                <a class="bg-white border border-zinc-400 rounded-[13px] py-4 px-6 inline-flex justify-center items-center gap-3 font-medium text-xl leading-none cursor-default transition-all focus-visible:outline-offset-4" href="#">App Store - coming soon</a>
            </div>
            <video autoplay loop muted playsinline class="absolute -left-[70px] mt-6 sm:left-auto sm:-right-[150px] sm:top-[300px] md:top-[250px] lg:top-[200px] w-[780px] -z-10">
                <source src="https://yhdbff7qdnrdylls.public.blob.vercel-storage.com/cauldron-hero-v3-2JZx5SmfomoctzHXijfBtpsxAljBzC.mp4" type="video/mp4" />
            </video>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-[160px] sm:mt-[100px]">
                <OverviewCard title="The only limit is your imagination" description="Powered by GPT-3.5 ML model trained with additional context, brewing a color palette has never been easier." type="imagination" />
                <OverviewCard title="Quickly save your palettes" description="Copy a color with a single click, or save the whole palette to your device for offline reference." type="quickly-save" />
                <OverviewCard title="Accessible API" description="Want to brew some palettes in your own projects? We have an easy to use endpoint that will get you started!" size="double" type="api" />
            </div>
        </section>
    </Container>
</div>
