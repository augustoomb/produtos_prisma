import { Copy } from "lucide-react"

 
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

export default function AddClient() {
    return (
        <Dialog>
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
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome
                        </Label>
                        <Input
                            id="name"
                            defaultValue="Fulano de Tal"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                            E-mail
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            defaultValue="fulano@mail.com"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="telephone" className="text-right">
                            Telefone
                        </Label>
                        <Input
                            id="telephone"
                            type="text"
                            defaultValue="31 99999-9999"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                <Button type="submit">Salvar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
  }