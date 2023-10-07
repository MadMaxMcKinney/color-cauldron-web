<script lang="ts">
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import IconInfo from 'virtual:icons/ph/info-fill';
    import IconClose from 'virtual:icons/ph/x';
    import IconCookingPot from 'virtual:icons/ph/cooking-pot-fill';
    import type { PageData } from './$types';
    import { superForm } from 'sveltekit-superforms/client';
    import Palette from '$lib/components/Palette.svelte';
    import BrewInput from '$lib/components/BrewInput.svelte';

    export let data: PageData;
    const { form, enhance, errors } = superForm(data.form, {
        applyAction: false,
        resetForm: true,
        async onResult({ result }) {
            if (result.type === 'success') {
                // Result the current palette
                isFetchingPalette = true;

                // Fetch the palette from the server
                let res = await fetch(`/api/palette?prompt=${$form.prompt}`, {
                    method: 'GET'
                });

                let newPalette = await res.json();
                // Svelte doesn't rerender when you push to an array, so we need to create a new array with the new palette
                palettes = [newPalette, ...palettes];

                // Stop the loading animation
                isFetchingPalette = false;
            }
        }
    });

    let isShowingExamples: boolean = false;
    let isFetchingPalette: boolean = false;
    let palettes: any[] = [];

    // Client side length limit for the prompt. The server will also check this.
    $: {
        if ($form.prompt.length > 100) {
            $form.prompt = $form.prompt.slice(0, 100);
        }
    }
</script>

<div class="max-w-[500px] px-6 flex flex-col mx-auto">
    <section class="mt-14 flex flex-col gap-4">
        <p class="font-bold text-3xl font-serif">Brew a palette</p>
        <p class="font-medium text-lg w-full text-zinc-600">Describe how you would use the colors, then sit back and let the magic happen.</p>
    </section>
    <div class="mt-16">
        <form method="POST" use:enhance>
            <div class="flex flex-col gap-2">
                {#if isShowingExamples}
                    <button type="button" on:click={() => (isShowingExamples = false)} class="flex gap-1 items-center self-end text-amber-600 font-medium transition-all hover:text-amber-500 hover:cursor-pointer">Hide examples <IconClose /></button>
                    <div class="p-4 rounded-2xl border-amber-500 border-[3px] border-dashed text-amber-500 mb-4 mt-2">
                        <ul class="font-medium list-disc pl-4">
                            <li>Cozy painting vibes</li>
                            <li>Surprise party for someone who likes the military</li>
                            <li>Lord of the rings</li>
                        </ul>
                    </div>
                {:else}
                    <button type="button" on:click={() => (isShowingExamples = true)} class="flex gap-1 items-center self-end text-green-600 font-medium transition-all hover:text-amber-500 hover:cursor-pointer">Show examples <IconInfo /></button>
                {/if}
                <BrewInput bind:value={$form.prompt} loading={isFetchingPalette} />
                <div class="flex items-center w-full justify-end gap-2">
                    {#if $errors.prompt}
                        <span class="font-medium text-red-600 flex-1">{$errors.prompt}</span>
                    {/if}
                    <span class="text-dark-brown font-medium text-sm">{$form.prompt.length}/100</span>
                </div>
            </div>
        </form>
    </div>
    <div class="mt-16 flex flex-col gap-8">
        {#each palettes as palette (palette)}
            <div in:fade={{ duration: 1000, delay: 700 }} animate:flip={{ duration: 700 }}>
                <Palette {palette} />
            </div>
        {/each}
    </div>
</div>
