import { Separator } from "@/components/ui/separator";
import { CreateStepper } from "./create-stepper";
import { PageWrapper } from "@/components/page-wrapper";

export default function CreatePage() {
  return (
    <PageWrapper>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-xl md:text-2xl font-semibold">Registro de Bovinos</h1>
        <p className="text-sm md:text-base text-muted-foreground">Administra y organiza de manera eficiente el registro de bovinos en tu sistema. Captura detalles esenciales como identificación, raza, edad y más, asegurando un seguimiento preciso de cada animal en tu inventario. 🐄</p>
      </div>
      <Separator className="my-6" />
      <CreateStepper />
    </PageWrapper>
  );
}
