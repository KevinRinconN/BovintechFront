"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { ImgAvatar } from "@/components/img-avatar";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { cn, getDay, getMonth, getYear } from "@/lib/utils";
import { getBirthByCattle, saveNewBirth, saveRecordBirth } from "@/services/bovine.service";
import { BirthRecord } from "@/types/bovine.types";
import { addDays, startOfToday } from "date-fns";
import { useEffect, useState } from "react";
import { BirthRecordDialog } from "../../../../../components/birth-record-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { z } from "zod";
import { BirthRecordFormSchema } from "../../../../../components/birth-record-form";
import { NewBirthDialog } from "../../../../../components/new-birth-dialog";
import { NewBirthFormSchema } from "../../../../../components/new-birth-form";

type Event = {
  date: Date;
  type: "insemination" | "estimatedDateBirth";
  details: string;
};

const eventTypes = {
  insemination: { color: "bg-[#cccccc]", label: "Insemination" },
  estimatedDateBirth: { color: "bg-[#ffd2a4]", label: "Expected Birthing" },
};

// Sample events data

export const BirthSection = ({ cattle }: { cattle: string }) => {
  const [open, setOpen] = useState(false);
  const [openNew, setOpenNew] = useState(false);
  const [birth, setBirth] = useState<BirthRecord | undefined>();

  const loadRecords = async () => {
    if (cattle !== undefined) {
      try {
        const { data } = await getBirthByCattle(cattle);
        setBirth(data);
      } catch (error) {
        return <div></div>;
      }
    }
  };
  let events: Event[];
  if (birth?.birth?.inseminationDate) {
    events = [
      {
        date: new Date(birth?.birth.inseminationDate),
        type: "insemination",
        details: "Cow #5678 Breeding Attempt",
      },
      {
        date: new Date(birth?.estimatedDateBirth),
        type: "estimatedDateBirth",
        details: "Cow #9101 Expected Calving",
      },
    ];
  }

  const dayHasEvent = (day: Date) => {
    return events.some(
      (event) => event.date.toDateString() === day.toDateString()
    );
  };

  const getEventForDay = (day: Date) => {
    return events.find(
      (event) => event.date.toDateString() === day.toDateString()
    );
  };

  useEffect(() => {
    loadRecords();
  }, [cattle]);

  const onSubmit = (data: z.infer<typeof BirthRecordFormSchema>) => {
    setOpen(false);
    console.log(data);
    birth?.birth.id &&
      toast.promise(
        saveRecordBirth(
          birth?.birth.id,
          data.brand,
          data.gender,
          data.breed,
          data.distinctiveTrait,
          data.birthDate,
          data.weight,
          data.files[0]
        ),
        {
          loading: "Loading...",
          success: () => {
            console.log(data);
            loadRecords();
            return `El parto ha sido registrado`;
          },
          error: (error) => `${error}`,
        }
      );
  };

  const onSubmitNew = (data: z.infer<typeof NewBirthFormSchema>) => {
    setOpenNew(false);
    console.log(data);
      toast.promise(saveNewBirth(cattle, data.insemination_date, data.IdSire), {
        loading: "Loading...",
        success: () => {
          console.log(data);
          loadRecords();
          return `El parto ha sido creado`;
        },
        error: (error) => `${error}`,
      });
  };

  return (
    <section>
      <h3 className="flex gap-x-2 items-center text-muted-foreground mb-4">
        <IconWrapper icon="album" strokeWidth="bold" /> Registro de parto
      </h3>
      <article className="grid grid-cols-1 space-y-2 md:space-y-0 md:grid-cols-3 gap-x-6">
        <Card className="flex items-center justify-center gap-x-4">
          <div className="flex items-center justify-center bg-[#abdfbf] rounded-lg w-24 h-24">
            <span className="text-white text-4xl font-medium">
              {birth?.offspring}
            </span>
          </div>
          <div className="flex-1">
            <h4>Hijos</h4>
            <p className="text-xs text-muted-foreground">
              Cantidad total de crías vivas nacidas de este bovino
            </p>
          </div>
        </Card>
        <Card className="flex items-center justify-center gap-x-4">
          <div className="flex items-center justify-center bg-[#ffa4a4] rounded-lg w-24 h-24">
            <span className="text-white text-4xl font-medium">
              {birth?.abortions}
            </span>
          </div>
          <div className="flex-1">
            <h4>Abortos</h4>
            <p className="text-xs text-muted-foreground">
              Cantidad total de abortos registrados
            </p>
          </div>
        </Card>
        <Card className="flex items-center justify-center gap-x-4 pr-2">
          <div className="flex items-center justify-center bg-[#a4caff] rounded-lg w-24 h-24">
            <div className="flex flex-col justify-center items-center">
              <span className="text-[#385978]">
                {birth?.lastBirth && getMonth(new Date(birth?.lastBirth))}
              </span>
              <span className="text-white text-4xl font-medium">
                {birth?.lastBirth ? getDay(new Date(birth?.lastBirth)): "0"}
              </span>
              <span className="text-[#385978] text-xs font-medium">
                {birth?.lastBirth && getYear(new Date(birth?.lastBirth))}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <h4>Último Parto</h4>
            <p className="text-xs text-muted-foreground">
              fecha en la que ocurrió el último parto
            </p>
          </div>
        </Card>
      </article>

      {birth?.birth ? (
        <article className="mt-4">
          <h3 className="text-muted-foreground mb-2">Segumiento de parto</h3>
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row gap-x-4">
            <Card className="h-fit w-fit mx-auto">
              <Calendar
                mode="single"
                className="rounded-md border shadow w-full"
                components={{
                  DayContent: ({ date }) => (
                    <div
                      className={cn(
                        "relative w-full h-full flex items-center justify-center rounded-lg",
                        dayHasEvent(date) &&
                          eventTypes[getEventForDay(date)!.type].color
                      )}
                    >
                      {date.getDate()}
                    </div>
                  ),
                }}
              />
            </Card>
            <div className="flex flex-1 flex-col items-center space-y-2">
              <Card className="flex items-center justify-center gap-x-4 pr-2">
                <div className="flex items-center justify-center bg-[#cccccc] rounded-lg w-24 h-24">
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-[#848484]">
                      {birth?.birth.inseminationDate &&
                        getMonth(new Date(birth?.birth.inseminationDate))}
                    </span>
                    <span className="text-white text-4xl font-medium">
                      {birth?.birth.inseminationDate &&
                        getDay(new Date(birth?.birth.inseminationDate))}
                    </span>
                    <span className="text-[#848484] text-xs font-medium">
                      {birth?.birth.inseminationDate &&
                        getYear(new Date(birth?.birth.inseminationDate))}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4>Fecha de inseminacion</h4>
                  <p className="text-sm text-muted-foreground">
                    Fecha en la que se realizó la inseminación de la vaca.
                  </p>
                </div>
              </Card>
              <Card className="flex items-center justify-center col-span-2 gap-x-4 pr-2">
                <div className="flex items-center justify-center bg-[#ffd2a4] rounded-lg w-24 h-24">
                  <div className="flex flex-col justify-center items-center">
                    <span className="text-[#785038] text-lg">
                      {birth?.estimatedDateBirth &&
                        getMonth(new Date(birth?.estimatedDateBirth))}
                    </span>{" "}
                    <span className="text-white text-4xl font-medium">
                      {birth?.estimatedDateBirth &&
                        getDay(new Date(birth?.estimatedDateBirth))}
                    </span>
                    <span className="text-[#785038] text-xs font-medium">
                      {birth?.estimatedDateBirth &&
                        getYear(new Date(birth?.estimatedDateBirth))}
                    </span>
                  </div>
                </div>
                <div className="flex-1">
                  <h4>Fecha de Parto</h4>
                  <p className="text-sm text-muted-foreground">
                    Estimación de la fecha en que la vaca podría dar a luz
                  </p>
                </div>
              </Card>
              <div>
                <BirthRecordDialog
                  open={open}
                  setOpen={setOpen}
                  onSubmit={onSubmit}
                >
                  <Button
                    className="text-muted-foreground w-fit rounded-full px-8 mt-4"
                    variant="secondary"
                  >
                    Finalizar parto
                  </Button>
                </BirthRecordDialog>
              </div>
            </div>
            <Card className="flex border flex-col items-center py-10 w-full max-w-72 mx-auto">
              <span className="mb-8">Padre del bovino</span>
              <ImgAvatar
                className="w-28 h-28"
                lastWeightImage={birth?.birth.sire.lastWeightImage}
              />
              <p className="text-xl mt-6">{birth?.birth.sire.brand}</p>
              <p className="text-sm">{birth?.birth.sire.breed}</p>
            </Card>
          </div>
        </article>
      ) : (
        <article className="w-full flex items-center justify-center">
          <NewBirthDialog
            open={openNew}
            setOpen={setOpenNew}
            onSubmit={onSubmitNew}
          >
            <Button
              className="text-muted-foreground w-fit rounded-full px-8 mt-4"
              variant="secondary"
            >
              Registrar nuevo parto
            </Button>
          </NewBirthDialog>
        </article>
      )}
    </section>
  );
};
