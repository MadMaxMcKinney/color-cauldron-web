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
            name: 'Neo-Tokyo Nights',
            colors: [
                { hex: '#0D0D3F', name: 'Electric Midnight' },
                { hex: '#F72585', name: 'Neon Magenta' },
                { hex: '#4361EE', name: 'Cyber Blue' },
                { hex: '#3A0CA3', name: 'Ultraviolet Glow' },
                { hex: '#FFD700', name: 'Holo Gold' }
            ],
            createdAt: new Date()
        },
        {
            id: '3',
            name: 'Forest Serenity',
            colors: [
                { hex: '#2E7D32', name: 'Evergreen' },
                { hex: '#6DA34D', name: 'Fern Glow' },
                { hex: '#A2D9CE', name: 'Tranquil Stream' },
                { hex: '#FFCC80', name: 'Sunlit Meadow' },
                { hex: '#FFE4B5', name: 'Morning Mist' }
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
