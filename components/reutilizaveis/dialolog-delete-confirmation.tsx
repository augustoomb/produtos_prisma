import {
    DialogClose,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

export default function DialogDeleteConfirmation({ formAction, id }:any) {
    return(
        <form action={formAction}>
            <DialogHeader className="mt-2 mb-4">
                <DialogTitle className="text-red-500">Apagar item?</DialogTitle>
                <DialogDescription>
                    { `Tem certeza que deseja apagar o item selecionado? Essa ação não pode ser desfeita.` }
                </DialogDescription>
            </DialogHeader>

            <input value={id} name="id" readOnly hidden />
                
            <DialogFooter>
                <DialogClose asChild>
                <Button type="button" variant="outline">
                    Cancelar
                </Button>
                </DialogClose>
                <Button variant={"destructive"} type="submit" name="submitButton" value="deleteButton">Confirmar</Button>
            </DialogFooter>
        </form>
    )
}