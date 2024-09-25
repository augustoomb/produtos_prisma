import { columns } from "@/components/clients/columns-table"
import { DataTable } from "@/components/clients/clients-table"
import { getClients } from "@/actions/client";
import { Suspense } from 'react'
import AddClient from "@/components/clients/add-client";
import { Client } from "@prisma/client";

export default async function Clients() {
  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Clientes</h1>
        <div className="hidden md:block">
          <AddClient />
        </div>
      </div>      
      <Suspense fallback={<p>Carregando...</p>}> 
        <ClientsTable />
      </Suspense>
    </main>
  )
}

async function ClientsTable() {
  const data: Client[] = await getClients()

  return (
    <DataTable columns={columns} data={data} />
  )
}
