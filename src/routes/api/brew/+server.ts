import type { RequestHandler } from './$types';
import { OPEN_AI_KEY } from '$env/static/private';
import OpenAI from 'openai';
import { RateLimiter } from 'sveltekit-rate-limiter/server';

const limiter = new RateLimiter({
    // A rate is defined as [number, unit]
    IP: [120, 'm'] // IP address limiter
});

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY
});

export const GET: RequestHandler = async (event) => {
    // Every call to isLimited counts as a hit towards the rate limit for the event.
    if (await limiter.isLimited(event)) Response.json({ error: 'Rate limit exceeded' }, { status: 429 });

    let prompt = event.url.searchParams.get('prompt');
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    'You are a color specialist. You help people find colors that will work well based on a prompt explaining how they will use the colors. You will respond only with an array of color objects, where each object has a field named hex for the hex value of the color, and another field named name for the name of the color. The name of the color should be thematically relevant to the prompts context if possible. You will always provide only 5 color objects. Reminder you should only respond with an array. Do not provide any other information.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: 'gpt-4o-mini'
    });

    let newPalette: Palette;

    try {
        // Parse the data for colors following the OpenAI schema https://platform.openai.com/docs/api-reference/chat/object
        let paletteColors = JSON.parse(completion.choices[0].message.content!) as PaletteColor[];
        if (paletteColors.length !== 5) {
            console.error('Expected 5 colors, but received ' + paletteColors.length + '. Falling back to default colors.');
            paletteColors = [
                { hex: '#FF0000', name: 'Red' },
                { hex: '#00FF00', name: 'Green' },
                { hex: '#0000FF', name: 'Blue' },
                { hex: '#FFFF00', name: 'Yellow' },
                { hex: '#FF00FF', name: 'Magenta' }
            ];
        }
        newPalette = {
            name: prompt!,
            colors: paletteColors,
            id: Math.random().toString(36).substring(2),
            createdAt: new Date()
        };
    } catch (e) {
        return Response.json({ error: e }, { status: 400 });
    }

    // TODO: Make sure the response is valid. The model is not perfect and sometimes responds with additional information beyond the array of colors. We should ideally only return the array of colors.
    console.log('Palette generated:');
    console.dir(newPalette);
    return Response.json(newPalette);
};
