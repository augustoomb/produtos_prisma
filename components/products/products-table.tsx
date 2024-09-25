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

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import DropdownMenuActions from "./dropdown-menu-actions"
import { Product } from "@prisma/client";
import { toast } from "sonner"
import { deleteProducts } from "@/actions/product"
import SearchInput from "@/components/general/search-input"
import MultipleDeleteButton from "@/components/general/multiple-delete-button"
import Pagination from "@/components/general/pagination"

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
        .map(item => (item.original as Product).id);
    
      setSelectedIds(selectedIds);
    }, [rowSelection, table]);

    const [dialogIsOpen, setDialogIsOpen] = React.useState(false);


    const handleDelete = async () => {
      // Lógica para excluir vários registros selecionados

      const result =  await deleteProducts(selectedIds)

      if(result.status === 'success') {
        table.resetRowSelection();
        setDialogIsOpen(false);
        setSelectedIds([])
        toast.success("Produtos excluídos", {
          description: "Produtos foram excluídos com sucesso",
        })
      }

    }; 

    return (
        <div>
          <div className="flex items-center justify-between">
            <SearchInput table={ table } searchAttribute="name" searchAttributeText="nome"/>
            <MultipleDeleteButton handleDelete={handleDelete} dialogIsOpen={dialogIsOpen} setDialogIsOpen={setDialogIsOpen} selectedIds={selectedIds} />            
          </div>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header, index) => {
                      return (
                          <TableHead key={header.id} className={index === 0 ? "px-4" : "px-0"}>
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
                      const produt = row.original as Product;

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
                            <DropdownMenuActions product={ produt }/>                            
                          </TableCell>

                      </TableRow>)
})
                  ) : (
                  <TableRow>
                      <TableCell colSpan={columns.length} className="h-24 text-center">
                        Sem produtos cadastrados.
                      </TableCell>
                  </TableRow>
                  )}
              </TableBody>
            </Table>

            <div className="flex-1 text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
            </div>

            <Pagination table={ table } />           
      </div>
    </div>
    )
  }
