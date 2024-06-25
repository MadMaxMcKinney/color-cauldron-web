<script lang="ts">
    import { animate, spring, timeline } from 'motion';
    import { createEventDispatcher } from 'svelte';
    export let text: string = '';
    export let icon: string = '';
    export let href: string = '';
    export let id: string = '';
    export let layout: 'full' | 'icon' = 'full';
    export let type: 'default' | 'danger' = 'default';
    const dispatch = createEventDispatcher();

    let selfRef: HTMLElement;
    let iconRef: any;

    const layoutClasses = {
        full: 'py-4 px-6',
        icon: 'w-12 py-4'
    };

    const typeClasses = {
        default: 'border border-zinc-300 bg-white text-black hover:bg-zinc-200 active:bg-zinc-300',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700'
    };

    /**
     * Pulse the button to signify something happened
     * @example favButton.notify()
     */
    export function notify() {
        // Get the starting color of the button so that we can animate back to it
        const startingColor = getComputedStyle(selfRef).backgroundColor;
        timeline([
            // Animate the button
            [
                selfRef,
                {
                    backgroundColor: [startingColor, '#6dffa2', startingColor],
                    scale: [1, 1.05, 1]
                },
                { duration: 0.7 }
            ],
            // Animate the icon
            [
                iconRef,
                {
                    scale: [1, 1.3, 1]
                },
                { duration: 0.8, at: 0 }
            ]
        ]).finished.then(() => {
            // Remove inline styles created by the animation so that the hover effect can work again
            selfRef.removeAttribute('style');
        });
    }
</script>

{#if href}
    <a class="{layoutClasses[layout]} {typeClasses[type]} inline-flex items-center justify-center gap-2 rounded-[13px] font-medium leading-none transition-all focus-visible:outline-offset-4 {$$restProps.class}" {id} {href} bind:this={selfRef}>
        {#if icon}
            <i class={icon} bind:this={iconRef} />
        {/if}
        {#if layout === 'full'}
            {text}
        {/if}
    </a>
{:else}
    <button class="{layoutClasses[layout]} {typeClasses[type]} inline-flex items-center justify-center gap-2 rounded-[13px] font-medium leading-none transition-all focus-visible:outline-offset-4 {$$restProps.class}" {id} bind:this={selfRef} on:click={() => dispatch('click')}>
        {#if icon}
            <i class={icon} bind:this={iconRef} />
        {/if}
        {#if layout === 'full'}
            {text}
        {/if}
    </button>
{/if}
