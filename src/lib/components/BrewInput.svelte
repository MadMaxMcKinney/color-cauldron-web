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
    <div class="relative flex h-14 w-full rounded-[13px] border border-zinc-200 bg-zinc-100 transition-colors {loading ? '' : 'hover:border-black'}">
        <div class="absolute bottom-0 top-0 flex items-center justify-center rounded-l-[13px] bg-white transition-all duration-300 {loading ? 'w-full rounded-[13px]' : 'w-10 md:w-16'}">
            <CauldronLoader {loading} />
        </div>
        <input type="text" name="prompt" placeholder="Coffee shop for witches" class="ml-10 w-full rounded-none bg-zinc-100 pl-4 focus:outline-none md:ml-16" bind:value />
        {#if value.length > 0}
            <button type="button" in:scale={{ duration: 200 }} out:scale={{ duration: 200 }} class="group w-16 bg-transparent" on:click={clear}>
                <i class="fa-regular fa-x text-zinc-500 transition-opacity group-hover:opacity-60" />
            </button>
        {/if}
        <button type="submit" class="flex items-center justify-center whitespace-nowrap rounded-r-[13px] bg-[#3FF381] px-4 font-medium transition-all hover:bg-[#6dffa2] focus:outline-offset-4 active:bg-green-300" disabled={loading}>Brew it!</button>
    </div>
</form>
