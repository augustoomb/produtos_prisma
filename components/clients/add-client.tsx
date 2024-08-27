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
import { useFormState, useFormStatus } from "react-dom"
import { createClient } from "@/actions/client"
import { useState } from "react"
import { revalidatePath } from 'next/cache';

export default function AddClient() {

    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    // const [formState, formAction] = useFormState(createClient, formInitialState);

    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await createClient(prevState, formData);

        // console.log(result);

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success("Cliente salvo", {
                description: "Cliente foi salvo com sucesso",
                
                // action: {
                //   label: "Undo",
                //   onClick: () => console.log("Undo"),
                // },
            })
        }


        return result;
    }, formInitialState);


    return (        
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="px-4 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm">+ Cliente</Button>                
            </DialogTrigger>            
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo Cliente</DialogTitle>
                    <DialogDescription>
                        Adicionar um novo cliente
                    </DialogDescription>
                </DialogHeader>
                <form action={formAction}
                    // onSubmit={() => {
                    //     setDialogIsOpen(false)
                    // }}
                >
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Nome
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="Fulano de Tal"
                                className="col-span-3"
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
                                
                            />
                        </div>
                    </div>
                    <DialogFooter className="flex flex-col">
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
  