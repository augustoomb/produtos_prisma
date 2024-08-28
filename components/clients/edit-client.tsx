'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { TagIcon, FilePenIcon, EllipsisIcon, DeleteIcon } from "./icons";
import { toast } from "sonner"
import { useFormState, useFormStatus } from "react-dom"
import { createClient, deleteCliente } from "@/actions/client"
import { useState } from "react"
import { Client } from "@prisma/client";

export default function EditClient({ client }: {client: Client}) {

    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await deleteCliente(prevState, formData);

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success("Cliente excluído", {
                description: "Cliente foi excluído com sucesso",
            })
        }


        return result;
    }, formInitialState);

    return (            
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
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
                <form action={formAction}>
                    <DialogHeader className="mt-2 mb-4">
                        <DialogTitle className="text-red-500">Apagar cliente?</DialogTitle>
                        <DialogDescription>
                            { `Tem certeza que deseja apagar o cliente ${client.name}? Essa ação não pode ser desfeita.` }
                        </DialogDescription>
                    </DialogHeader>

                    <input value={client.id} name="id" readOnly hidden/>
                        
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
        </Dialog>
    )
  }
  