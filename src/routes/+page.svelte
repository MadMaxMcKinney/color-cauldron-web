<script lang="ts">
    import Container from '$lib/components/Container.svelte';
    import HeroButton from '$lib/components/HeroButton.svelte';
    import HeroPalettes from '$lib/components/hero/HeroPalettes.svelte';
    import OverviewCard from '$lib/components/OverviewCard.svelte';
</script>

<div class="animate-fade-in">
    <Container>
        <div class="from-surface-primary to-surface-primary/0 absolute top-0 right-0 left-0 h-[300px] bg-gradient-to-b md:hidden"></div>
        <HeroPalettes side="left" />
        <HeroPalettes side="right" />
        <section class="relative pt-10 sm:pt-20">
            <div class="flex flex-col items-start text-start sm:items-center sm:text-center">
                <h1 class="max-w-[630px] font-serif text-4xl leading-snug font-bold md:text-5xl">Color palettes powered by AI, driven by imagination.</h1>
                <p class="mt-6 max-w-lg text-xl font-medium text-zinc-600">Easily create mystical color palettes simply by describing colors, vibes, or use cases.</p>
                <div class="mt-10 flex flex-col justify-center gap-4 md:mt-12 md:flex-row">
                    <HeroButton text="Start brewing for free" icon="fa-solid fa-cauldron" href="/brew" />
                </div>
            </div>
            <div class="mt-[100px] grid grid-cols-1 gap-6 md:mt-[160px] md:grid-cols-2">
                <OverviewCard title="Get creative" description="Describe your favorite shades or how you’d use them, and watch the cauldron craft something beautiful!" type="imagination" icon="fa-solid fa-lightbulb" />
                <OverviewCard title="Save your palettes" description="Copy a color with a single click, or save the whole palette to your device for offline reference." type="quickly-save" icon="fa-solid fa-palette" />
                <OverviewCard title="Accessible API" description="Want to brew some palettes in your own projects? We have an easy to use endpoint that will get you started!" size="double" type="api" icon="fa-solid fa-webhook" />
            </div>
        </section>
    </Container>
</div>
