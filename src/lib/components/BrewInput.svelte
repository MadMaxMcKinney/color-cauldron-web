<script lang="ts">
    import CauldronLoader from '$lib/components/CauldronLoader.svelte';

    export let value: string;
    export let loading: boolean = false;
    export let onBrew: () => void;
</script>

<form on:submit|preventDefault={onBrew}>
    <div class="relative flex rounded-[13px] border border-zinc-200 w-full h-14 transition-colors {loading ? '' : 'hover:border-black'}">
        <div class="flex justify-center items-center top-0 bottom-0 absolute bg-white rounded-l-[13px] transition-all duration-300 {loading ? 'w-full rounded-[13px]' : 'w-10 md:w-16'}">
            <CauldronLoader {loading} />
        </div>
        <input type="text" name="prompt" placeholder="Coffee shop for witches" class="w-full bg-zinc-100 ml-10 md:ml-16 px-4 rounded-none focus:outline-none" bind:value />
        <button class="bg-[#3FF381] flex items-center justify-center px-4 whitespace-nowrap font-medium transition-all rounded-r-[13px] hover:bg-[#6dffa2] focus:outline-offset-4 active:bg-green-300" disabled={loading}> Brew it! </button>
    </div>
</form>
