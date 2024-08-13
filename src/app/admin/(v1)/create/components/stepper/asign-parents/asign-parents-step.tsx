"use client";
import { Separator } from "@/components/ui/separator";
import { AsignParentsForm } from "./asign-parents-form";
import { useParientsStepperStore } from "@/store/create-bovine/create-bovine.store";

export const AsignParentsStep = () => {
  const sire = useParientsStepperStore((state) => state.sire);
  const setSire = useParientsStepperStore((state) => state.setSire);
  const dam = useParientsStepperStore((state) => state.dam);
  const setDam = useParientsStepperStore((state) => state.setDam);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Asigna los progenitores</h3>
        <p className="text-sm text-muted-foreground">
          Completa los siguientes campos para asignar una madre y/o un padre
          registrado al bovino
        </p>
      </div>
      <Separator />
      <AsignParentsForm
        sire={sire}
        setSire={setSire}
        dam={dam}
        setDam={setDam}
      />
    </div>
  );
};
