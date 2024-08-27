import { z, ZodIssue } from 'zod';

export const clientSchema = z.object({
    name: z.string().min(5, {
        message: "Nome deve ter mais de 5 caracteres",
    }).max(50, {
        message: "Nome deve ter menos de 50 caracteres",
    }),
    email: z.string().email({
        message: 'O e-mail deve ser válido',
    }),
    phone: z.string().length(11, {
        message: "Telefone deve ter 11 caracteres",
    })
});