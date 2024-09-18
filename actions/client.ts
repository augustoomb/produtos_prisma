'use server'

import { Client } from "@prisma/client";
import { clientSchema } from '@/types/zod';
import { fetcher } from "@/lib/utils";

export async function getClients(): Promise<Client[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/clients`, {
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

export async function deleteClient( prevState: any, formData: FormData) {    

    try {
        const id = Number(formData.get('id'))
        return await fetcher('DELETE', { id }, 'clients')

    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function deleteClients( ids: number[] ) {
    try {
        return await fetcher('DELETE', { ids }, 'clients')
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}

export async function createClient(formData: FormData) {
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
        
        return await fetcher('POST', { name, email, phone }, 'clients')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function updateClient(prevState: any, formData: FormData) {
    try {
        const validatedClient = clientSchema.safeParse({
            id: Number(formData.get('idClient')),
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

        const { id, name, email, phone } = validatedClient.data;

        return await fetcher('PUT', { id, name, email, phone }, 'clients')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
