<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    export let text: string = '';
    export let icon: string = '';
    export let href: string = '';
    export let layout: 'full' | 'icon' = 'full';
    export let type: 'default' | 'danger' = 'default';

    const layoutClasses = {
        full: 'py-4 px-6',
        icon: 'w-12 py-4'
    };

    const typeClasses = {
        default: 'border border-zinc-300 bg-white text-black hover:bg-zinc-200 active:bg-zinc-300',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
    };

    const dispatch = createEventDispatcher();
</script>

{#if href}
    <a class="{layoutClasses[layout]} {typeClasses[type]} inline-flex items-center justify-center gap-2 rounded-[13px] font-medium leading-none transition-all focus-visible:outline-offset-4 {$$restProps.class}" {href}>
        {#if icon}
            <i class={icon} />
        {/if}
        {#if layout === 'full'}
            {text}
        {/if}
    </a>
{:else}
    <button class="{layoutClasses[layout]} {typeClasses[type]} inline-flex items-center justify-center gap-2 rounded-[13px] font-medium leading-none transition-all focus-visible:outline-offset-4 {$$restProps.class}" on:click={() => dispatch('click')}>
        {#if icon}
            <i class={icon} />
        {/if}
        {#if layout === 'full'}
            {text}
        {/if}
    </button>
{/if}
