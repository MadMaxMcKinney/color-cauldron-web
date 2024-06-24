<script lang="ts">
    import { tooltip, dialog } from '$lib/actions';
    export let icon: string = 'fa-regular fa-heart';
    export let tooltipParams: any;
    export let dialogParams: any | null = null;
</script>

{#if dialogParams}
    <button class="flex h-full w-10 items-center justify-center text-base text-brand-green transition-all hover:text-green-200 active:scale-90" {...$$restProps} on:click use:tooltip={tooltipParams} use:dialog={dialogParams}>
        <i class={icon} />
    </button>
{:else}
    <button class="flex h-full w-10 items-center justify-center text-base text-brand-green transition-all hover:text-green-200 active:scale-90" {...$$restProps} on:click use:tooltip={tooltipParams}>
        <i class={icon} />
    </button>
{/if}
