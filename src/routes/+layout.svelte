<script lang="ts">
    import '$lib/app.css';
    import Footer from '$lib/components/Footer.svelte';
    import Nav from '$lib/components/Nav.svelte';
    import { Toaster } from 'svelte-french-toast';
    import 'tippy.js/dist/tippy.css';
    import { injectAnalytics } from '@vercel/analytics/sveltekit';
    import { onMount } from 'svelte';

    onMount(() => {
        injectAnalytics();
    });
</script>

<svelte:head>
    <title>Color Cauldron - AI Generative Color Palettes</title>
    <meta name="description" content="Brew beautiful palettes by describing colors, vibes, or use cases. AI powered, imagination driven." />
    <meta property="og:title" content="Color Cauldron - AI Generative Color Palettes" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Brew beautiful palettes by describing colors, vibes, or use cases. AI powered, imagination driven." />
    <meta property="og:image" content="https://colorcauldron.app/color-cauldron-openg-image.png" />
    <link rel="shortcut icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<Nav />

<div class="mb-16 flex flex-1 flex-col overflow-x-clip">
    <slot />
</div>

<Footer />

<Toaster toastOptions={{ style: 'border: 1px solid #D4D4D8; border-radius: 13px;', position: 'bottom-center' }} />
