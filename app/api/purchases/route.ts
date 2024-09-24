import prisma from '@/lib/prisma';
import { Purchase, Prisma } from "@prisma/client";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { purchaseSchema } from '@/types/zod';

// GET PURCHASES
export async function GET(req: Request, res: NextApiResponse) {
   try {
        const purchases: Purchase[] = await prisma.purchase.findMany({
            // include: {
            //     products: {
            //         include: {
            //             product: true
            //         }
            //     }
            // }
        });

        return NextResponse.json(purchases);
   } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}

// SAVE PURCHASES
export async function POST(req: Request, res: NextApiResponse) {

    try {
        const dataPurchase = await req.json();

        const validatedPurchase = purchaseSchema.safeParse(dataPurchase)

        if (!validatedPurchase.success) {
            return NextResponse.json({
                errors: validatedPurchase.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { total, description, products } = dataPurchase

        await prisma.purchase.create({
            data: {
                total: new Prisma.Decimal(total),
                description,
                products: {
                    create: products.map((product: { id: number }) => ({
                        product: {
                            connect: { id: product.id }
                        }
                    }))
                    // create:[
                    //     {
                    //         product: {
                    //             connect: { id: products[0].id }
                    //         }
                    //     }
                    // ]
                }
            }
        });

        return NextResponse.json({ message: 'Compra criada com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(req: Request, res: NextApiResponse) {

    try {
        const dataPurchase = await req.json();

        const validatedPurchase = purchaseSchema.safeParse(dataPurchase)

        if (!validatedPurchase.success) {
            return NextResponse.json({
                errors: validatedPurchase.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { id, total, description, products } = dataPurchase

        await prisma.purchase.update({
            where: { id: id },
            data: {
                total: new Prisma.Decimal(total),
                description,
                products,
            },
        });

        return NextResponse.json({ message: 'Compra atualizada com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE PURCHASES
export async function DELETE(req: Request, res: NextApiResponse) {
    try {
        const dataPurchase = await req.json();
        
        if(dataPurchase.ids) {
            const { ids } = dataPurchase;
            await prisma.purchase.deleteMany({ where: { id: { in: ids } } });
            return NextResponse.json({ message: 'success' });
        }

        const { id } = dataPurchase;
        const purchase = await prisma.purchase.delete({where: { id: id },});
 
        return NextResponse.json(purchase);
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: 'Dados não encontrados' }, { status: 400 });
            }
          }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
 }
