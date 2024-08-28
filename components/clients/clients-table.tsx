import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { getClients } from "@/actions/client";
import { Client } from "@prisma/client";
import EditClient from "./edit-client";

export default async function ClientsTable() {
    const clients: Client[] = await getClients();

    return (
        <Table >
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>E-mail</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead className="text-right">Telefone</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>
            <TableBody>
                {clients.map((client, index) => (
                    <TableRow key={index}>
                        <TableCell>{client.id}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell className="text-right">{client.phone}</TableCell>
                        <TableCell className="hidden md:block">
                            <EditClient client={client}/>                            
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
