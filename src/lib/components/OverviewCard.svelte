<script lang="ts">
    import HeroQuicklySave from '$lib/components/heroes/HeroQuicklySave.svelte';
    import HeroApi from '$lib/components/heroes/HeroApi.svelte';
    import HeroImaginationBig from '$lib/components/heroes/HeroImaginationBig.svelte';

    export let title: string;
    export let description: string;
    export let type: 'quickly-save' | 'api' | 'imagination' = 'quickly-save';
    export let size: 'single' | 'double' = 'single';
    export let icon: string | undefined = undefined;

    let sizeClasses = {
        single: 'col-span-1',
        double: 'col-span-1 md:col-span-2'
    };

    let descriptionTextClasses = {
        single: '',
        double: 'max-w-[500px]'
    };
</script>

<div class="shadow-elevated bg-surface-primary flex flex-col gap-4 rounded-[13px] border-2 border-white px-8 py-6 backdrop-blur-2xl lg:bg-[#FAFAFA]/60 {sizeClasses[size]}">
    {#if icon}
        <span class="bg-brand-green/15 text-brand-green grid aspect-square w-[40px] place-items-center rounded-xl text-xl">
            <i class={icon} />
        </span>
    {/if}
    <h3 class="font-serif text-2xl font-bold text-black">{title}</h3>
    <p class="text-zinc-500 {descriptionTextClasses[size]}">{description}</p>
    <div class="flex flex-1 items-center justify-center">
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
