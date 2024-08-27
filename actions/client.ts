import { Client } from "@prisma/client";
import { clientSchema } from '@/types/zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function getClients(): Promise<Client[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const clients = await response.json();

        return clients
    } catch (error) {
        return []
    }
}

export async function createClient(prevState: any, formData: FormData) {
    try {
        const validatedClient = clientSchema.safeParse({
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
        })

        if (!validatedClient.success) {
            return {
                status: "error",
                errors: validatedClient.error.flatten().fieldErrors
            }
        }

        const { name, email, phone } = validatedClient.data     

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/clients`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                status: "error",
                errors: "Erro desconhecido",
            }
        }

        await response.json();

        return {
            status: "success",
            errors: {},
        }        
        
    } catch (error) {
        return {
            status: "error",
            errors: "Erro desconhecido",
        }
    }
}
