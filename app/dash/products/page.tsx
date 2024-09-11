import { columns } from "@/components/products/columns-table"
import { DataTable } from "@/components/products/products-table"
import { getProducts } from "@/actions/product";
import { Product } from "@prisma/client";
import AddEntity from "@/components/reutilizaveis/add-entity";
import { createProduct } from "@/actions/product";
import { Suspense } from 'react'

async function getData(): Promise<Product[]> {

  const products: Product[] = await getProducts();
  return products
  
}

export default async function Products() {
  const productFields = [
    { id: "name", name: "name", label: "Nome", type: "text", placeholder: "Fone de ouvido" },
    { id: "price", name: "price", label: "Preço", type: "text", placeholder: "0,00" },
    { id: "description", name: "description", label: "Descrição", type: "text", placeholder: "Produto feito com ..." },
  ];

  return (
    <main className="flex-grow p-2 md:p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-medium">Produtos</h1>
        <div className="hidden md:block">
        <AddEntity
          title="Cliente"
          description="Adicionar um novo cliente"
          fields={productFields}
          createEntity={createProduct}
        />
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