<script lang="ts">
    import { animate, stagger, timeline, type TimelineOptions } from 'motion';
    import { onMount } from 'svelte';
    export let side: 'left' | 'right' = 'left';

    const paletteSets = [
        [
            ['#FF7518', '#8C6239', '#46281C', '#211E26', '#008080'],
            ['#5D12D2', '#B931FC', '#FF6AC2', '#FFE5E5', '#B0578D'],
            ['#451952', '#662549', '#AE445A', '#F39F5A', '#FF9B82']
        ],
        [
            ['#451952', '#662549', '#AE445A', '#F39F5A', '#FF9B82'],
            ['#5D12D2', '#B931FC', '#FF6AC2', '#FFE5E5', '#B0578D'],
            ['#FF7518', '#8C6239', '#46281C', '#211E26', '#008080']
        ]
    ];

    function createPaletteSequence(paletteIndex: number, palettes: string[][]) {
        let sequence: any[] = [];
        const speed = 0.25;
        const overlap = 0.1;
        const linger = 8;

        // Reset between palettes
        palettes.forEach((paletteColors, i) => {
            sequence.push(`section${i}`);
            sequence.push([`#Palette${paletteIndex}Color1`, { fill: ['white'] }, { duration: 1, at: `section${i}` }]);
            sequence.push([`#Palette${paletteIndex}Color2`, { fill: ['white'] }, { duration: 1, at: `section${i}` }]);
            sequence.push([`#Palette${paletteIndex}Color3`, { fill: ['white'] }, { duration: 1, at: `section${i}` }]);
            sequence.push([`#Palette${paletteIndex}Color4`, { fill: ['white'] }, { duration: 1, at: `section${i}` }]);
            sequence.push([`#Palette${paletteIndex}Color5`, { fill: ['white'] }, { duration: 1, at: `section${i}` }]);
            sequence.push([`#Palette${paletteIndex}Color1`, { fill: [paletteColors[0]] }, { duration: speed }]);
            sequence.push([`#Palette${paletteIndex}Color2`, { fill: [paletteColors[1]] }, { duration: speed, at: `-${overlap}` }]);
            sequence.push([`#Palette${paletteIndex}Color3`, { fill: [paletteColors[2]] }, { duration: speed, at: `-${overlap}` }]);
            sequence.push([`#Palette${paletteIndex}Color4`, { fill: [paletteColors[3]] }, { duration: speed, at: `-${overlap}` }]);
            sequence.push([`#Palette${paletteIndex}Color5`, { fill: [paletteColors[4]] }, { duration: speed, at: `-${overlap}` }]);
            sequence.push([`#Palette${paletteIndex}Color5`, { fill: [paletteColors[4]] }, { duration: linger }]);
        });

        return sequence;
    }

    onMount(() => {
        // Animate the palettes initially in
        animate(
            'g',
            {
                opacity: [0, 1],
                y: [10, 0]
            },
            {
                delay: stagger(0.07, {
                    start: 0.3
                })
            }
        );
        // Animate the palettes infinitely
        timeline(createPaletteSequence(1, paletteSets[0]), { repeat: Infinity, delay: 5, persist: true } as TimelineOptions);
        timeline(createPaletteSequence(2, paletteSets[0]), { repeat: Infinity, delay: 2, persist: true } as TimelineOptions);
    });
</script>

{#if side == 'left'}
    <div class="absolute top-[48px] left-0 -z-10 hidden h-[339px] w-[406px] translate-x-[-70%] sm:block">
        <svg viewBox="0 0 406 339" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_379_1008)">
                <g clip-path="url(#clip0_379_1008)">
                    <rect x="78" y="4" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(78 4)" fill="#432E54" id="Palette1Color1" />
                    <rect width="64.8" height="78" transform="translate(142.8 4)" fill="#4B4376" id="Palette1Color2" />
                    <rect width="64.8" height="78" transform="translate(207.6 4)" fill="#AE445A" id="Palette1Color3" />
                    <rect width="64.8" height="78" transform="translate(272.4 4)" fill="#E8BCB9" id="Palette1Color4" />
                    <rect width="64.8" height="78" transform="translate(337.2 4)" fill="#C5A09E" id="Palette1Color5" />
                </g>
                <rect x="77" y="3" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <g filter="url(#filter1_d_379_1008)">
                <g clip-path="url(#clip1_379_1008)">
                    <rect x="46" y="130" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(46 130)" fill="#FAB12F" />
                    <rect width="64.8" height="78" transform="translate(110.8 130)" fill="#FA812F" />
                    <rect width="64.8" height="78" transform="translate(175.6 130)" fill="#FB4132" />
                    <rect width="64.8" height="78" transform="translate(240.4 130)" fill="white" />
                    <rect width="64.8" height="78" transform="translate(305.2 130)" fill="#FEF3E2" />
                </g>
                <rect x="45" y="129" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <g filter="url(#filter2_d_379_1008)">
                <g clip-path="url(#clip2_379_1008)">
                    <rect x="6" y="256" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(6 256)" fill="#0B97B0" />
                    <rect width="64.8" height="78" transform="translate(70.8 256)" fill="#FADA7B" />
                    <rect width="64.8" height="78" transform="translate(135.6 256)" fill="#F5F0CE" />
                    <rect width="64.8" height="78" transform="translate(200.4 256)" fill="#82BFDA" />
                    <rect width="64.8" height="78" transform="translate(265.2 256)" fill="#B1F0F6" />
                </g>
                <rect x="5" y="255" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <rect x="71" width="333" height="86" fill="url(#paint0_linear_379_1008)" />
            <rect x="40" y="127" width="333" height="86" fill="url(#paint1_linear_379_1008)" />
            <rect y="253" width="333" height="86" fill="url(#paint2_linear_379_1008)" />
            <defs>
                <filter id="filter0_d_379_1008" x="74" y="0" width="332" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_379_1008" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_379_1008" result="shape" />
                </filter>
                <filter id="filter1_d_379_1008" x="42" y="126" width="332" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_379_1008" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_379_1008" result="shape" />
                </filter>
                <filter id="filter2_d_379_1008" x="2" y="252" width="332" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_379_1008" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_379_1008" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_379_1008" x1="71" y1="43" x2="404" y2="43" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEF1F5" />
                    <stop offset="0.59" stop-color="#EEF1F5" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_379_1008" x1="40" y1="170" x2="373" y2="170" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEF1F5" />
                    <stop offset="0.59" stop-color="#EEF1F5" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint2_linear_379_1008" x1="0" y1="296" x2="333" y2="296" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEF1F5" />
                    <stop offset="0.59" stop-color="#EEF1F5" stop-opacity="0" />
                </linearGradient>
                <clipPath id="clip0_379_1008">
                    <rect x="78" y="4" width="324" height="78" rx="13" fill="white" />
                </clipPath>
                <clipPath id="clip1_379_1008">
                    <rect x="46" y="130" width="324" height="78" rx="13" fill="white" />
                </clipPath>
                <clipPath id="clip2_379_1008">
                    <rect x="6" y="256" width="324" height="78" rx="13" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
{/if}
{#if side == 'right'}
    <div class="absolute top-[48px] right-0 -z-10 h-[339px] w-[406px] translate-x-[55%] -scale-x-100 sm:translate-x-[70%] sm:scale-100">
        <svg viewBox="0 0 403 339" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter1_d_379_1032)">
                <g clip-path="url(#clip1_379_1032)">
                    <rect x="75" y="256" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(75 256)" fill="#293663" />
                    <rect width="64.8" height="78" transform="translate(139.8 256)" fill="#0B97B0" />
                    <rect width="64.8" height="78" transform="translate(204.6 256)" fill="#605EA1" />
                    <rect width="64.8" height="78" transform="translate(269.4 256)" fill="#432E54" />
                    <rect width="64.8" height="78" transform="translate(334.2 256)" fill="#B3C8CF" />
                </g>
                <rect x="74" y="255" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <g filter="url(#filter0_d_379_1032)">
                <g clip-path="url(#clip0_379_1032)">
                    <rect x="37" y="131" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(37 131)" fill="#A5AEBF" id="Palette2Color1" />
                    <rect width="64.8" height="78" transform="translate(101.8 131)" fill="#C5D3E8" id="Palette2Color2" />
                    <rect width="64.8" height="78" transform="translate(166.6 131)" fill="#D1E8C5" id="Palette2Color3" />
                    <rect width="64.8" height="78" transform="translate(231.4 131)" fill="#9EDF9C" id="Palette2Color4" />
                    <rect width="64.8" height="78" transform="translate(296.2 131)" fill="#63825D" id="Palette2Color5" />
                </g>
                <rect x="36" y="130" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <g filter="url(#filter2_d_379_1032)">
                <g clip-path="url(#clip2_379_1032)">
                    <rect x="6" y="4" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(6 4)" fill="#FF7518" />
                    <rect width="64.8" height="78" transform="translate(70.8 4)" fill="#8C6239" />
                    <rect width="64.8" height="78" transform="translate(135.6 4)" fill="#46281C" />
                    <rect width="64.8" height="78" transform="translate(200.4 4)" fill="#211E26" />
                    <rect width="64.8" height="78" transform="translate(265.2 4)" fill="#008080" />
                </g>
                <rect x="5" y="3" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <rect width="333" height="86" transform="matrix(-1 0 0 1 333 0)" fill="url(#paint0_linear_379_1032)" />
            <rect width="333" height="86" transform="matrix(-1 0 0 1 364 127)" fill="url(#paint1_linear_379_1032)" />
            <rect width="333" height="86" transform="matrix(-1 0 0 1 403 253)" fill="url(#paint2_linear_379_1032)" />
            <defs>
                <filter id="filter0_d_379_1032" x="33" y="127" width="332" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_379_1032" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_379_1032" result="shape" />
                </filter>
                <filter id="filter1_d_379_1032" x="71" y="252" width="332" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_379_1032" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_379_1032" result="shape" />
                </filter>
                <filter id="filter2_d_379_1032" x="2" y="0" width="332" height="86" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                    <feOffset />
                    <feGaussianBlur stdDeviation="1" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_379_1032" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_379_1032" result="shape" />
                </filter>
                <linearGradient id="paint0_linear_379_1032" x1="0" y1="43" x2="333" y2="43" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEF1F5" />
                    <stop offset="0.59" stop-color="#EEF1F5" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint1_linear_379_1032" x1="0" y1="43" x2="333" y2="43" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEF1F5" />
                    <stop offset="0.59" stop-color="#EEF1F5" stop-opacity="0" />
                </linearGradient>
                <linearGradient id="paint2_linear_379_1032" x1="0" y1="43" x2="333" y2="43" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#EEF1F5" />
                    <stop offset="0.59" stop-color="#EEF1F5" stop-opacity="0" />
                </linearGradient>
                <clipPath id="clip0_379_1032">
                    <rect x="37" y="131" width="324" height="78" rx="13" fill="white" />
                </clipPath>
                <clipPath id="clip1_379_1032">
                    <rect x="75" y="256" width="324" height="78" rx="13" fill="white" />
                </clipPath>
                <clipPath id="clip2_379_1032">
                    <rect x="6" y="4" width="324" height="78" rx="13" fill="white" />
                </clipPath>
            </defs>
        </svg>
    </div>
{/if}
