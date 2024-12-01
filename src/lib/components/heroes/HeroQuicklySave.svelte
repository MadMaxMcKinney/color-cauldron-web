<script lang="ts">
    import { timeline } from 'motion';
    import type { TimelineDefinition, TimelineOptions } from 'motion';
    import { onMount } from 'svelte';

    const palettes = [
        ['#FF7518', '#8C6239', '#46281C', '#211E26', '#008080'],
        ['#5D12D2', '#B931FC', '#FF6AC2', '#FFE5E5', '#B0578D'],
        ['#451952', '#662549', '#AE445A', '#F39F5A', '#FF9B82']
    ];

    function createPaletteSequence(): TimelineDefinition {
        let sequence: TimelineDefinition = [];
        const colorTransitionDuration: number = 0.4;
        palettes.forEach((palette, i) => {
            sequence.push(
                ['#Palette0', { fill: ['white', palettes[i][0]] }, { duration: colorTransitionDuration }],
                ['#Palette1', { fill: ['white', palettes[i][1]] }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#Palette2', { fill: ['white', palettes[i][2]] }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#Palette3', { fill: ['white', palettes[i][3]] }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#Palette4', { fill: ['white', palettes[i][4]] }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#PaletteCopy', { opacity: [0, 1, 0], scale: [1, 1.3, 1] }, { at: '+0.5', endDelay: 5, duration: 3 }],
                ['#Palette0', { fill: 'white' }, { duration: colorTransitionDuration }],
                ['#Palette1', { fill: 'white' }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#Palette2', { fill: 'white' }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#Palette3', { fill: 'white' }, { duration: colorTransitionDuration, at: '-0.1' }],
                ['#Palette4', { fill: 'white' }, { duration: colorTransitionDuration, at: '-0.1' }]
            );
        });
        return sequence;
    }

    onMount(() => {
        timeline(createPaletteSequence(), { loop: Infinity, repeat: Infinity, endDelay: 5 } as TimelineOptions);
    });
</script>

<svg width="100%" viewBox="0 0 520 224" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="183" y1="20" x2="183" y2="204" stroke="#DFDFDF" />
    <line x1="346" y1="20" x2="346" y2="204" stroke="#DFDFDF" />
    <line x1="260.5" y1="20" x2="260.5" y2="204" stroke="#DFDFDF" />
    <line x1="58.5" y1="72.5" x2="462.5" y2="72.5" stroke="#DFDFDF" />
    <line x1="58.5" y1="40.5" x2="462.5" y2="40.5" stroke="#F4F4F5" />
    <line x1="58.5" y1="111.5" x2="462.5" y2="111.5" stroke="#F4F4F5" />
    <line x1="58.5" y1="182.5" x2="462.5" y2="182.5" stroke="#F4F4F5" />
    <line x1="58.5" y1="151.5" x2="462.5" y2="151.5" stroke="#DFDFDF" />
    <g clip-path="url(#clip0_90_955)">
        <rect x="98" y="73" width="324" height="78" rx="13" fill="white" />
        <rect width="64.8" height="78" transform="translate(98 73)" fill="#57375D" id="Palette0" />
        <rect width="64.8" height="78" transform="translate(162.8 73)" fill="#FF3FA4" id="Palette1" />
        <rect width="64.8" height="78" transform="translate(227.6 73)" fill="#FF9B82" id="Palette2" />
        <g id="PaletteCopy" style="opacity: 0; transform-origin: center;">
            <rect x="240" y="92" width="40" height="40" rx="20" fill="white" />
            <g clip-path="url(#clip1_90_955)">
                <path
                    d="M263.5 106H264.5H266V107.5V118.5V120H264.5H255.5H254V118.5V107.5V106H255.5H256.5H257.55C257.781 104.859 258.791 104 260 104C261.209 104 262.219 104.859 262.45 106H263.5ZM255.5 107.5V118.5H264.5V107.5H263.5V109H260H256.5V107.5H255.5ZM260 107.25C260.199 107.25 260.39 107.171 260.53 107.03C260.671 106.89 260.75 106.699 260.75 106.5C260.75 106.301 260.671 106.11 260.53 105.97C260.39 105.829 260.199 105.75 260 105.75C259.801 105.75 259.61 105.829 259.47 105.97C259.329 106.11 259.25 106.301 259.25 106.5C259.25 106.699 259.329 106.89 259.47 107.03C259.61 107.171 259.801 107.25 260 107.25Z"
                    fill="black"
                />
            </g>
        </g>
        <rect width="64.8" height="78" transform="translate(292.4 73)" fill="#FFC8C8" id="Palette3" />
        <rect width="64.8" height="78" transform="translate(357.2 73)" fill="#FFBB5C" id="Palette4" />
    </g>
    <rect x="97.5" y="72.5" width="325" height="79" rx="13.5" stroke="#DFDFDF" />
    <defs>
        <clipPath id="clip0_90_955">
            <rect x="98" y="73" width="324" height="78" rx="13" fill="white" />
        </clipPath>
        <clipPath id="clip1_90_955">
            <rect width="12" height="16" fill="white" transform="translate(254 104)" />
        </clipPath>
    </defs>
</svg>
