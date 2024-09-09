import { Input } from "@/components/ui/input"
import { Table } from "@tanstack/react-table";
interface SearchInputProps<TData> {
    table: Table<TData>;
}

export default function SearchInput<TData>({ table }: SearchInputProps<TData>) {
    return(
        <div className="flex items-center py-4">
            <Input
            placeholder="Busque por nome de produto..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
            />
        </div>
    )
}
