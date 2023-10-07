<script lang="ts">
    import '$lib/app.css';
    import Footer from '$lib/components/Footer.svelte';
    import TopNav from '$lib/components/TopNav.svelte';
    import { Toaster } from 'svelte-french-toast';
</script>

<svelte:head>
    <title>Color Chef - AI Generative Color Palettes</title>
    <meta name="description" content="Generate a color palette by describing how it will be used. The Chef will do the rest, sit back and enjoy!" />
    <meta property="og:title" content="Color Chef - AI Generative Color Palettes" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Generate a color palette by describing how it will be used. The Chef will do the rest, sit back and enjoy!" />
    <meta property="og:image" content="https://colorchef.app/color-chef-openg-image.png" />
    <link rel="shortcut icon" href="/favicon.png" />
</svelte:head>

<TopNav />

<div class="flex-1">
    <slot />
</div>

<Footer />

<Toaster toastOptions={{ style: 'border: 1px solid #D4D4D8; border-radius: 13px;' }} />
