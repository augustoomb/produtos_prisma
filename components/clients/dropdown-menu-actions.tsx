import {
    // Dialog,
    DialogClose,
    // DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    // DialogTrigger,
  } from "@/components/ui/dialog"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"

import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { useState } from "react"

import { Client } from "@prisma/client";

import { useFormState} from "react-dom"

import { deleteClient } from "@/actions/client"

import { toast } from "sonner"

export function Dialog2() {
    return (
        <>
            <DialogHeader>
                <DialogTitle>Dialog 2</DialogTitle>
                <DialogDescription>
                    2This action cannot be undone. This will permanently delete your account
                    and remove your data from our servers.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                <Button type="button" variant="outline">
                    Cancelar
                </Button>
                </DialogClose>
                <Button variant={"destructive"} type="submit">Confirmar</Button>
            </DialogFooter>
        </>
    )
}

export default function DropdownMenuActions({ client }: {client: Client}) {

    // PARA UTILIZAR DOIS DIALOGS NO MESMO DROPDOWN
    enum Dialogs {
        dialog1 = 'dialog1',
        dialog2 = 'dialog2',
    }  
    const [dialog, setDialog] = useState('')


    // DELETE CLIENT
    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await deleteClient(prevState, formData);

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success("Cliente excluído", {
                description: "Cliente foi excluído com sucesso",
            })
        }


        return result;
    }, formInitialState);


    // COMPONENT
    return(
        <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DialogTrigger
                    asChild
                    onClick={() => {
                        setDialog(Dialogs.dialog1)
                    }}
                    >
                        <DropdownMenuItem>Excluir</DropdownMenuItem>
                    </DialogTrigger>
                    <DialogTrigger
                    asChild
                    onClick={() => {
                        setDialog(Dialogs.dialog2)
                    }}
                    >
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
            <DialogContent>
            {dialog === Dialogs.dialog1
                ? (
                    <form action={formAction}>
                        <DialogHeader className="mt-2 mb-4">
                            <DialogTitle className="text-red-500">Apagar cliente?</DialogTitle>
                            <DialogDescription>
                                { `Tem certeza que deseja apagar o cliente ${client.name}? Essa ação não pode ser desfeita.` }
                            </DialogDescription>
                        </DialogHeader>

                        <input value={client.id} name="id" readOnly hidden />
                            
                        <DialogFooter>
                            <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                            </DialogClose>
                            <Button variant={"destructive"} type="submit">Confirmar</Button>
                        </DialogFooter>
                    </form>
                )
                : <Dialog2 />
            }
            </DialogContent>
        </Dialog>
    )
}