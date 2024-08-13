"use client";
import { Separator } from "@/components/ui/separator";
import { useParientsStepperStore } from "@/store/create-bovine/create-bovine.store";
import { DetailsForm } from "./details-form";

export const DetailsStep = () => {
  const breed = useParientsStepperStore((state) => state.breed);
  const setBreed = useParientsStepperStore((state) => state.setBreed);
  const distinctiveTrait = useParientsStepperStore(
    (state) => state.distinctiveTrait
  );
  const setDistinctiveTrait = useParientsStepperStore(
    (state) => state.setDistinctiveTrait
  );
  const dateOfBirth = useParientsStepperStore((state) => state.dateOfBirth);
  const setDateOfBirth = useParientsStepperStore(
    (state) => state.setDateOfBirth
  );
  const gender = useParientsStepperStore((state) => state.gender);
  const setGender = useParientsStepperStore((state) => state.setGender);
  const brand = useParientsStepperStore((state) => state.brand);
  const setBrand = useParientsStepperStore((state) => state.setBrand);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Detalles del Bovino</h3>
        <p className="text-sm text-muted-foreground">
          Completa los siguientes campos para registrar un nuevo bovino
        </p>
      </div>
      <Separator />
      <DetailsForm
        breed={breed}
        setBreed={setBreed}
        distinctiveTrait={distinctiveTrait}
        setDistinctiveTrait={setDistinctiveTrait}
        dateOfBirth={dateOfBirth != "" ? new Date(dateOfBirth) : undefined}
        setDateOfBirth={(date) => setDateOfBirth(date.toLocaleDateString())}
        gender={gender}
        setGender={setGender}
        brand={brand}
        setBrand={setBrand}
      />
    </div>
  );
};
