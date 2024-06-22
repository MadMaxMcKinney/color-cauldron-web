<script lang="ts">
    import { tooltip } from '$lib/actions';
    import Container from '$lib/components/Container.svelte';
</script>

<Container>
    <div class="flex flex-col mx-auto animate-fade-in">
        <section class="mt-14 flex gap-3 items-center">
            <p class="font-bold text-3xl font-serif">Favorites</p>
            <i class="fa-regular fa-circle-info text-zinc-400 text-[20p] transition-colors hover:text-zinc-500" use:tooltip={{ text: 'Palettes are saved locally on-device', offset: [0, 8] }} />
        </section>
    </div>
</Container>
