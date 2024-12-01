<script lang="ts">
    export let size: 'small' | 'medium' | 'large' = 'medium';
    export let bg: string = 'bg-transparent';

    let sizeClass = {
        small: 'max-w-[800px]',
        medium: 'max-w-[1048px]',
        large: 'max-w-[1280px]'
    };
</script>

<section class="{bg} flex w-full items-center">
    <div class="{sizeClass[size]} mx-auto w-full px-6">
        <slot />
    </div>
</section>
