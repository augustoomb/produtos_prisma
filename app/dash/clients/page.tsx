import { columns } from "@/components/clients/columns-table"
import { DataTable } from "@/components/clients/clients-table"
import { getClients } from "@/actions/client";
import { Client } from "@prisma/client";
import { createClient } from "@/actions/client";
import AddEntity from "@/components/reutilizaveis/add-entity";
import { Suspense } from 'react'

async function getData(): Promise<Client[]> {

  const clients: Client[] = await getClients();
  return clients
}

export default async function Clients() {

  const clientFields = [
    { id: "name", name: "name", label: "Nome", type: "text", placeholder: "Fulano de Tal" },
    { id: "email", name: "email", label: "E-mail", type: "email", placeholder: "fulano@mail.com" },
    { id: "phone", name: "phone", label: "Telefone", type: "text", placeholder: "XX999998888" },
  ];


  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Clientes</h1>
        <div className="hidden md:block">
        <AddEntity
          title="Cliente"
          description="Adicionar um novo cliente"
          fields={clientFields}
          createEntity={createClient}
        />
        </div>
      </div>      
      <Suspense fallback={<p>Carregando...</p>}> 
        <ClientsTable />
      </Suspense>
    </main>
  )
}

async function ClientsTable() {
  const data = await getData()

  return (
    <DataTable columns={columns} data={data} />
  )
}