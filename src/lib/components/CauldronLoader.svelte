<script lang="ts">
    export let loading: boolean = false;
</script>

<div>
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="22" viewBox="0 0 18 22" fill="none" class="overflow-visible">
        {#if loading}
            <path
                d="M7.25247 3.24925C6.99902 3.00481 6.65526 2.86748 6.29681 2.86748C5.93837 2.86748 5.59461 3.00481 5.34116 3.24925C5.0877 3.49369 4.94531 3.82523 4.94531 4.17092C4.94531 4.51662 5.0877 4.84815 5.34116 5.0926C5.59461 5.33704 5.93837 5.47437 6.29681 5.47437C6.65526 5.47437 6.99902 5.33704 7.25247 5.0926C7.50593 4.84815 7.64832 4.51662 7.64832 4.17092C7.64832 3.82523 7.50593 3.49369 7.25247 3.24925Z"
                fill="#22C55E"
                class="animate-bubble-up"
            />
            <path
                d="M12.4606 0.83325C12.0804 0.466586 11.5647 0.260596 11.0271 0.260596C10.4894 0.260596 9.97377 0.466586 9.59359 0.83325C9.2134 1.19991 8.99982 1.69722 8.99982 2.21576C8.99982 2.7343 9.2134 3.2316 9.59359 3.59827C9.97377 3.96493 10.4894 4.17092 11.0271 4.17092C11.5647 4.17092 12.0804 3.96493 12.4606 3.59827C12.8407 3.2316 13.0543 2.7343 13.0543 2.21576C13.0543 1.69722 12.8407 1.19991 12.4606 0.83325Z"
                fill="#22C55E"
                class="animate-bubble-up-slow"
            />
        {/if}
        <g class="origin-bottom {loading ? 'animate-cauldron-rock' : ''}">
            {#if loading}
                <rect y="3" width="18" height="5" fill="url(#paint0_linear_35_600)" class="animate-pulse-intense" />
            {/if}
            <path
                d="M1.41027 10.5C0.662946 11.7891 0 13.3555 0 14.8125C0 16.2734 0.478125 17.5234 1.28571 18.543V21.75H3.21429V20.2266C4.8375 21.2227 6.90268 21.75 9 21.75C11.0973 21.75 13.1625 21.2227 14.7857 20.2266V21.75H16.7143V18.543C17.5219 17.5234 18 16.2734 18 14.8125C18 13.3555 17.3371 11.7891 16.5897 10.5H18V8H14.7857H9H3.21429H0V10.5H1.41027Z"
                fill="black"
                class="transition-all {loading ? '' : '-translate-y-1'}"
            />
        </g>
        <defs>
            <linearGradient id="paint0_linear_35_600" x1="9" y1="3" x2="9" y2="7.99994" gradientUnits="userSpaceOnUse">
                <stop stop-color="#00C853" stop-opacity="0" />
                <stop offset="1" stop-color="#00C853" />
            </linearGradient>
        </defs>
    </svg>
</div>
