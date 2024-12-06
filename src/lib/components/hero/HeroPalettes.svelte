<script lang="ts">
    import { animate, stagger, type DynamicAnimationOptions } from 'motion';
    import { onMount } from 'svelte';
    export let side: 'left' | 'right' = 'left';

    const paletteSets = [
        // 1. Sunset Glow
        [
            ['#FF7518', '#FFB347', '#FFCC33', '#FFDD44', '#FFEE55'], // Bright oranges and yellows
            ['#FF4500', '#FF6347', '#FF7F50', '#FFD700', '#FFEC8B'], // Warm orange to gold
            ['#8B4513', '#CD853F', '#D2691E', '#FFA07A', '#FFDAB9'], // Earthy tones
            ['#FF6A6A', '#FF4500', '#FF7256', '#FF8247', '#FFA07A'], // Coral and salmon
            ['#FFA500', '#FF8C00', '#FF6347', '#FF4500', '#DC143C'], // Vivid orange to red
            ['#FFD700', '#FFA500', '#FF4500', '#FF0000', '#8B0000'], // Gradient from gold to deep red
            ['#FF7F50', '#FFA07A', '#FFD700', '#FFE4B5', '#FFF5EE'] // Soft peach and yellows
        ],

        // 2. Ocean Breeze
        [
            ['#1E90FF', '#00BFFF', '#5F9EA0', '#4682B4', '#B0C4DE'], // Soft blues
            ['#008080', '#20B2AA', '#48D1CC', '#AFEEEE', '#E0FFFF'], // Aquatic teals
            ['#000080', '#191970', '#4682B4', '#5F9EA0', '#87CEEB'], // Deep sea blues
            ['#1CA3EC', '#3E96CD', '#6495ED', '#ADD8E6', '#E6F8FF'], // Sky and baby blues
            ['#00CED1', '#40E0D0', '#5F9EA0', '#4682B4', '#87CEFA'], // Bright turquoise
            ['#002147', '#034694', '#007FFF', '#00A9E0', '#70C6FF'] // Crisp navy to light blue
        ],

        // 3. Forest Mystique
        [
            ['#013220', '#025939', '#017A48', '#03A678', '#A3C99A'], // Deep greens
            ['#2E8B57', '#3CB371', '#66CDAA', '#98FB98', '#E0FFE0'], // Lush and soft greens
            ['#556B2F', '#6B8E23', '#8FBC8F', '#ADFF2F', '#F5FFFA'], // Olive tones
            ['#228B22', '#32CD32', '#66FF00', '#76EE00', '#7FFF00'], // Vibrant leafy greens
            ['#006400', '#228B22', '#2E8B57', '#3CB371', '#66CDAA'], // Dense forest greens
            ['#355E3B', '#5A8A67', '#8DB580', '#CDE7B0', '#E8F6D2'] // Muted earthy greens
        ],

        // 4. Retro Pop
        [
            ['#FFD700', '#FF8C00', '#FF4500', '#FF69B4', '#FF1493'], // Bold retro colors
            ['#800080', '#8A2BE2', '#9370DB', '#7B68EE', '#9400D3'], // Purples and violets
            ['#DC143C', '#FF1493', '#FF69B4', '#FFC0CB', '#FFB6C1'], // Vibrant pinks
            ['#00FF00', '#7FFF00', '#32CD32', '#98FB98', '#ADFF2F'], // Bright greens
            ['#00FFFF', '#40E0D0', '#7FFFD4', '#AFEEEE', '#ADD8E6'], // Electric blues
            ['#FFFF00', '#FFD700', '#FFA500', '#FF4500', '#FF0000'], // Neon yellows and oranges
            ['#FF00FF', '#FF1493', '#FF69B4', '#FFB6C1', '#FFC0CB'] // Hot magentas
        ],

        // 5. Desert Sands
        [
            ['#DEB887', '#F4A460', '#D2B48C', '#BC8F8F', '#8B4513'], // Sand and earth tones
            ['#C19A6B', '#E3C16F', '#E9CBA0', '#F4DECD', '#FFEFD5'], // Warm, muted tones
            ['#FFD700', '#FFA07A', '#FF4500', '#FF6347', '#FF8C00'], // Desert sunsets
            ['#B8860B', '#D2691E', '#CD853F', '#F4A460', '#FFE4C4'], // Rich sienna
            ['#FFF8DC', '#F5DEB3', '#DEB887', '#D2B48C', '#C19A6B'], // Pale sandy hues
            ['#8B0000', '#A0522D', '#CD5C5C', '#F08080', '#FA8072'], // Sunset reds and browns
            ['#FAF0E6', '#FFE4E1', '#FFDAB9', '#FDF5E6', '#FFF5EE'] // Delicate neutral tones
        ],

        // 6. Candy Land
        [
            ['#FF69B4', '#FF1493', '#FFC0CB', '#FFA07A', '#FFDAB9'], // Bubblegum pinks
            ['#FFA500', '#FF8C00', '#FF4500', '#FF6347', '#FF7F50'], // Tangerine oranges
            ['#FFD700', '#FFFF00', '#FFFACD', '#FAFAD2', '#FFFFE0'], // Lemon yellows
            ['#00FFFF', '#40E0D0', '#7FFFD4', '#AFEEEE', '#B0E0E6'], // Aqua and turquoise
            ['#7B68EE', '#6A5ACD', '#483D8B', '#9370DB', '#8A2BE2'], // Sweet purples
            ['#FF0000', '#FF4500', '#FF6347', '#FF7F50', '#FFA07A'], // Cherry reds
            ['#B22222', '#DC143C', '#FF6347', '#FF7F50', '#FF4500'] // Candy apple reds
        ]
    ];

    function createPaletteSequence(paletteIndex: number, palettes: string[][], direction: 'l' | 'r') {
        let sequence: any[] = [];
        const speed = 0.25;
        const overlap = 0.1;
        const resetSpeed = 0.1;
        const pauseAfterReset = 0.5;
        const linger = 8;

        palettes.forEach((paletteColors) => {
            const indices =
                direction === 'l'
                    ? [1, 2, 3, 4, 5] // Normal order
                    : [5, 4, 3, 2, 1]; // Reversed order

            // Reset all to white
            indices.forEach((index) => {
                sequence.push([`#Palette${paletteIndex}Color${index}`, { fill: ['#ffffff'] }, { duration: resetSpeed }]);
            });

            // Apply colors in the specified order
            indices.forEach((index, idx) => {
                sequence.push([`#Palette${paletteIndex}Color${index}`, { fill: [paletteColors[idx]] }, { duration: speed, at: idx === 0 ? `+${pauseAfterReset}` : `-${overlap}` }]);
            });

            // Hold the final color for the linger period
            const lastIndex = direction === 'l' ? 5 : 1;
            sequence.push([`#Palette${paletteIndex}Color${lastIndex}`, { fill: [paletteColors[lastIndex - 1]] }, { duration: linger }]);
        });

        return sequence;
    }

    onMount(() => {
        // Animate the palettes initially in
        animate(
            '.palette',
            {
                opacity: [0, 1]
            },
            {
                delay: stagger(0.07, {
                    startDelay: 0.3
                })
            }
        );
        // Animate the palettes infinitely
        animate(createPaletteSequence(1, paletteSets[0], 'l'), { repeat: Infinity, repeatType: 'reverse', delay: 2 } as DynamicAnimationOptions);
        animate(createPaletteSequence(2, paletteSets[1], 'r'), { repeat: Infinity, repeatType: 'reverse', delay: 5 } as DynamicAnimationOptions);
        animate(createPaletteSequence(3, paletteSets[2], 'l'), { repeat: Infinity, repeatType: 'reverse', delay: 9 } as DynamicAnimationOptions);
        animate(createPaletteSequence(4, paletteSets[3], 'r'), { repeat: Infinity, repeatType: 'reverse', delay: 1 } as DynamicAnimationOptions);
        animate(createPaletteSequence(5, paletteSets[4], 'r'), { repeat: Infinity, repeatType: 'reverse', delay: 15 } as DynamicAnimationOptions);
        animate(createPaletteSequence(6, paletteSets[5], 'l'), { repeat: Infinity, repeatType: 'reverse', delay: 20 } as DynamicAnimationOptions);
    });
</script>

{#if side == 'left'}
    <div class="absolute top-[48px] left-0 -z-10 hidden h-[339px] w-[406px] translate-x-[-70%] sm:block">
        <svg viewBox="0 0 406 339" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_379_1008)" class="palette">
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
            <g filter="url(#filter1_d_379_1008)" class="palette">
                <g clip-path="url(#clip1_379_1008)">
                    <rect x="46" y="130" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(46 130)" fill="#FAB12F" id="Palette6Color1" />
                    <rect width="64.8" height="78" transform="translate(110.8 130)" fill="#FA812F" id="Palette6Color2" />
                    <rect width="64.8" height="78" transform="translate(175.6 130)" fill="#FB4132" id="Palette6Color3" />
                    <rect width="64.8" height="78" transform="translate(240.4 130)" fill="#ffffff" id="Palette6Color4" />
                    <rect width="64.8" height="78" transform="translate(305.2 130)" fill="#FEF3E2" id="Palette6Color5" />
                </g>
                <rect x="45" y="129" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <g filter="url(#filter2_d_379_1008)" class="palette">
                <g clip-path="url(#clip2_379_1008)">
                    <rect x="6" y="256" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(6 256)" fill="#0B97B0" id="Palette3Color1" />
                    <rect width="64.8" height="78" transform="translate(70.8 256)" fill="#FADA7B" id="Palette3Color2" />
                    <rect width="64.8" height="78" transform="translate(135.6 256)" fill="#F5F0CE" id="Palette3Color3" />
                    <rect width="64.8" height="78" transform="translate(200.4 256)" fill="#82BFDA" id="Palette3Color4" />
                    <rect width="64.8" height="78" transform="translate(265.2 256)" fill="#B1F0F6" id="Palette3Color5" />
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
            <g filter="url(#filter1_d_379_1032)" class="palette">
                <g clip-path="url(#clip1_379_1032)">
                    <rect x="75" y="256" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(75 256)" fill="#293663" id="Palette5Color1" />
                    <rect width="64.8" height="78" transform="translate(139.8 256)" fill="#0B97B0" id="Palette5Color2" />
                    <rect width="64.8" height="78" transform="translate(204.6 256)" fill="#605EA1" id="Palette5Color3" />
                    <rect width="64.8" height="78" transform="translate(269.4 256)" fill="#432E54" id="Palette5Color4" />
                    <rect width="64.8" height="78" transform="translate(334.2 256)" fill="#B3C8CF" id="Palette5Color5" />
                </g>
                <rect x="74" y="255" width="326" height="80" rx="14" stroke="white" stroke-width="2" />
            </g>
            <g filter="url(#filter0_d_379_1032)" class="palette">
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
            <g filter="url(#filter2_d_379_1032)" class="palette">
                <g clip-path="url(#clip2_379_1032)">
                    <rect x="6" y="4" width="324" height="78" rx="13" fill="white" />
                    <rect width="64.8" height="78" transform="translate(6 4)" fill="#FF7518" id="Palette4Color1" />
                    <rect width="64.8" height="78" transform="translate(70.8 4)" fill="#8C6239" id="Palette4Color2" />
                    <rect width="64.8" height="78" transform="translate(135.6 4)" fill="#46281C" id="Palette4Color3" />
                    <rect width="64.8" height="78" transform="translate(200.4 4)" fill="#211E26" id="Palette4Color4" />
                    <rect width="64.8" height="78" transform="translate(265.2 4)" fill="#008080" id="Palette4Color5" />
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
