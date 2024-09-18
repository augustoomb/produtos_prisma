'use client' 

import { 
    Dialog, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

import { toast } from "sonner"
import { useFormState } from "react-dom"
import { useState } from "react"
import { createProduct } from "@/actions/product"
import FormProduct from "./form-product"
import { Button } from "@/components/ui/button"
export default function AddProduct() {
    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await createProduct(formData);

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success("Produto salvo", {
                description: "Produto foi salvo com sucesso",
            })
        }

        return result;
    }, formInitialState);

    return (        
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="px-4 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm">+ Produto</Button>                
            </DialogTrigger>            
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Produto</DialogTitle>
                    <DialogDescription>Adicionar um novo Produto</DialogDescription>
                </DialogHeader>
                <FormProduct formAction={formAction} formState={formState} />
            </DialogContent>
        </Dialog>
    )
  }
  