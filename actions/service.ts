'use server'

import { serviceSchema } from '@/types/zod';
import { reqApi, getApi } from "@/lib/utils";

export async function getServices() {
    try {
        return await getApi('services')
    } catch (error) {
        return []
    }
}

export async function deleteService( prevState: any, formData: FormData) {

    try {
        const id = Number(formData.get('id'))
        return await reqApi('DELETE', { id }, 'services')

    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function deleteServices( ids: number[] ) {

    try {
        return await reqApi('DELETE', { ids }, 'services')
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}

export async function createService(formData: FormData) {
    try {
        const validatedService = serviceSchema.safeParse({
            name: formData.get('name'),
            price: Number(formData.get('price')),
            description: formData.get('description'),
        })

        if (!validatedService.success) {
            return {
                status: "error",
                errors: validatedService.error.flatten().fieldErrors
            }
        }

        const { name, price, description } = validatedService.data     

        return await reqApi('POST', { name, price, description }, 'services')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function updateService(prevState: any, formData: FormData) {
    try {
        const validatedService = serviceSchema.safeParse({
            id: Number(formData.get('idService')),
            name: formData.get('name'),
            price: Number(formData.get('price')),
            description: formData.get('description'),
        })

        if (!validatedService.success) {
            return {
                status: "error",
                errors: validatedService.error.flatten().fieldErrors
            }
        }

        const { id, name, price, description } = validatedService.data

        return await reqApi('PUT', { id, name, price, description }, 'services')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
