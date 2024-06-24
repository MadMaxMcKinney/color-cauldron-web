<script lang="ts">
    export let palette: Palette;
    import { getContrastColorFromHex } from '$lib/utils';
</script>

<div class="container">
    <div class="colors">
        {#each palette.colors as color}
            <span style="background-color: {color.hex}">
                <p style={`color: ${getContrastColorFromHex(color.hex)}`}>{color.hex}</p>
                <p style={`color: ${getContrastColorFromHex(color.hex)}`}>{color.name}</p>
            </span>
        {/each}
    </div>
    <div class="footer">
        <p class="name">{palette.name}</p>
        <div class="watermark">
            <p class="brand">colorcauldron.app</p>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }
    .watermark {
        display: flex;
        gap: 24px;
    }
    .colors {
        display: flex;
        flex: 1;
        width: 100%;
    }
    .colors span {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        height: 100px;
        width: 100%;
        height: 100%;
        padding: 8px;
        padding-bottom: 16px;
    }
    .colors span p {
        font-size: 22px;
        font-weight: 700;
        opacity: 0.75;
        line-height: 1;
    }
    .footer {
        display: flex;
        flex-direction: column;
        gap: 4px;
        background: white;
        padding: 30px;
        width: 100%;
    }
    .name {
        color: green;
        font-size: 50px;
        font-weight: 700;
        line-height: 120%;
    }
    .brand {
        font-weight: 700;
    }
    p {
        font-size: 32px;
        font-weight: 500;
        color: black;
    }
</style>
