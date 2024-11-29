import { DataPagination } from "@/components/data-pagination";
import { getLogs } from "../../services/log.service";
import { LogAction, LogModule } from "../../types/log.type";
import { DataPageSize } from "@/components/data-page-size";
import { DataTable } from "../../../(cattle)/components/data-table";
import { columns } from "../../components/log-columns";
import { OptionFilterButton } from "../../../(events)/(pages)/events/components/filter-type-events";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { FilterOperator } from "../../../(events)/(pages)/events/components/filter-operator";
import { auth } from "@/auth.config";
import { PageWrapper } from "@/components/page-wrapper";

interface EventPageProps {
  searchParams: {
    action: string;
    modules: string;
    operators: string;
    date: string;
    page: string;
    size: string;
  };
}

type Details = {
  id: string;
  text: string;
};

export const LogActions: { [key in keyof typeof LogAction]: Details } = {
  CREATE: { id: "CREATE", text: "Crear" },
  UPDATE: { id: "UPDATE", text: "Actualizar" },
  DELETE: { id: "DELETE", text: "Eliminar" },
  OTHER: { id: "OTHER", text: "Otro" },
};

export const LogModules: { [key in keyof typeof LogModule]: Details } = {
  BIRTH: { id: "BIRTH", text: "Partos" },
  CATTLE: { id: "CATTLE", text: "Bovinos" },
  EVENT: { id: "EVENT", text: "Eventos" },
  LOT: { id: "LOT", text: "Lotes" },
  USER: { id: "USER", text: "Usuarios" },
  WEIGHING: { id: "WEIGHING", text: "Pesaje" },
};

export const logActionArray = Object.values(LogActions).map(({ id, text }) => ({
  id,
  text,
}));

export const logModuleArray = Object.values(LogModules).map(({ id, text }) => ({
  id,
  text,
}));

export default async function LogPage({ searchParams }: EventPageProps) {
  const session = await auth();

  const { action, modules, operators, date } = searchParams;

  const defaultSize = "10";
  const page = searchParams.page || "0";
  const size =
    Number(searchParams.size || defaultSize) > 30
      ? defaultSize
      : searchParams.size || defaultSize;

  const res = await getLogs(action, modules, date, operators);

  return (
    <PageWrapper >
      <div className="w-full flex justify-between">
        <div className=" w-full space-y-2 gap-2 max-w-4xl">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Registro de Actividad {action}
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Monitorea y analiza todas las actividades realizadas en la
            aplicación, incluyendo las acciones del propietario y de sus
            operadores. Accede a un historial detallado de eventos para mantener
            un seguimiento centralizado del comportamiento del sistema. 📋
          </p>
        </div>
      </div>

      <section>
        <article className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:items-center md:justify-between mb-4">
          {session?.user.rol == "ADMIN" && (
            <FilterOperator isMultiple align="start" side="right" />
          )}
          <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row">
            <OptionFilterButton
              title="Filtrar por tipo de acciones"
              queryKey="action"
              align="end"
              options={logActionArray}
              isMultiple
            >
              Tipo de acciones{" "}
              <IconWrapper className="ml-2" icon="chevronDown" />
            </OptionFilterButton>
            <OptionFilterButton
              title="Filtrar por modulos"
              queryKey="modules"
              align="end"
              options={logModuleArray}
              isMultiple
            >
              Modulos <IconWrapper className="ml-2" icon="chevronDown" />
            </OptionFilterButton>
          </div>
        </article>
        <div className="flex w-full overflow-x-scroll">
          <DataTable columns={columns} data={res.data.content || []} />
        </div>
      </section>

      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row justify-end space-x-4 mt-4">
        <DataPagination
          page={Number(page)}
          max_page={res.data?.totalPages || 1}
        />
        <DataPageSize pageSize={size} />
      </div>
    </PageWrapper>
  );
}
