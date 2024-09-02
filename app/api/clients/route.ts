import prisma from '@/lib/prisma';
import { Client, Prisma } from "@prisma/client";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { clientSchema } from '@/types/zod';

// GET CLIENTS
export async function GET(req: Request, res: NextApiResponse) {
   try {
        const clients: Client[] = await prisma.client.findMany({});

        return NextResponse.json(clients);
   } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}

// SAVE CLIENTS
export async function POST(req: Request, res: NextApiResponse) {

    try {
        const dataClient = await req.json();

        const validatedClient = clientSchema.safeParse(dataClient)

        if (!validatedClient.success) {
            return NextResponse.json({
                errors: validatedClient.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { name, email, phone } = dataClient

        await prisma.client.create({
            data: {
                name,
                email,
                phone,
            },
        });

        return NextResponse.json({ message: 'Cliente criado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE CLIENT
export async function DELETE(req: Request, res: NextApiResponse) {
    try {
        const dataClient = await req.json();
        
        if(dataClient.ids) {
            const { ids } = dataClient;
            await prisma.client.deleteMany({ where: { id: { in: ids } } });
            return NextResponse.json({ message: 'success' });
        }

        const { id } = dataClient;
        const client = await prisma.client.delete({where: { id: id },});
 
        return NextResponse.json(client);
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: 'Dados não encontrados' }, { status: 400 });
            }
          }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
 }
