import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Product } from "@prisma/client"

interface FormState {
    status: string,
    errors: object,
}

interface FormProductProps {
    formAction: any
    formState: FormState
    product?: Product | null
}

export default function FormProduct({ formAction, formState, product = null }: FormProductProps) {
    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                {product && (
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="id" className="text-right">
                            ID
                        </Label>
                        <Input
                            id="idProduct"
                            name="idProduct"
                            placeholder="XXX"
                            className="col-span-3 bg-slate-50 pointer-events-none select-none"
                            defaultValue={ product.id }
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
                        placeholder="Pen drive"
                        className="col-span-3"
                        {...(product && { defaultValue: product.name })} // propriedade defaultValue só existe se for edição
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
                        {...(product && { defaultValue: product.price.toString()})}
                    />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                        Estoque
                    </Label>
                    <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        step="1"
                        placeholder="5"
                        className="col-span-3"
                        {...(product && { defaultValue: product.stock || 0})}
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
                        placeholder="Produto feita com alta qualidade"
                        className="col-span-3"
                        {...(product && { defaultValue: product.description || '' })}
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
