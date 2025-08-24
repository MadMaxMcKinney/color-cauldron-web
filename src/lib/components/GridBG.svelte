<script lang="ts">
    import { fade } from 'svelte/transition';

    let className: string = '';
    export { className as class };
</script>

<div out:fade in:fade class="mask absolute top-0 right-0 left-0 -z-30 mx-auto mask-radial-to-70% mask-radial-at-center mask-type-alpha mask-cover object-cover opacity-20 {className}" style={'background: url(/grid-bg.svg)'}></div>
