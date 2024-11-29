"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn, formatDate } from "@/lib/utils";
import {
  getRecordsByCattleId,
  saveRecordByCattle,
} from "@/services/bovine.service";
import { Records } from "@/types/bovine.types";
import { useEffect, useState } from "react";
import { RecordDialog } from "./record-save-dialog";
import { toast } from "sonner";
import { RecordFormSchema } from "./record-form";
import { z } from "zod";

export const RecordToCattle = ({
  cattle,
  className,
}: {
  cattle: string;
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  const [records, setRecords] = useState<Records[] | undefined>();

  const loadRecords = async () => {
    if (cattle !== undefined) {
      const { data } = await getRecordsByCattleId(cattle);
      setRecords(data);
    }
  };

  useEffect(() => {
    loadRecords();
  }, [cattle]);

  const onSubmit = (data: z.infer<typeof RecordFormSchema>) => {
    setOpen(false);
    toast.promise(
      saveRecordByCattle(cattle, data.dateOfRecord, data.weight, data.files[0]),
      {
        loading: "Loading...",
        success: () => {
          console.log(data);
          loadRecords();
          return `El registro ha sido creado`;
        },
        error: (error) => `${error}`,
      }
    );
  };

  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem className={cn("md:basis-1/2 lg:basis-1/3 ", className)}>
          <div className="p-1">
            <RecordDialog open={open} setOpen={setOpen} onSubmit={onSubmit}>
              <Button
                className="flex h-40 md:h-52 items-center justify-center p-6 cursor-pointer"
                asChild
                variant="ghost"
              >
                <Card>
                  <IconWrapper
                    icon="plus"
                    className="w-10 h-10 text-muted-foreground"
                  />
                </Card>
              </Button>
            </RecordDialog>
          </div>
        </CarouselItem>
        {records &&
          records.map((record, index) => (
            <CarouselItem
              key={index}
              className={cn("md:basis-1/2 lg:basis-1/3 ", className)}
            >
              <div className="">
                <Card className="relative flex h-40 md:h-52 items-center justify-center overflow-hidden">
                  <img
                    src={record.img}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 bg-white p-2 px-4 rounded-lg shadow-lg">
                    <p className="text-xs font-semibold">{record.weight} Kg</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(record.dateOfRecord)}
                    </p>
                  </div>
                </Card>
              </div>
            </CarouselItem>
          ))}
      </CarouselContent>
    </Carousel>
  );
};
