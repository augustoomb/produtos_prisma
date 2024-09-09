import { z, ZodIssue } from 'zod';

export const clientSchema = z.object({
    id: z.number().int({
        message: 'O id deve ser um número inteiro',
    }).optional(),
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

export const productSchema = z.object({
    id: z.number().int({
        message: 'O id deve ser um número inteiro',
    }).optional(),
    name: z.string().min(5, {
        message: "Nome deve ter mais de 1 caracter",
    }).max(50, {
        message: "Nome deve ter menos de 50 caracteres",
    }),
    price: z.number().positive({
        message: 'O preço deve ser um valor maior que zero',
    }),
    description: z.string().min(5, {
        message: "Descrição deve ter mais de 5 caracteres",
    }).optional()
});
