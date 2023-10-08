<script lang="ts">
    export let title: string;
    export let description: string;
    export let image: string;
    export let alt: string;

    export let size: 'single' | 'double' = 'single';

    let sizeClasses = {
        single: 'col-span-1',
        double: 'col-span-1 md:col-span-2'
    };
</script>

<div class="flex flex-col gap-4 bg-[#FAFAFA]/50 border-2 border-white shadow-card backdrop-blur-2xl py-6 px-8 rounded-[13px] {sizeClasses[size]}">
    <h3 class="text-2xl font-serif font-bold text-black">{title}</h3>
    <p class="text-zinc-400">{description}</p>
    <img src={image} {alt} class="w-full h-full object-cover self-center" />
</div>
