import prisma from '@/lib/prisma';
import { Client } from "@prisma/client";

export async function getClients(): Promise<Client[]> {
    const clients: Client[] = await prisma.client.findMany({
        // where: { published: true },
        // include: {
        //   author: {
        //     select: { name: true },
        //   },
        // },
    });

    return clients;
}