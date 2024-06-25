<script lang="ts">
    import { scale } from 'svelte/transition';
    import Button from '$lib/components/Button.svelte';
    import Overlay from '$lib/components/utility/Overlay.svelte';
    import { createEventDispatcher, onMount } from 'svelte';

    export let title: string = 'Dialog';
    export let confirmPrompt: string = 'Confirm';
    export let cancelPrompt: string = 'Cancel';
    export let visible: boolean = false;
    const dispatch = createEventDispatcher();

    function close(answer: string) {
        visible = false;
        dispatch('close', { answer });
    }
</script>

{#if visible}
    <Overlay>
        <div in:scale={{ delay: 200, start: 0.8 }} out:scale={{ start: 0.8 }} class="flex min-w-56 max-w-[400px] flex-col overflow-clip rounded-[13px] shadow-md md:min-w-[350px]">
            <!-- Footer -->
            <header class="flex min-h-[70px] items-center gap-4 bg-white px-6 md:flex-row md:items-center">
                <p class="text-base font-medium leading-tight text-black md:text-lg">{title}</p>
            </header>
            <!-- Footer -->
            <footer class="flex flex-row items-center gap-4 bg-white px-4 py-3 md:h-[80px]">
                <Button text={confirmPrompt} on:click={() => close('confirm')} class="w-full flex-1 md:w-auto" type="danger" />
                <Button text={cancelPrompt} on:click={() => close('cancel')} class="w-full flex-1 md:w-auto" />
            </footer>
        </div>
    </Overlay>
{/if}
