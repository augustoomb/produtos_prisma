import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Service } from "@prisma/client"

interface FormState {
    status: string,
    errors: object,
}

interface FormServiceProps {
    formAction: any
    formState: FormState
    service?: Service | null
}

export default function FormService({ formAction, formState, service = null }: FormServiceProps) {
    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                {service && (
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="id" className="text-right">
                            ID
                        </Label>
                        <Input
                            id="idService"
                            name="idService"
                            placeholder="XXX"
                            className="col-span-3 bg-slate-50 pointer-events-none select-none"
                            defaultValue={ service.id }
                            readOnly
                        />                            
                    </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                        Nome
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Consultoria TI"
                        className="col-span-3"
                        {...(service && { defaultValue: service.name })} // propriedade defaultValue só existe se for edição
                    />                            
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                        Preço
                    </Label>
                    <Input
                        id="price"
                        name="price"
                        type="number"
                        placeholder="9.99"
                        className="col-span-3"
                        {...(service && { defaultValue: service.price.toString()})}
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
                        placeholder="Serviço de consultoria..."
                        className="col-span-3"
                        {...(service && { defaultValue: service.description || '' })}
                    />
                </div>
            </div>
            <DialogFooter className="flex flex-col">
                <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                </DialogClose>
                <Button value="saveButton" type="submit">Salvar</Button>                                             
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
