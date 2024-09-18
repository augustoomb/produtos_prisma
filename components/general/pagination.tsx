import { Button } from "@/components/ui/button"
import { Table as ReactTable } from "@tanstack/react-table";

interface PaginationProps<TData> {
  table: ReactTable<TData>;
}
export default function Pagination<TData>({ table }: PaginationProps<TData>) {
  return (
      <div className="flex items-center justify-end space-x-2 py-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
      </div>              
  )
}
