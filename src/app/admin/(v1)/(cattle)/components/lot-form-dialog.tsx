"use client";
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
import { z } from "zod";
import { LotCattleForm, LotCattleFormSchema } from "./lot-form";
import { useState } from "react";
import { toast } from "sonner";
import { createLot } from "@/services/bovine.service";
import { useRouter } from "next/navigation";

interface Props {
  children?: React.ReactNode;
}

export const LotCattleFormDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof LotCattleFormSchema>) => {
    setOpen(false);
    toast.promise(createLot(data.name, data.description, data.operator), {
      loading: "Loading...",
      success: () => {
        router.refresh(); // Recarga la página
        return `El Lote ha sido creado`;
      },
      error: (error) => `${error}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg md:p-10 overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear un nuevo lote</DialogTitle>
          <DialogDescription>
            Proporciona la información detallada sobre el lote para administrar
            tu ganado. 😎
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <LotCattleForm onSubmit={onSubmit}>
          <div className="flex justify-end space-x-2 mt-12">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button>Crear</Button>
          </div>
        </LotCattleForm>
      </DialogContent>
    </Dialog>
  );
};
