import type { RequestHandler } from './$types';
import { OPEN_AI_KEY } from '$env/static/private';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: OPEN_AI_KEY
});

export const GET: RequestHandler = async ({ url }) => {
    let prompt = url.searchParams.get('prompt');
    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system',
                content:
                    'You are a color specialist. You help people find colors that will work well based on a prompt explaining how they will use the colors. You will respond only with an array of color objects, where each object has a field named hex for the hex value of the color, and another field named name for the name of the color. You will always provide only 5 color objects. Reminder you should only respond with an array. Do not provide any other information.'
            },
            {
                role: 'user',
                content: prompt
            }
        ],
        model: 'gpt-3.5-turbo'
    });

    let newPalette: Palette;

    try {
        // Parse the data following the OpenAI schema https://platform.openai.com/docs/api-reference/chat/object
        newPalette = {
            name: prompt!,
            colors: JSON.parse(completion.choices[0].message.content!) as PaletteColor[]
        };
    } catch (e) {
        return Response.json({ error: e }, { status: 400 });
    }

    // TODO: Make sure the response is valid. The model is not perfect and sometimes responds with additional information beyond the array of colors. We should ideally only return the array of colors.
    console.dir('Palette generated: ', newPalette);
    return Response.json(newPalette);
};
