'use server'

import { purchaseSchema } from '@/types/zod';
import { reqApi, getApi } from "@/lib/utils";

export async function getPurchases() {
    try {
        return await getApi('purchases')
    } catch (error) {
        return []
    }
}

export async function deletePurchase( prevState: any, formData: FormData) {

    try {
        const id = Number(formData.get('id'))
        return await reqApi('DELETE', { id }, 'purchases')

    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function deletePurchases( ids: number[] ) {

    try {
        return await reqApi('DELETE', { ids }, 'purchases')
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}

export async function createPurchase(formData: FormData) {
    try {
        const validatedPurchase = purchaseSchema.safeParse({
            total: Number(formData.get('total')),
            description: formData.get('description'),
            products: formData.get('products'),
        })

        if (!validatedPurchase.success) {
            return {
                status: "error",
                errors: validatedPurchase.error.flatten().fieldErrors
            }
        }

        const { total, description, products } = validatedPurchase.data     

        return await reqApi('POST', { total, description, products }, 'purchases')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function updatePurchase(prevState: any, formData: FormData) {
    try {
        const validatedPurchase = purchaseSchema.safeParse({
            id: Number(formData.get('idService')),
            total: Number(formData.get('total')),
            description: formData.get('description'),
            products: formData.get('products'),
        })

        if (!validatedPurchase.success) {
            return {
                status: "error",
                errors: validatedPurchase.error.flatten().fieldErrors
            }
        }

        const { id, total, description, products } = validatedPurchase.data

        return await reqApi('PUT', { id, total, description, products }, 'purchases')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
