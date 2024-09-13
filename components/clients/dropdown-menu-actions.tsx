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

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Client } from "@prisma/client";
import { useFormState} from "react-dom"
import { deleteClient, updateClient } from "@/actions/client"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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

        // let result = {};
        const submitButton = formData.get("submitButton");

        if (submitButton === "deleteButton") {
            const result = await deleteClient(prevState, formData);

            if (result.status === "success") {
                setDialogIsOpen(false);
    
                toast.success("Cliente excluído", {
                    description: "Cliente foi excluído com sucesso",
                })
            }    
    
            return result;

        } else {
            const result = await updateClient(prevState, formData);

            if (result.status === "success") {
                setDialogIsOpen(false);
    
                toast.success("Cliente editado", {
                    description: "Cliente foi editado com sucesso",
                })
            }    
    
            return result;
        }
        
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
                            <Button variant={"destructive"} type="submit" name="submitButton" value="deleteButton">Confirmar</Button>
                        </DialogFooter>
                    </form>
                )
                : (
                    <form action={formAction}>
                        <DialogHeader className="mt-2 mb-4">
                            <DialogTitle className="">Editar cliente</DialogTitle>
                            <DialogDescription>
                                Edição de cliente cadastrado
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="id" className="text-right">
                                    ID
                                </Label>
                                <Input
                                    id="idClient"
                                    name="idClient"
                                    placeholder="XXX"
                                    className="col-span-3 bg-slate-50 pointer-events-none select-none"
                                    defaultValue={client.id}
                                    readOnly
                                    // disabled
                                />                            
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Nome
                                </Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Fulano de Tal"
                                    className="col-span-3"
                                    defaultValue={client.name}
                                />                            
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">
                                    E-mail
                                </Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="fulano@mail.com"
                                    className="col-span-3"
                                    defaultValue={client.email}
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">
                                    Telefone
                                </Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    type="text"
                                    placeholder="XX999998888"
                                    className="col-span-3"
                                    defaultValue={client.phone || ''}
                                />
                            </div>
                        </div>
                        <DialogFooter className="flex flex-col">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button type="submit" name="submitButton" value="editButton">Salvar</Button>                                             
                        </DialogFooter>        
                        <div className="text-sm text-red-500 text-center">
                                {formState.errors && (
                                    <>
                                        {Object.entries(formState.errors).map(([key, error]) => (
                                            error && <p key={key}>{String(error)}</p>
                                        ))}                                
                                    </>
                                )}
                        </div>
                    </form>
                )
            }
            </DialogContent>
        </Dialog>
    )
}