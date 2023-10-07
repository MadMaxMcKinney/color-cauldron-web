<script lang="ts">
    import toast from 'svelte-french-toast';

    export let palette: Palette;

    /**
     * Copy the color to the clipboard
     * @param color The color to copy
     */
    function copyColor(color: PaletteColor) {
        navigator.clipboard.writeText(color.hex);
        toast.success(`Copied to clipboard ${color.hex}`);
    }
</script>

<div class="flex flex-col rounded-[13px] border border-zinc-200 overflow-hidden h-[160px]">
    <div class="flex flex-row overflow-hidden w-full h-full">
        {#each palette.colors as color}
            <button class="h-full w-full flex justify-center items-center group transition-all hover:shadow-2xl hover:z-10 hover:scale-110 active:scale-100" style="background-color: {color.hex};" on:click={() => copyColor(color)}>
                <span class="flex justify-center items-center text-xl bg-white rounded-full w-10 h-10 transition-all opacity-0 group-hover:opacity-100"><i class="fa-sharp fa-regular fa-clipboard" /></span>
            </button>
        {/each}
    </div>
    <div class="flex px-4 py-3">
        <p class="font-medium text-lg leading-tight text-zinc-500">{palette.name}</p>
    </div>
</div>
