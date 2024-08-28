import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TagIcon, FilePenIcon, EllipsisIcon, DeleteIcon } from "./icons";
import { Button } from "@/components/ui/button";
import { getClients } from "@/actions/client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose, DialogFooter } from "@/components/ui/dialog";
// import DeleteClient from "./delete-client";
import { deleteCliente } from "@/actions/client"
import { Client } from "@prisma/client";
import { useState } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"
import EditClient from "./edit-client";

export default async function ClientsTable() {
    const clients: Client[] = await getClients();

    // const formInitialState = {
    //     status: "",
    //     errors: {},
    // };

    // const [dialogIsOpen, setDialogIsOpen] = useState(false);

    // const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    //     const result = await deleteCliente(prevState, formData);

    //     if (result.status === "success") {
    //         setDialogIsOpen(false);

    //         toast.success("Cliente excluído", {
    //             description: "Cliente foi excluído com sucesso",
    //         })
    //     }


    //     return result;
    // }, formInitialState);

    
    return (
        <Table >
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
                        <TableCell>{client.id}</TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell className="text-right">{client.phone}</TableCell>
                        <TableCell className="hidden md:block">
                            <EditClient client={client}/>
                            {/* <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            type="button"
                                            className="px-2 py-1 bg-transparent text-black hover:bg-gray-200 active:bg-gray-300 rounded"
                                        >
                                            <EllipsisIcon className="w-4 h-4" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40">
                                        <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                                            <FilePenIcon className="w-4 h-4" />
                                            <span className="text-sm font-medium">Editar</span>
                                        </button>
                                        <DialogTrigger asChild>
                                            <button className="w-full flex items-center space-x-2 hover:bg-gray-200 active:bg-gray-300 py-2 px-2 rounded-lg text-gray-500">
                                                <DeleteIcon className="w-4 h-4" />
                                                <span className="text-sm font-medium">Excluir</span>
                                            </button>
                                        </DialogTrigger>
                                    </PopoverContent>
                                </Popover>
                                <DialogContent className="sm:max-w-[425px]">
                                    <form action={ formAction }>
                                        <DialogHeader className="mt-2 mb-4">
                                            <DialogTitle className="text-red-500">Apagar cliente?</DialogTitle>
                                            <DialogDescription>
                                                { `Tem certeza que deseja apagar o cliente ${client.name}? Essa ação não pode ser desfeita.` }
                                            </DialogDescription>
                                        </DialogHeader>

                                        <input value={client.id}/>
                                            
                                        <DialogFooter>
                                            <DialogClose asChild>
                                            <Button type="button" variant="outline">
                                                Cancelar
                                            </Button>
                                            </DialogClose>
                                            <Button variant={"destructive"} type="submit">Confirmar</Button>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog> */}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
