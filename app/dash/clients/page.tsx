import { Button } from "@/components/ui/button"
import { PlusIcon } from "@/components/clients/icons"
import ClientsTable from "@/components/clients/clients-table"
import AddClient from "@/components/clients/add-client"

export default function Clients() {
  return (
      <main className="flex-grow p-2 md:p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Clientes</h1>
          <div className="hidden md:block">
            {/* <Button
              type="button"
              className="px-2 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm"
            >
              <PlusIcon className="w-4 h-4" />
              <span>Cliente</span>
            </Button> */}
            <AddClient />
          </div>
        </div>
        <ClientsTable />
      </main>
  )
}



