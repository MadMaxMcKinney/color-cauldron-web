<script lang="ts">
    import PaletteCard from './PaletteCard.svelte';

    const examplePalettes: Palette[] = [
        {
            id: '1',
            name: 'Bubble tea unicorn',
            colors: [
                { hex: '#FFC3D4', name: 'Cotton Candy Pink' },
                { hex: '#E1BEE7', name: 'Lavender Dream' },
                { hex: '#A7EEB1', name: 'Mint Whirl' },
                { hex: '#F8BBD0', name: 'Bubblegum Bliss' },
                { hex: '#FFEC40', name: 'Unicorn Bliss' }
            ],
            createdAt: new Date()
        },
        {
            id: '2',
            name: 'Example Palette 2',
            colors: [
                { hex: '#FF00FF', name: 'Magenta' },
                { hex: '#FFFF00', name: 'Yellow' },
                { hex: '#FF00FF', name: 'Magenta' },
                { hex: '#FFFF00', name: 'Yellow' },
                { hex: '#00FFFF', name: 'Cyan' }
            ],
            createdAt: new Date()
        },
        {
            id: '3',
            name: 'Example Palette 3',
            colors: [
                { hex: '#FF0000', name: 'Red' },
                { hex: '#00FF00', name: 'Green' },
                { hex: '#FF00FF', name: 'Magenta' },
                { hex: '#FFFF00', name: 'Yellow' },
                { hex: '#0000FF', name: 'Blue' }
            ],
            createdAt: new Date()
        }
    ];
</script>

<section class="bg-bg-secondary relative mt-12 rounded-2xl border border-dashed border-zinc-400 p-6">
    <span class="bg-brand-green shadow-elevated absolute -top-[20px] -left-[20px] grid aspect-square w-[40px] place-items-center rounded-full border-2 border-white">
        <i class="fa-solid fa-lightbulb text-[20px] text-white" />
    </span>
    <div class="flex flex-col gap-4 md:flex-row">
        {#each examplePalettes as palette}
            <PaletteCard showToolbar={false} {palette} size="small" />
        {/each}
    </div>
</section>
