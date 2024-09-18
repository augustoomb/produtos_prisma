'use server'

import { revalidatePath } from 'next/cache';
import { Client } from "@prisma/client";
import { clientSchema } from '@/types/zod';
import { reqApi, getApi } from "@/lib/utils";

// export async function getClients(): Promise<Client[]> {
export async function getClients() {
    try {                
        return await getApi('clients') 
    } catch (error) {
        return []
    }
}

export async function deleteClient( prevState: any, formData: FormData) {    

    try {
        const id = Number(formData.get('id'))
        return await reqApi('DELETE', { id }, 'clients')

    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function deleteClients( ids: number[] ) {
    try {
        return await reqApi('DELETE', { ids }, 'clients')
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
        
        return await reqApi('POST', { name, email, phone }, 'clients')
        
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

        return await reqApi('PUT', { id, name, email, phone }, 'clients')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
