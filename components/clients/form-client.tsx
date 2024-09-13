import { DialogClose, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function FormClient({ formAction, formState, client = null }: any) {
    return (
        <form action={formAction}>
            <div className="grid gap-4 py-4">
                {client && (
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="id" className="text-right">
                            ID
                        </Label>
                        <Input
                            id="idClient"
                            name="idClient"
                            placeholder="XXX"
                            className="col-span-3 bg-slate-50 pointer-events-none select-none"
                            defaultValue={ client.id }
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
                        placeholder="Fulano de Tal"
                        className="col-span-3"
                        {...(client && { defaultValue: client.name })} // propriedade defaultValue só existe se for edição
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
                        {...(client && { defaultValue: client.email })}
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
                        {...(client && { defaultValue: client.phone || '' })}
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
