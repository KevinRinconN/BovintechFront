import { auth } from "@/auth.config";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { PageWrapper } from "@/components/page-wrapper";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getLotsByUser, getOperators } from "@/services/bovine.service";
import { Lot } from "@/types/bovine.types";

export default async function LotsPage() {
  let operators;
  try {
    const { data } = await getOperators();
    operators = data;
  } catch (error) {}

  return (
    <PageWrapper>
      <div className=" w-full space-y-2 gap-2">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Operadores</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Aquí podrás ver una lista detallada de todos los operadores guardados
          en nuestra base de datos.
        </p>
      </div>

      <section className="flex flex-col gap-y-4 md:flex-row md:gap-x-6">
        <div className="w-full max-w-sm">
          <h3 className="text-sm md:text-base font-bold">Administra tus operadores</h3>
          <p className="text-sm md:text-base text-muted-foreground">
            Gestiona y controla todos operadores de tu ganado.
          </p>
        </div>
        <div className="flex flex-col space-y-4 flex-1">
          {operators ? (
            operators.map((operator) => (
              <Card
                className="flex items-center justify-between px-8 py-6"
                key={operator.username}
              >
                <div>
                  <p className="capitalize font-semibold">
                    {operator.firstName} {operator.lastName}
                  </p>
                  <p className="text-muted-foreground">{operator.email}</p>
                </div>
                <div className="flex gap-x-4">
                  <IconWrapper icon="trash" />
                  <IconWrapper icon="edit" />
                </div>
              </Card>
            ))
          ) : (
            <div>No has registrado operadores</div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}
