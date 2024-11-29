import { auth } from "@/auth.config";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLotsByUser } from "@/services/bovine.service";
import { Lot } from "@/types/bovine.types";
import { LotCattleFormDialog } from "../../components/lot-form-dialog";
import { ImgUser } from "@/components/img-avatar-user";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PageWrapper } from "@/components/page-wrapper";

export default async function LotsPage() {
  const session = await auth();
  let lots: Lot[] = [];
  try {
    const { data } = await getLotsByUser();
    lots = data.content;
  } catch {}

  return (
    <PageWrapper className="flex flex-col space-y-12">
      <div className="flex flex-col gap-y-4 md:gap-y-0 md:flex-row md:justify-between">
        <div className=" w-full space-y-2 gap-2">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">Lotes</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Aquí podrás ver una lista detallada de todos los lotes guardados en
            nuestra base de datos.
          </p>
        </div>

        {session?.user.rol == "ADMIN" && (
          <LotCattleFormDialog>
            <Button>
              <IconWrapper className="mr-2" icon="plus" strokeWidth="bold" />{" "}
              Añadir nuevo lote
            </Button>
          </LotCattleFormDialog>
        )}
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3 h-full w-full gap-y-4 gap-x-4 justify-center mx-auto">
        {lots.map((lot) => (
          <Card className="flex flex-col justify-between space-y-6 px-6 py-8" key={lot.id}>
            <div className="flex flex-col space-y-6 ">
              <div className="flex justify-between text-muted-foreground">
                <div className="flex items-center gap-x-2">
                  <IconWrapper className="" icon="paw" strokeWidth="bold" />
                  <p className="text-sm">{lot.numberCattle} Bovinos</p>
                </div>
                <IconWrapper
                  className="mr-2"
                  icon="moreHorizontal"
                  strokeWidth="bold"
                />
              </div>
              <div>
                <CardTitle className="text-xl leading-tight">
                  {lot.name}
                </CardTitle>
                {
                  <p className="text-muted-foreground text-sm leading-tight">
                    {lot.description}
                  </p>
                }
              </div>
            </div>

            <div className="flex justify-between mt-4">
              <div className="flex gap-x-2  items-center">
                <div className="flex -space-x-3">
                  {lot.operator && (
                    <TooltipProvider delayDuration={0.2}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Avatar className="w-8 h-8 rounded-full border border-white">
                            <AvatarImage alt="@shadcn" />
                            <AvatarFallback className="text-xs uppercase">
                              {lot.operator?.firstName.charAt(0)}
                              {lot.operator?.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        </TooltipTrigger>
                        <TooltipContent align="start" side="bottom">
                          <p>
                            {lot.operator?.firstName} {lot.operator?.lastName}
                          </p>
                          <p className="text-xs leading-tight text-muted-foreground">
                            {lot.operator?.email}
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>

                <div className="text-muted-foreground text-[10px]">
                  <p className="font-semibold leading-tight ">Operadores</p>
                  <p>
                    {lot.operator ? "Personal a cargo" : "Sin personal a cargo"}
                  </p>
                </div>
              </div>
              <a
                href={`lots/${lot.id}/`}
                className="bg-[#AAD2AB] hover:bg-primary/30 px-4 py-2 text-xs text-[#5F7C6A] rounded-full"
              >
                Ingresar
              </a>
            </div>
          </Card>
        ))}
      </section>
    </PageWrapper>
  );
}
