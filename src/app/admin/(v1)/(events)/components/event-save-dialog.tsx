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
import { toast } from "sonner";
import { saveRecordByCattle } from "@/services/bovine.service";
import { EventForm, EventFormSchema } from "./events-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createEvent } from "../services/event.service";
import { formToCreateEvent } from "../adapters/event.adapter";

interface Props {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  onSubmit?: (data: z.infer<typeof EventFormSchema>) => void;
  children?: React.ReactNode;
}

export const EventSaveDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const onSubmit = (data: z.infer<typeof EventFormSchema>) => {
    setOpen(false);
    toast.promise(createEvent(formToCreateEvent(data)), {
      loading: "Loading...",
      success: () => {
        router.refresh(); // Recarga la página
        return `El Evento ha sido creado`;
      },
      error: (error) => `${error}`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg p-10 max-h-screen overflow-y-scroll ">
        <DialogHeader>
          <DialogTitle className="text-2xl">Crear nuevo evento</DialogTitle>
          <DialogDescription>
            Completa los detalles para programar un nuevo evento 🗓️.
          </DialogDescription>
        </DialogHeader>
        <Separator className="my-2" />
        <EventForm onSubmit={onSubmit}>
          <div className="flex justify-end space-x-2 mt-12">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </DialogClose>
            <Button>Crear</Button>
          </div>
        </EventForm>
      </DialogContent>
    </Dialog>
  );
};
