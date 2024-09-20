import prisma from '@/lib/prisma';
import { Service, Prisma } from "@prisma/client";
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { serviceSchema } from '@/types/zod';

// GET SERVICES
export async function GET(req: Request, res: NextApiResponse) {
   try {
        const services: Service[] = await prisma.service.findMany({});

        return NextResponse.json(services);
   } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
   }
}

// SAVE SERVICES
export async function POST(req: Request, res: NextApiResponse) {

    try {
        const dataService = await req.json();

        const validatedService = serviceSchema.safeParse(dataService)

        if (!validatedService.success) {
            return NextResponse.json({
                errors: validatedService.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { name, price, description } = dataService

        await prisma.service.create({
            data: {
                name,
                price: new Prisma.Decimal(price),
                description,
            },
        });

        return NextResponse.json({ message: 'Serviço criado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
export async function PUT(req: Request, res: NextApiResponse) {

    try {
        const dataService = await req.json();

        const validatedService = serviceSchema.safeParse(dataService)

        if (!validatedService.success) {
            return NextResponse.json({
                errors: validatedService.error.flatten().fieldErrors
            }, { status: 400 });
        }

        const { id, name, price, description } = dataService

        await prisma.service.update({
            where: { id: id },
            data: {
                name,
                price,
                description,
            },
        });

        return NextResponse.json({ message: 'Serviço atualizado com sucesso' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// DELETE SERVICES
export async function DELETE(req: Request, res: NextApiResponse) {
    try {
        const dataService = await req.json();
        
        if(dataService.ids) {
            const { ids } = dataService;
            await prisma.service.deleteMany({ where: { id: { in: ids } } });
            return NextResponse.json({ message: 'success' });
        }

        const { id } = dataService;
        const service = await prisma.service.delete({where: { id: id },});
 
        return NextResponse.json(service);
    } catch (error) {

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2025') {
                return NextResponse.json({ error: 'Dados não encontrados' }, { status: 400 });
            }
          }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
 }
