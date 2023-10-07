<script lang="ts">
    import CauldronLoader from '$lib/components/CauldronLoader.svelte';

    export let value: string;
    export let loading: boolean = false;
</script>

<div class="relative flex rounded-[13px] border border-zinc-200 w-full h-14 transition-colors hover:border-black">
    <div class="flex justify-center items-center top-0 bottom-0 absolute bg-white rounded-l-[13px] transition-all duration-300 {loading ? 'w-full rounded-[13px]' : 'w-16'}">
        <CauldronLoader {loading} />
    </div>
    <input type="text" name="prompt" placeholder="Coffee shop for witches" class="w-full bg-zinc-100 ml-16 px-4 focus:outline-none" bind:value />
    <button class="bg-[#3FF381] flex items-center justify-center px-4 min-w-[100px] font-medium transition-all rounded-r-[13px] hover:bg-[#6dffa2] focus:outline-offset-4"> Brew it! </button>
</div>
