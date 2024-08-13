import { Separator } from "@/components/ui/separator";
import { CreateStepper } from "./create-stepper";

export default function CreatePage() {
  return (
    <div className="md:p-10 flex flex-col gap-4 items-center justify-between">
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Registar bovino</h1>
        <p className="text-muted-foreground">Crea un bovino </p>
      </div>
      <Separator className="my-6" />
      <CreateStepper />
    </div>
  );
}
