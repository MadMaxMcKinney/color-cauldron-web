<script lang="ts">
    import { page } from '$app/stores';
    import Button from '$lib/components/Button.svelte';
    import Container from '$lib/components/Container.svelte';
</script>

<Container>
    <div class="mt-14 flex w-full flex-col items-center justify-center gap-9">
        <div class="flex flex-col items-center gap-4">
            <i class="fa-regular fa-spider-black-widow text-2xl"></i>
            <h1 class="text-2xl font-medium">{$page.status}: {$page.error?.message}</h1>
            <p class="opacity-60">We couldn't find what you are looking for, try again or return home.</p>
        </div>
        <Button href="/" text="Go Home" />
    </div>
</Container>
