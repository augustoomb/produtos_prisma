import prisma from '@/lib/prisma';
import { Product, Prisma } from "@prisma/client";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { productSchema } from '@/types/zod';

// GET PRODUCTS
export async function GET(req: Request, res: NextApiResponse) {
   try {
        const products: Product[] = await prisma.product.findMany({});

        return NextResponse.json(products);
   } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}

// SAVE PRODUCTS
export async function POST(req: Request, res: NextApiResponse) {

    try {
        const dataProduct = await req.json();

        const validatedProduct = productSchema.safeParse(dataProduct)

        if (!validatedProduct.success) {
            return NextResponse.json({
                errors: validatedProduct.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { name, price, stock, description } = dataProduct

        await prisma.product.create({
            data: {
                name,
                price: new Prisma.Decimal(price),
                stock,
                description,
            },
        });

        return NextResponse.json({ message: 'Produto criado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(req: Request, res: NextApiResponse) {

    try {
        const dataProduct = await req.json();

        const validatedProduct = productSchema.safeParse(dataProduct)

        if (!validatedProduct.success) {
            return NextResponse.json({
                errors: validatedProduct.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { id, name, price, description } = dataProduct

        await prisma.product.update({
            where: { id: id },
            data: {
                name,
                price,
                description,
            },
        });

        return NextResponse.json({ message: 'Produto atualizado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE PRODUCT
export async function DELETE(req: Request, res: NextApiResponse) {
    try {
        const dataProduct = await req.json();
        
        if(dataProduct.ids) {
            const { ids } = dataProduct;
            await prisma.product.deleteMany({ where: { id: { in: ids } } });
            return NextResponse.json({ message: 'success' });
        }

        const { id } = dataProduct;
        const product = await prisma.product.delete({where: { id: id },});
 
        return NextResponse.json(product);
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: 'Dados não encontrados' }, { status: 400 });
            }
          }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
 }
