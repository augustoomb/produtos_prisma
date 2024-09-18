'use server'

import { productSchema } from '@/types/zod';
import { reqApi, getApi } from "@/lib/utils";

export async function getProducts() {
    try {
        return await getApi('products')
    } catch (error) {
        return []
    }
}

export async function deleteProduct( prevState: any, formData: FormData) {

    try {
        const id = Number(formData.get('id'))
        return await reqApi('DELETE', { id }, 'products')

    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function deleteProducts( ids: number[] ) {

    try {
        return await reqApi('DELETE', { ids }, 'products')
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}

export async function createProduct(formData: FormData) {
    try {
        const validatedProduct = productSchema.safeParse({
            name: formData.get('name'),
            price: Number(formData.get('price')),
            description: formData.get('description'),
        })

        if (!validatedProduct.success) {
            return {
                status: "error",
                errors: validatedProduct.error.flatten().fieldErrors
            }
        }

        const { name, price, description } = validatedProduct.data     

        return await reqApi('POST', { name, price, description }, 'products')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function updateProduct(prevState: any, formData: FormData) {
    try {
        const validatedProduct = productSchema.safeParse({
            id: Number(formData.get('idProduct')),
            name: formData.get('name'),
            price: Number(formData.get('price')),
            description: formData.get('description'),
        })

        if (!validatedProduct.success) {
            return {
                status: "error",
                errors: validatedProduct.error.flatten().fieldErrors
            }
        }

        const { id, name, price, description } = validatedProduct.data

        return await reqApi('PUT', { id, name, price, description }, 'products')
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
