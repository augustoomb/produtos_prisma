import { columns } from "@/components/products/columns-table"
import { DataTable } from "@/components/products/products-table"
import { getProducts } from "@/actions/product";
import { Product } from "@prisma/client";
import AddProduct from "@/components/products/add-product"
import { Suspense } from 'react'

async function getData(): Promise<Product[]> {

  const products: Product[] = await getProducts();
  return products
  
}

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
  const data = await getData()

  return (
    <DataTable columns={columns} data={data} />
  )
}