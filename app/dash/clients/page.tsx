import { columns } from "@/components/clients/columns-table"
import { DataTable } from "@/components/clients/clients-table"
import { getClients } from "@/actions/client";
import { Client } from "@prisma/client";
import AddClient from "@/components/clients/add-client"

async function getData(): Promise<Client[]> {

  const clients: Client[] = await getClients();
  return clients
}

export default async function Clients() {
  const data = await getData()

  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Clientes</h1>
        <div className="hidden md:block">
          <AddClient />
        </div>
      </div>
      <DataTable columns={columns} data={data} />
    </main>
  )
}
