<script lang="ts">
    export let text: string;
    export let icon: string;
    export let href: string;
</script>

<a
    class="inline-flex h-14 items-center justify-center gap-3 rounded-[13px] border border-white bg-[#3FF381] px-6 text-xl leading-none font-medium shadow-xl shadow-green-300/75 transition-all hover:-translate-y-[2px] hover:bg-[#6dffa2] hover:shadow-2xl hover:shadow-green-300 focus-visible:outline-offset-4 {$$restProps.class}"
    {href}
>
    <i class={icon} />
    {text}
</a>
