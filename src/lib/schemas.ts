import { z } from 'zod';

// Name has a default value just to display something in the form.
export const promptSchema = z.object({
    prompt: z
        .string({
            invalid_type_error: 'Prompt must be a string.',
            required_error: 'Prompt is required.'
        })
        .nonempty({ message: "Prompt can't be empty." })
        .max(100, "Prompt can't be longer than 100 characters.")
});
