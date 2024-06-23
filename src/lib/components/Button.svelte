<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let text: string = '';
    export let icon: string = '';
    export let href: string = '';
    export let type: 'full' | 'icon' = 'full';

    const typeClasses = {
        full: 'py-4 px-6',
        icon: 'w-12 py-4'
    };

    const dispatch = createEventDispatcher();
</script>

{#if href}
    <a class="{typeClasses[type]} bg-white text-black border border-zinc-300 rounded-[13px] inline-flex justify-center items-center gap-2 font-medium leading-none transition-all hover:bg-zinc-200 focus-visible:outline-offset-4 active:bg-zinc-300 {$$restProps.class}" {href}>
        {#if icon}
            <i class={icon} />
        {/if}
        {#if type === 'full'}
            {text}
        {/if}
    </a>
{:else}
    <button
        class="{typeClasses[type]} bg-white text-black border border-zinc-300 rounded-[13px] inline-flex justify-center items-center gap-2 font-medium leading-none transition-all hover:bg-zinc-200 focus-visible:outline-offset-4 active:bg-zinc-300 {$$restProps.class}"
        on:click={() => dispatch('click')}
    >
        {#if icon}
            <i class={icon} />
        {/if}
        {#if type === 'full'}
            {text}
        {/if}
    </button>
{/if}
