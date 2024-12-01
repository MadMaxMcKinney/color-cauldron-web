<script lang="ts">
    import { fade, scale } from 'svelte/transition';
    import CauldronLoader from '$lib/components/CauldronLoader.svelte';

    export let value: string;
    export let loading: boolean = false;
    export let onBrew: () => void;

    function clear() {
        value = '';
    }
</script>

<form on:submit|preventDefault={onBrew}>
    <div class="shadow-elevated relative flex h-14 w-full overflow-auto rounded-[13px] border-2 border-white bg-zinc-50 transition-colors {loading ? '' : 'hover:border-brand-green'}">
        <div class="absolute top-0 bottom-0 flex items-center justify-center bg-white transition-all duration-300 {loading ? 'w-full' : 'w-10 md:w-16'}">
            <CauldronLoader {loading} />
        </div>
        <input type="text" name="prompt" placeholder="Coffee shop for witches" class="ml-10 w-full rounded-none bg-zinc-50 pl-4 focus:outline-hidden md:ml-16" bind:value />
        {#if value.length > 0}
            <button type="button" in:scale={{ duration: 200 }} out:scale={{ duration: 200 }} class="group w-16 bg-transparent" on:click={clear}>
                <i class="fa-regular fa-x text-zinc-500 transition-opacity group-hover:opacity-60" />
            </button>
        {/if}
        <button type="submit" class="flex items-center justify-center bg-[#3FF381] px-4 font-medium whitespace-nowrap transition-all hover:bg-[#6dffa2] focus:outline-offset-4 active:bg-green-300" disabled={loading}>Brew it!</button>
    </div>
</form>
