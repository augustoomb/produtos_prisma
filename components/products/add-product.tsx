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
import { toast } from "sonner"
import { useFormState } from "react-dom"
import { createProduct } from "@/actions/product"
import { useState } from "react"

export default function AddProduct() {

    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await createProduct(prevState, formData);

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
                    <DialogDescription>
                        Adicionar um novo produto
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Fone de ouvido"
                                className="col-span-3"
                            />                            
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">
                                Preço
                            </Label>
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                placeholder={ `R$ 0,00` }
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Descrição
                            </Label>
                            <Input
                                id="description"
                                name="description"
                                type="text"
                                placeholder="Produto feito com ..."
                                className="col-span-3"
                                
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col">
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button type="submit">Salvar</Button>                                             
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
            </DialogContent>
        </Dialog>
    )
  }
  