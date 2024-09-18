import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Trash2 } from "lucide-react"

// interface MultipleDeleteButtonProps {
//     dialogIsOpen: boolean
//     setDialogIsOpen: (value: boolean) => void;
//     handleDelete: () => Promise<void> | void;
//     selectedIds: number[]
// }

export default function MultipleDeleteButton(props:any) {
    return(
        <Dialog open={props.dialogIsOpen} onOpenChange={props.setDialogIsOpen}>
            <DialogTrigger hidden={props.selectedIds.length === 0}><Trash2 className="w-4 h-4" /></DialogTrigger>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Apagar os itens selecionados?</DialogTitle>
                <DialogDescription>
                    Essa ação não pode ser desfeita.
                </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                    <Button type="button" variant="outline">
                        Cancelar
                    </Button>
                    </DialogClose>
                    <Button variant={"destructive"} onClick={props.handleDelete}>Confirmar</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}