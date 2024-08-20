import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { TagIcon, FilePenIcon, MoveVerticalIcon, ShareIcon, DeleteIcon } from "./icons"
import { Button } from "@/components/ui/button"
export default function ClientsTable() {

    const dataTeste = [
        { date: "Mar 12", description: "WeWork", category: "Office", amount: "$175.00" },
        { date: "Mar 13", description: "WeWork", category: "Office", amount: "$175.00" },
        { date: "Mar 14", description: "WeWork", category: "Office", amount: "$175.00" },
        { date: "Mar 15", description: "WeWork", category: "Office", amount: "$175.00" },
        { date: "Mar 16", description: "WeWork", category: "Office", amount: "$175.00" },
    ]

    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataTeste.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{ item.date }</TableCell>
                <TableCell>{ item.description }</TableCell>
                <TableCell>
                  <span className="px-2 py-1 bg-red-200 text-red-800 rounded-md">
                    <TagIcon className="w-4 h-4 inline-block mr-1" />
                    { item.category }
                  </span>
                </TableCell>
                <TableCell className="text-right">R${item.amount}</TableCell>
                <TableCell>
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