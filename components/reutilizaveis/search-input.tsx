import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table";
interface SearchInputProps<TData> {
    table: Table<TData>;
    searchAttribute: string
}

export default function SearchInput<TData>({ table, searchAttribute }: SearchInputProps<TData>) {
    return(
        <div className="flex items-center py-4">
            <Input
            placeholder={ `Busque por ${ searchAttribute }...` }
            value={(table.getColumn(`${searchAttribute}`)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn(`${searchAttribute}`)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
        </div>
    )
}
