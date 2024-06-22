<script lang="ts">
    export let text: string;
    export let icon: string;
    export let href: string;
</script>

<a
    class="bg-[#3FF381] border border-white rounded-[13px] h-16 px-6 inline-flex justify-center items-center gap-3 font-medium text-xl leading-none shadow-xl shadow-green-300/75 transition-all hover:bg-[#6dffa2] hover:-translate-y-[2px] hover:shadow-2xl hover:shadow-green-300 focus-visible:outline-offset-4 {$$restProps.class}"
    {href}
>
    {text}
    <i class={icon} />
</a>
