<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';
    import OverviewCard from '$lib/components/OverviewCard.svelte';
</script>

<div class="animate-fade-in">
    <Container>
        <section class="relative pt-10 sm:pt-20">
            <div class="flex flex-col items-center text-center">
                <h1 class="max-w-[630px] font-serif text-4xl leading-snug font-bold md:text-5xl">Color palettes powered by AI, driven by imagination.</h1>
                <p class="mt-6 max-w-lg text-xl font-medium text-zinc-600">Easily create mystical color palettes simply by describing how the colors will be used.</p>
                <div class="mt-10 flex flex-col justify-center gap-4 md:mt-12 md:flex-row">
                    <HeroButton text="Start brewing for free" icon="fa-solid fa-cauldron" href="/brew" />
                    <!-- <a class="inline-flex h-14 cursor-default items-center justify-center gap-3 rounded-[13px] border border-zinc-400 bg-white px-6 text-xl font-medium leading-none transition-all focus-visible:outline-offset-4" href="#">App Store - coming soon</a> -->
                </div>
            </div>
            <div class="mt-[160px] grid grid-cols-1 gap-6 sm:mt-[100px] md:grid-cols-2">
                <OverviewCard title="Creatively prompt" description="Describe the colors, how you’d use them, or anything that sparks joy and watch the cauldron work!" type="imagination" icon="fa-solid fa-lightbulb" />
                <OverviewCard title="Save your palettes" description="Copy a color with a single click, or save the whole palette to your device for offline reference." type="quickly-save" icon="fa-solid fa-palette" />
                <OverviewCard title="Accessible API" description="Want to brew some palettes in your own projects? We have an easy to use endpoint that will get you started!" size="double" type="api" icon="fa-solid fa-webhook" />
            </div>
        </section>
    </Container>
</div>
