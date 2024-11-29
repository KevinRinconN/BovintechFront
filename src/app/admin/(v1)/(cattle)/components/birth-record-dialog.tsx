import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { RecordForm, RecordFormSchema } from "./record-form";
import { z } from "zod";
import { toast } from "sonner";
import { saveRecordByCattle } from "@/services/bovine.service";
import { BirthRecordForm, BirthRecordFormSchema } from "./birth-record-form";

interface Props {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSubmit?: (data: z.infer<typeof BirthRecordFormSchema>) => void;
  children?: React.ReactNode;
}

export const BirthRecordDialog = ({ open, setOpen, onSubmit, children }: Props) => {
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg overflow-auto max-h-screen">
        <DialogHeader>
          <DialogTitle className="text-2xl">Registra el parto</DialogTitle>
          <DialogDescription>
            Proporciona la información detallada sobre el parto del bovino para
            registrarlo. 😎
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <BirthRecordForm onSubmit={onSubmit}>
          <div className="flex justify-end space-x-2 mt-12">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button>Crear</Button>
          </div>
        </BirthRecordForm>
      </DialogContent>
    </Dialog>
  );
};
