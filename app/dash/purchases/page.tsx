// import { columns } from "@/components/purchases/columns-table"
// import { DataTable } from "@/components/purchases/purchase-table"
import { getPurchases } from "@/actions/purchase";
import { Purchase } from "@prisma/client";
// import Add from "@/components/purchases/add-purchase"
import { Suspense } from 'react'

async function getData(): Promise<Purchase[]> {

  const purchases: Purchase[] = await getPurchases();
  return purchases
}

export default async function Purchases() {
  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Purchases</h1>
        <div className="hidden md:block">
          {/* <AddClient /> */}
        </div>
      </div>      
      <Suspense fallback={<p>Carregando...</p>}> 
        <PurchasesTable />
      </Suspense>
    </main>
  )
}

async function PurchasesTable() {
  const data = await getData()

  return (
    // <DataTable columns={columns} data={data} />
    <h3>teste</h3>
  )
}