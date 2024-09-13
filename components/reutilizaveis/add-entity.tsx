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
import { useState } from "react"

type FormField = {
    id: string;
    name: string;
    label: string;
    type: string;
    placeholder: string;
};

interface AddEntityProps {
    title: string;
    description: string;
    fields: FormField[];
    createEntity: (formData: FormData) => Promise<any>;
}

export default function AddEntity({ title, description, fields, createEntity }: AddEntityProps) {

    const formInitialState = {
        status: "",
        errors: {},
    };

    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    const [formState, formAction] = useFormState(async (prevState: any, formData: FormData) => {
        const result = await createEntity(formData);

        if (result.status === "success") {
            setDialogIsOpen(false);

            toast.success(`${title} salvo`, {
                description: `${title} foi salvo com sucesso`,
            });
        }


        return result;
    }, formInitialState);


    return (        
      <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
            <DialogTrigger asChild>
                <Button className="px-4 py-1 bg-gray-800 text-white rounded-lg flex items-center space-x-2 text-sm">{ `+ ${title}` }</Button>                
            </DialogTrigger>            
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Novo {title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <form action={formAction}>
                    <div className="grid gap-4 py-4">
                        {fields.map((field) => (
                            <div key={field.id} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={field.id} className="text-right">
                                    {field.label}
                                </Label>
                                <Input
                                    id={field.id}
                                    name={field.name}
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    className="col-span-3"
                                />
                            </div>
                        ))}
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
  