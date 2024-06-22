<script lang="ts">
    import HeroQuicklySave from '$lib/components/heroes/HeroQuicklySave.svelte';
    import HeroApi from '$lib/components/heroes/HeroApi.svelte';
    import HeroImaginationBig from '$lib/components/heroes/HeroImaginationBig.svelte';

    export let title: string;
    export let description: string;

    export let type: 'quickly-save' | 'api' | 'imagination' = 'quickly-save';

    export let size: 'single' | 'double' = 'single';

    let sizeClasses = {
        single: 'col-span-1',
        double: 'col-span-1 md:col-span-2'
    };

    let descriptionTextClasses = {
        single: '',
        double: 'max-w-[500px]'
    };
</script>

<div class="flex flex-col gap-4 bg-[#FAFAFA]/75 lg:bg-[#FAFAFA]/60 border-2 border-white shadow-card backdrop-blur-2xl py-6 px-8 rounded-[13px] {sizeClasses[size]}">
    <h3 class="text-2xl font-serif font-bold text-black">{title}</h3>
    <p class="text-zinc-500 {descriptionTextClasses[size]}">{description}</p>
    <div class="flex-1 flex items-center justify-center">
        {#if type == 'quickly-save'}
            <HeroQuicklySave />
        {/if}
        {#if type == 'imagination'}
            <HeroImaginationBig />
        {/if}
        {#if type == 'api'}
            <HeroApi />
        {/if}
    </div>
</div>
