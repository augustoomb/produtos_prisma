import { Button } from "@/components/ui/button"


export default function Dash() {
  return (
    <main className="flex-grow p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-medium">Dash</h1>
          {/* <Button
            type="button"
            className="px-2 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm"
          >
            <DownloadIcon className="w-4 h-4" />
            <span>+ Cliente</span>
          </Button> */}
          <h2>Descrição da aplicação</h2>
          <p>Aplicação básica para uso de next.js com server components, tailwind, prisma ORM e stripe para pagamentos</p>
        </div>
        {/* <ClientsTable /> */}
      </main>
  )
}


