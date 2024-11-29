<script lang="ts">
    import { blur } from 'svelte/transition';
    import { onMount } from 'svelte';
    import { concurrent } from 'svelte-typewriter';

    let searches = [
        {
            title: 'coffee+shop',
            colors: ['#FF7518', '#8C6239', '#46281C', '#211E26', '#008080']
        },
        {
            title: 'outrun+city',
            colors: ['#5D12D2', '#B931FC', '#FF6AC2', '#FFE5E5', '#B0578D']
        },
        {
            title: 'halloween+witch',
            colors: ['#451952', '#662549', '#AE445A', '#F39F5A', '#FF9B82']
        }
    ];
    let search: string = searches[0].title;
    let json: string = JSON.stringify(searches[0].colors, null, 4);

    // delay function
    function delay(ms: number) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    onMount(async () => {
        // let seq: TimelineDefinition = [
        //     [searchElement, { opacity: [0, 1] }, {duration: 3}],
        //     [jsonElement, { opacity: [0, 1] }, {duration: 3}],
        // ];
        // timeline(seq, { loop: Infinity, repeat: Infinity } as TimelineOptions);

        // infinitely loop through the searches array and update the search and json variables with a delay of 3 seconds
        while (true) {
            for (let i = 0; i < searches.length; i++) {
                search = searches[i].title;
                await delay(1000);
                json = JSON.stringify(searches[i].colors, null, 4);
                await delay(3000);
            }
        }
    });
</script>

<div class="flex w-full flex-col items-center py-12 text-sm md:flex-row md:px-2 lg:text-base">
    <div class="w-full">
        <span class="rounded-t-[7px] bg-zinc-900 p-3 font-bold text-zinc-400">GET</span>
        <div class="flex rounded-[7px] bg-zinc-900 px-4 py-3 whitespace-nowrap text-white">
            {#key search}
                <p use:concurrent={{ interval: 30 }}>/api/brew?prompt=<span class="text-green-500">{search}</span></p>
            {/key}
        </div>
    </div>
    <div class="animate-pulse-intense flex h-[100px] w-[1px] items-center justify-start bg-green-500 md:mt-6 md:h-[1px] md:w-full" />
    <div class="-mt-5 w-full md:mt-0">
        <span class="rounded-t-[7px] bg-zinc-200 p-3 font-bold text-zinc-600">JSON</span>
        <div class="flex rounded-[7px] bg-zinc-200 px-4 py-3 text-black sm:min-w-[350px] lg:whitespace-nowrap">
            {#key json}
                <!-- <span><span class="text-green-500">{'{ '}</span><p use:concurrent={{ interval: 30 }}>{json}</p><span class="text-green-500">{' }'}</span></span> -->
                <p use:concurrent={{ interval: 30 }} class="text-green-600">{'{ '}<span>{json}</span>{' }'}</p>
            {/key}
        </div>
    </div>
</div>
