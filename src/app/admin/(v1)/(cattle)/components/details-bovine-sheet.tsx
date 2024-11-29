"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { ImgAvatar } from "@/components/img-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { formatDate, getMonthDate, getSex } from "@/lib/utils";
import { getCattleById } from "@/services/bovine.service";
import { DetailsBovine } from "@/types/bovine.types";
import React, { createContext, useContext, useEffect, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { RecordToCattle } from "./record-to-bovine";
import { useRouter } from "next/navigation";

type CattleSheetStore = {
  cattle?: string;
  open?: boolean;
  setCattle(cattle: string): void;
  setOpen(open: boolean): void;
};

const CattleSheetContext = createContext<
  StoreApi<CattleSheetStore> | undefined
>(undefined);

type CattleProps = {
  children: React.ReactNode;
  initialCattle?: string;
  initialOpen?: boolean;
};

const CattleSheetProvider = ({
  initialCattle,
  initialOpen,
  children,
}: CattleProps) => {
  const [store] = useState(() =>
    createStore<CattleSheetStore>((set) => ({
      cattle: initialCattle,
      open: initialOpen,
      setCattle: (cattle: string) => set({ cattle }),
      setOpen: (open: boolean) => set({ open }),
    }))
  );

  return (
    <CattleSheetContext.Provider value={store}>
      {children}
    </CattleSheetContext.Provider>
  );
};

export function useCattleSheetStore<T>(
  selector: (state: CattleSheetStore) => T
) {
  const context = useContext(CattleSheetContext);

  if (!context) {
    throw new Error(
      "useCattleSheetStore must be used within a <DetailsCattle />"
    );
  }

  return useStore(context, selector);
}

export const DetailsCattle = ({
  initialOpen = false,
  initialCattle,
  children,
}: CattleProps) => {
  return (
    <CattleSheetProvider
      initialOpen={initialOpen}
      initialCattle={initialCattle}
    >
      {children}
    </CattleSheetProvider>
  );
};

export const DetailsCattleSheet = () => {
  const open = useCattleSheetStore((state) => state.open);
  const setOpen = useCattleSheetStore((state) => state.setOpen);

  const cattle = useCattleSheetStore((state) => state.cattle);

  const [cattleData, setCattleData] = useState<DetailsBovine | undefined>();

  useEffect(() => {
    const getData = async () => {
      if (cattle !== undefined) {
        const { data } = await getCattleById(Number(cattle));
        setCattleData(data);
      }
    };

    getData();
  }, [cattle]);

  const router = useRouter();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col p-0 w-11/12 sm:max-w-xl z-[100]">
        <div className="bg-[#b3dab3]">
          <SheetHeader className="flex flex-col space-y-4 ">
            <div className="flex w-full justify-between items-start px-4 md:px-8 pt-6">
              <div className="flex gap-x-4 items-center">
                <ImgAvatar
                  className="w-16 h-16 md:w-24 md:h-24 rounded-lg"
                  lastWeightImage={cattleData?.lastWeightImage}
                />
                <div className="text-start">
                  <SheetTitle className="text-xl md:text-3xl font-semibold text-[#121312]">
                    {cattleData?.brand}
                  </SheetTitle>
                  <p className="text-sm text-[#def3de]">{cattleData?.breed}</p>
                  <p className="text-sm text-[#4f604f]">
                    {cattleData?.distinctiveTrait}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 justify-center items-center">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={() => {
                    const currentPath = window.location.pathname;
                    const newPath = `${currentPath}/bovine/${cattle}`; // Construye la nueva ruta.
                    router.push(newPath); // Navega a la nueva ruta.
                  }}
                >
                  <IconWrapper icon="edit" />
                </Button>
              </div>
            </div>
            <Separator className="bg-[#c1e3c1] h-0.5" />
            <div className="text-start w-full grid grid-cols-2 gap-x-4 px-4 md:px-8 pb-4">
              <div className="flex justify-between items-center bg-[#abcfab] rounded-lg px-4 py-2">
                <div className="">
                  <p className="text-[#4f604f]">Sexo</p>
                  <p className="text-sm text-[#def3de]">
                    {getSex(cattleData?.gender as "BULL" | "COW")}
                  </p>
                </div>
                <IconWrapper
                  className="text-[#4f604f]"
                  icon="tag"
                  strokeWidth="bold"
                />
              </div>
              <div className="flex justify-between items-center bg-[#abcfab] rounded-lg px-4 py-2">
                <div className="">
                  <p className="text-[#4f604f]">Fecha de nacimiento</p>
                  <p className="text-sm text-[#def3de]">
                    {cattleData?.dateOfBirth &&
                      formatDate(cattleData?.dateOfBirth)}
                  </p>
                </div>
                <IconWrapper
                  className="text-[#4f604f]"
                  icon="calendar"
                  strokeWidth="bold"
                />
              </div>
            </div>
          </SheetHeader>
        </div>
        <div className="flex flex-1 overflow-y-scroll flex-col space-y-6 px-4 md:px-8 mt-4 my-2">
          <section className="grid grid-cols-2 gap-x-4">
            <Card className="flex items-center justify-center gap-x-6 p-4">
              <ImgAvatar
                className="w-8 h-8 md:w-20 md:h-20"
                lastWeightImage={cattleData?.sire?.lastWeightImage}
              />
              <div className="text-center">
                <p className="text-base md:text-xl">
                  {cattleData?.sire?.brand}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">
                  Padre
                </p>
              </div>
            </Card>
            <Card className="flex items-center justify-center gap-x-6 p-4">
              <ImgAvatar
                className="w-8 h-8 md:w-20 md:h-20"
                lastWeightImage={cattleData?.dam?.lastWeightImage}
              />
              <div className="text-center">
                <p className="text-xl">{cattleData?.dam?.brand}</p>
                <p className="text-sm text-muted-foreground">Madre</p>
              </div>
            </Card>
          </section>
          <section className="flex flex-col space-y-6">
            <h3 className="font-medium text-muted-foreground">
              Registro de pesajes
            </h3>
            {cattleData?.id && <RecordToCattle cattle={cattleData?.id} />}
          </section>
          <section>
            <h3 className="font-medium text-muted-foreground mb-2">
              Detalle del bovino
            </h3>
            <div className="w-full text-xs md:text-base grid grid-cols-3 gap-x-2 md:gap-4">
              <Card className="w-auto flex flex-col items-center space-y-4 md:space-y-6 border p-2 md:py-6">
                <figure className="bg-[#eab4b4] rounded-full p-4 w-fit">
                  <IconWrapper
                    icon="paw"
                    className="w-5 h-5 md:w-10 md:h-10 text-[#b68c8c]"
                    strokeWidth="bold"
                  />
                </figure>
                <p className="text-muted-foreground">
                  {cattleData?.offspring} Hijos
                </p>
              </Card>
              <Card className="flex flex-col items-center space-y-4 md:space-y-6 border p-2 md:py-6">
                <figure className="bg-[#ebe3c1] rounded-full p-4 w-fit">
                  <IconWrapper
                    icon="hourglass"
                    className="w-5 h-5 md:w-10 md:h-10 text-[#9e9982]"
                    strokeWidth="bold"
                  />
                </figure>
                <p className="text-muted-foreground">
                  {cattleData?.dateOfBirth &&
                    getMonthDate(cattleData?.dateOfBirth)}{" "}
                  Meses
                </p>
              </Card>
              <Card className="flex flex-col items-center space-y-4 md:space-y-6 border p-2 md:py-6">
                <figure className="bg-[#c1e3c1] rounded-full p-4 w-fit">
                  <IconWrapper
                    icon="flagGoal"
                    className="w-5 h-5 md:w-10 md:h-10 text-[#95b095]"
                    strokeWidth="bold"
                  />
                </figure>
                <p className="text-muted-foreground">
                  Progeso: {cattleData?.stage}
                </p>
              </Card>
            </div>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
