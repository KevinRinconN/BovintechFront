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

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { EventByMonth, EventType } from "../../type/event.type";
import { getEventsByMonth } from "../../services/event.service";
import { Icons } from "@/components/icon/icons";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryOptionFilter } from "@/components/query-option-filter";
import { TabsEvents } from "./components/tabs-events";
import { EventFormSchema } from "../../components/events-form";
import { EventSaveDialog } from "../../components/event-save-dialog";
import { PageWrapper } from "@/components/page-wrapper";

interface EventPageProps {
  searchParams: {
    types: string;
    filter: string;
    operators: string;
    lots: string;
  };
}

export default async function EventsPage({ searchParams }: EventPageProps) {
  const { types, filter = "upcoming", operators, lots } = searchParams;

  let events: EventByMonth[] = [];
  try {
    const { data } = await getEventsByMonth(filter, types, operators, lots);
    events = data;
  } catch {}

  return (
    <PageWrapper>
      <div className="w-full flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between">
        <div className=" w-full space-y-2 gap-2 max-w-2xl">
          <h1 className="text-xl md:text-2xl font-bold tracking-tight">
            Programación de Eventos
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Visualiza la programación de eventos próximos, pasados y cancelados
            para operadores. Mantente organizado y al día con las actividades
            planificadas. ✨
          </p>
        </div>
        <EventSaveDialog>
          <Button>
            <IconWrapper
              className="mr-2"
              icon="calendarPlus"
              strokeWidth="bold"
            />{" "}
            Añadir evento
          </Button>
        </EventSaveDialog>
      </div>
      <section>
        <TabsEvents queryKey="filter" events={events} />
      </section>
    </PageWrapper>
  );
}
