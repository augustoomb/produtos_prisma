'use server'

import { Product } from "@prisma/client";
import { productSchema } from '@/types/zod';
import { revalidatePath } from 'next/cache';

export async function getProducts(): Promise<Product[]> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const products = await response.json();

        return products
    } catch (error) {
        return []
    }
}

export async function deleteProduct( prevState: any, formData: FormData) {

    const id = Number(formData.get('id'))

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
            method: 'DELETE',
            body: JSON.stringify({
                id: id
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                status: "error",
                errors: { erro: "Erro ao deletar. Verifique a disponibilidade do seu banco de dados." },
            }
        }

        await response.json();

        revalidatePath('/dash/products');        

        return {
            status: "success",
            errors: {},
        }  

    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function deleteProducts( ids: number[] ) {

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
            method: 'DELETE',
            body: JSON.stringify({
                ids: ids
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                status: "error",
                errors: { erro: "Erro ao deletar. Verifique a disponibilidade do seu banco de dados." },
            }
        }

        await response.json();

        revalidatePath('/dash/products');        

        return {
            status: "success",
            errors: {},
        }  

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

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
            method: 'POST',
            body: JSON.stringify({
                name: name,
                price: price,
                description: description,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                status: "error",
                errors: { erro: "Erro ao criar. Verifique a disponibilidade do seu banco de dados." },
            }
        }

        await response.json();

        revalidatePath('/dash/products');

        return {
            status: "success",
            errors: {},
        }        
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
export async function updateProduct(prevState: any, formData: FormData) {

    console.log(formData.get('idProduct'))
    console.log(formData.get('name'))
    console.log(formData.get('price'))
    console.log(formData.get('description'))

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

        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
            method: 'PUT',
            body: JSON.stringify({
                id: id,
                name: name,
                price: price,
                description: description,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                status: "error",
                errors: { erro: "Erro ao atualizar. Verifique a disponibilidade do seu banco de dados." },
            }
        }

        await response.json();

        revalidatePath('/dash/products');

        return {
            status: "success",
            errors: {},
        }        
        
    } catch (error) {
        return {
            status: "error",
            errors: { erro: "Erro de sistema. Verifique com o suporte." },
        }
    }
}
