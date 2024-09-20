'use client' 

import { 
    Dialog, DialogContent, DialogDescription,
    DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog"

import { toast } from "sonner"
import { useFormState } from "react-dom"
import { useState } from "react"
import { createService } from "@/actions/service"
import FormService from "./form-service"
import { Button } from "@/components/ui/button"
export default function AddService() {
    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await createService(formData);

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success("Serviço salvo", {
                description: "Serviço foi salvo com sucesso",
            })
        }

        return result;
    }, formInitialState);

    return (        
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="px-4 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm">+ Serviço</Button>                
            </DialogTrigger>            
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Serviço</DialogTitle>
                    <DialogDescription>Adicionar um novo Serviço</DialogDescription>
                </DialogHeader>
                <FormService formAction={formAction} formState={formState} />
            </DialogContent>
        </Dialog>
    )
  }
  