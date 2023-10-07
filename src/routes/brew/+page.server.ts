import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { promptSchema } from '$lib/schemas';

export const load = async () => {
    // Server API:
    const form = await superValidate(promptSchema);

    // Always return { form } in load and form actions.
    return { form };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, promptSchema);
        console.log('POST', form);

        if (!form.valid) {
            // Again, always return { form } and things will just work.
            return fail(400, { form });
        }

        return { form };
    }
};
