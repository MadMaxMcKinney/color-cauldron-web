<script lang="ts">
    import '$lib/app.css';
    import Footer from '$lib/components/Footer.svelte';
    import Nav from '$lib/components/Nav.svelte';
    import { Toaster } from 'svelte-french-toast';
    import 'tippy.js/dist/tippy.css';
</script>

<svelte:head>
    <title>Color Cauldron - AI Generative Color Palettes</title>
    <meta name="description" content="AI powered, imagination driven. Brew beautiful palettes by describing how the colors will be used." />
    <meta property="og:title" content="Color Cauldron - AI Generative Color Palettes" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="AI powered, imagination driven. Brew beautiful palettes by describing how the colors will be used." />
    <meta property="og:image" content="https://colorcauldron.app/color-cauldron-openg-image.png" />
    <link rel="shortcut icon" href="/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</svelte:head>

<Nav />

<div class="flex-1">
    <slot />
</div>

<Footer />

<Toaster toastOptions={{ style: 'border: 1px solid #D4D4D8; border-radius: 13px;', position: 'bottom-center' }} />
