<script>
    import { fade } from 'svelte/transition';
</script>

<div in:fade={{ duration: 100 }} out:fade={{ delay: 200 }} class="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-md">
    <slot />
</div>
