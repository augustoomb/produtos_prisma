import { columns } from "@/components/services/columns-table"
import { DataTable } from "@/components/services/services-table"
import { getServices } from "@/actions/service";
import { Suspense } from 'react'
import AddService from "@/components/services/add-service"; 
import { Service } from "@prisma/client";

export default async function Services() {
  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Serviços</h1>
        <div className="hidden md:block">
          <AddService />
        </div>
      </div>      
      <Suspense fallback={<p>Carregando...</p>}> 
        <ServicesTable />
      </Suspense>
    </main>
  )
}

async function ServicesTable() {
  const data: Service[] = await getServices()

  return (
    <DataTable columns={columns} data={data} />
  )
}
