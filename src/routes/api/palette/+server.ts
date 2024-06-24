import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// Svelte Component To Image
import { image_from_component, type RenderOptions } from 'svelte-component-to-image';

// Normal .svelte component
import SharePalette from '$lib/components/generated/SharePalette.svelte';

export const POST: RequestHandler = (async ({ url, request }: { url: URL; request: Request }) => {
    try {
        const options: RenderOptions = {
            width: 1000,
            height: 800,
            props: {
                // Get Palette from request body
                palette: JSON.parse(await request.text())
            },
            fonts: [
                {
                    name: 'DM Sans',
                    url: `${url.origin}/fonts/DMSans-Medium.ttf`,
                    weight: 500,
                    style: 'medium'
                },
                {
                    name: 'DM Sans',
                    url: `${url.origin}/fonts/DMSans-Bold.ttf`,
                    weight: 700,
                    style: 'bold'
                }
            ]
        };

        // pass the component and options to the package
        const image = await image_from_component(SharePalette, options);
        const response = new Response(image);
        response.headers.append('Content-Type', 'image/png');
        response.headers.append('Cache-Control', 's-maxage=604800, stale-while-revalidate=604800');
        return response;
    } catch (e) {
        console.error(e);
        throw error(500, 'Error trying to generate image from component.');
    }
}) satisfies RequestHandler;
