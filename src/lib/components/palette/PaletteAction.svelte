<script lang="ts">
    import { tooltip, dialog } from '$lib/actions';
    export let icon: string = 'fa-regular fa-heart';
    export let type: 'primary' | 'danger' = 'primary';
    export let tooltipParams: TooltipOptions;
    export let dialogParams: any | null = null;

    const typeClasses = {
        primary: 'text-zinc-500 hover:text-brand-green',
        danger: 'text-red-500 hover:text-red-300'
    };
</script>

{#if dialogParams}
    <button class="{typeClasses[type]} flex h-full w-10 items-center justify-center text-base transition-all active:scale-90" {...$$restProps} on:dialoganswer on:click use:tooltip={tooltipParams} use:dialog={dialogParams}>
        <i class={icon} />
    </button>
{:else}
    <button class="{typeClasses[type]} flex h-full w-10 items-center justify-center text-base transition-all active:scale-90" {...$$restProps} on:click use:tooltip={tooltipParams}>
        <i class={icon} />
    </button>
{/if}
