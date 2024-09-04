"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
  } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import DropdownMenuActions from "./dropdown-menu-actions"

import { Client } from "@prisma/client";
import { toast } from "sonner"
import { deleteClients } from "@/actions/client"
import SearchInput from "./search-input"
import MultipleDeleteButton from "./multiple-delete-button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({columns, data}: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = React.useState<SortingState>([])

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

    const [rowSelection, setRowSelection] = React.useState({})

    const [selectedIds, setSelectedIds] = React.useState<number[]>([]); // Estado para armazenar os IDs selecionados

    const table = useReactTable({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onRowSelectionChange: setRowSelection,
      state: {
        sorting,
        columnFilters,
        rowSelection,
      },
    })

    // CONTROLAR SELEÇÃO DE MÚLTIPLAS LINHAS
    React.useEffect(() => {
      const selectedIds = table
        .getRowModel()
        .rows.filter(row => row.getIsSelected())
        .map(item => (item.original as Client).id);
    
      setSelectedIds(selectedIds);
    }, [rowSelection, table]);

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);


    const handleDelete = async () => {
      // Lógica para excluir vários registros selecionados

      const result =  await deleteClients(selectedIds)

      if(result.status === 'success') {
        table.resetRowSelection();
        setDialogIsOpen(false);
        setSelectedIds([])
        toast.success("Clientes excluídos", {
          description: "Clientes foram excluídos com sucesso",
        })
      }

    }; 

    return (
        <div>
          <div className="flex items-center justify-between">
            <SearchInput table={ table }/>
            <MultipleDeleteButton handleDelete={handleDelete} dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen} selectedIds={selectedIds} />            
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                      return (
                          <TableHead key={header.id}>
                          {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                          </TableHead>
                      )
                      })}
                  </TableRow>
                  ))}
              </TableHeader>
              <TableBody>
                  {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                      const client = row.original as Client;

                      return(
                      <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      >
                          {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                              </TableCell>
                          ))}

                          {/* actions */}
                          <TableCell>
                            <DropdownMenuActions client={ client }/>                            
                          </TableCell>

                      </TableRow>)
})
                  ) : (
                  <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                      Sem clientes cadastrados.
                      </TableCell>
                  </TableRow>
                  )}
              </TableBody>
            </Table>

            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
            </div>

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
      </div>
    </div>
    )
  }
