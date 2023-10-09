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
                await delay(1000)
                json = JSON.stringify(searches[i].colors, null, 4);
                await delay(3000);
            }
        }
    });
</script>

<div class="flex flex-col items-center w-full py-12 text-sm md:px-2 lg:text-base md:flex-row">
    <div class="w-full">
        <span class="p-3 bg-zinc-900 text-zinc-400 font-bold rounded-t-[7px]">GET</span>
        <div class="text-white flex px-4 py-3 bg-zinc-900 rounded-[7px] whitespace-nowrap">
            {#key search}
                <p use:concurrent={{ interval: 30 }}>/api/brew?prompt=<span class="text-green-500">{search}</span></p>
            {/key}
        </div>
    </div>
    <div class="bg-green-500 flex justify-start items-center h-[100px] w-[1px] md:h-[1px] md:w-full md:mt-6 animate-pulse-intense" />
    <div class="w-full -mt-5 md:mt-0">
        <span class="p-3 bg-zinc-100 text-zinc-600 font-bold rounded-t-[7px]">JSON</span>
        <div class="text-black flex px-4 py-3 bg-zinc-100 rounded-[7px] sm:min-w-[350px] lg:whitespace-nowrap">
            {#key json}
                <!-- <span><span class="text-green-500">{'{ '}</span><p use:concurrent={{ interval: 30 }}>{json}</p><span class="text-green-500">{' }'}</span></span> -->
                <p use:concurrent={{ interval: 30 }} class="text-green-600">{'{ '}<span>{json}</span>{' }'}</p>
            {/key}
        </div>
    </div>
</div>
