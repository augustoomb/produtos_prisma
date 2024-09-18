import {
    Dialog,
    DialogContent,
    DialogDescription,
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
import { Product } from "@prisma/client";
import { useFormState} from "react-dom"
import { deleteProduct, updateProduct } from "@/actions/product"
import { toast } from "sonner" 
import FormProduct from "./form-product"
import DialogDeleteConfirmation from "@/components/general/dialolog-delete-confirmation"

export default function DropdownMenuActions({ product }: {product: Product}) {

    // PARA UTILIZAR DOIS DIALOGS NO MESMO DROPDOWN
    enum Dialogs {
        dialog1 = 'dialog1',
        dialog2 = 'dialog2',
    }  
    const [dialog, setDialog] = useState('')

    // DELETE PRODUCT
    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        
        const submitButton = formData.get("submitButton");
        const textMessage = submitButton === "deleteButton" ? "excluído" : "editado";

        let result;

        if(submitButton === "deleteButton") {
            result = await deleteProduct(prevState, formData);
        } else {
            result = await updateProduct(prevState, formData);
        }

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success(`Produto ${ textMessage }`, {
                description: `Produto foi ${ textMessage } com sucesso`,
            })
        } 

        return result;
        
    }, formInitialState);

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
                        <DialogDeleteConfirmation formAction={ formAction } id={product.id} />
                    )
                    : (                   
                        <>
                            <DialogHeader className="mt-2 mb-4">
                                <DialogTitle className="">Editar Produto</DialogTitle>
                                <DialogDescription>
                                    Edição de produto cadastrado
                                </DialogDescription>
                            </DialogHeader>

                            <FormProduct formAction={formAction} formState={formState} product={product}/>
                        </>
                    )
                }
            </DialogContent>            
        </Dialog>
    )
}