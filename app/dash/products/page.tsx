import { columns } from "@/components/products/columns-table"
import { DataTable } from "@/components/products/products-table"
import { getProducts } from "@/actions/product";
import { Suspense } from 'react'
import AddProduct from "@/components/products/add-product";

export default async function Products() {
    return (
      <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Produtos</h1>
        <div className="hidden md:block">
          <AddProduct />
        </div>
      </div>      
      <Suspense fallback={<p>Carregando...</p>}> 
        <ProductsTable />
      </Suspense>
    </main>
  )
}

async function ProductsTable() {
  const data = await getProducts()

  return (
    <DataTable columns={columns} data={data} />
  )
}
