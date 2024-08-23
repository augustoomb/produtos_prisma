import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { TagIcon, FilePenIcon, MoveVerticalIcon, ShareIcon, DeleteIcon } from "./icons"
import { Button } from "@/components/ui/button"
import { getClients }  from "@/actions/client"
// import prisma from '@/lib/prisma';
// import { Prisma, Client } from "@prisma/client";
export default async function ClientsTable() {

    const clients = await getClients();

    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>E-mail</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Telefone</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map((client, index) => (
              <TableRow key={index}>
                <TableCell>{ client.id }</TableCell>
                <TableCell>{ client.email }</TableCell>
                <TableCell>
                <TableCell>{ client.name }</TableCell>
                  {/* <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
                    <TagIcon className="w-4 h-4 inline-block mr-1" />
                    { client.name }
                  </span> */}
                </TableCell>
                <TableCell className="text-right">{ client.phone }</TableCell>
                <TableCell className="hidden md:block">
                  <Popover>
                    <PopoverTrigger>
                      <Button
                        type="button"
                        className="px-2 py-1 bg-transparent text-black hover:bg-gray-200 active:bg-gray-300 rounded"
                      >
                        <MoveVerticalIcon className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-40">
                      <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                        <FilePenIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                        <ShareIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Share</span>
                      </button>
                      <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                        <DeleteIcon className="w-4 h-4" />
                        <span className="text-sm font-medium">Delete</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
            </TableRow>
            ))}
          </TableBody>
        </Table>
    )
}