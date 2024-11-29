"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Icons } from "@/components/icon/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { EventByMonth, EventType } from "../../../type/event.type";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { OptionFilterButton } from "./filter-type-events";
import { FilterOperator } from "./filter-operator";
import { FilterLots } from "./filter-lots";
import { getSession, useSession } from "next-auth/react";
import { EventCard } from "./event-card";

type EventTypeDetails = {
  id: string;
  icon: Icons;
  text: string;
};

export const eventType: { [key in keyof typeof EventType]: EventTypeDetails } =
  {
    BIRTH: { id: "BIRTH", icon: "paw", text: "Parto" },
    BREEDING: { id: "BREEDING", icon: "adn", text: "Reproducción" },
    MEDICAL_CHECK: {
      id: "MEDICAL_CHECK",
      icon: "stethoscope",
      text: "Chequeo médico",
    },
    SALE: { id: "SALE", icon: "piggy", text: "Venta" },
    VACCINATION: { id: "VACCINATION", icon: "syringe", text: "Vacunación" },
    WEIGHING: { id: "WEIGHING", icon: "weight", text: "Pesaje" },
    OTHER: { id: "OTHER", icon: "circleHelp", text: "Otro" },
  };

export const eventTypeArray = Object.values(eventType).map(({ id, text }) => ({
  id,
  text,
}));

interface TabsEventsProps {
  className?: String;
  queryKey: string;
  initialValue?: string;
  placeholder?: string;
  events: EventByMonth[];
}

export const TabsEvents = ({
  queryKey,
  initialValue = "",
  events = [],
}: TabsEventsProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [inputValue, setInputValue] = useState<string>(() => {
    return searchParams?.get(queryKey) || initialValue;
  });

  // Actualiza los query params en la URL
  const updateQueryParams = (newValue: string) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (newValue.trim().length > 0) {
      params.set(queryKey, newValue);
    } else {
      params.delete(queryKey);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Sincroniza el estado con los query params cuando cambian
  useEffect(() => {
    const paramValue = searchParams?.get(queryKey);
    if (paramValue !== null) {
      setInputValue(paramValue);
    } else {
      setInputValue(initialValue);
    }
  }, [searchParams, queryKey, initialValue]);

  // Maneja cambios en el input y actualiza el estado y los query params
  const handleChange = (value: string) => {
    const newValue = value;
    setInputValue(newValue);
    updateQueryParams(newValue);
  };

  return (
    <Tabs defaultValue="upcoming" className="" onValueChange={handleChange}>
      <div className="flex flex-col md:flex-row md:justify-between items-start">
        <div className="w-full flex flex-col space-y-2">
          <TabsList className="w-full md:w-fit py-6">
            <TabsTrigger className="py-2" value="upcoming">
              Próximos
            </TabsTrigger>
            <TabsTrigger className="py-2" value="past">
              Pasados
            </TabsTrigger>
            <TabsTrigger className="py-2" value="canceled">
              Cancelados
            </TabsTrigger>
          </TabsList>
          <FilterLots />
        </div>

        <div className="flex w-full flex-col space-y-2 mt-2 md:mt-0 md:space-y-0 md:flex-row items-start md:justify-end">
          {session?.user.rol == "ADMIN" && (
            <FilterOperator isMultiple className=" flex-row-reverse" />
          )}
          <OptionFilterButton
            className="w-full flex-row-reverse"
            title="Filtrar por tipo de evento"
            queryKey="types"
            align="end"
            options={eventTypeArray}
            isMultiple
          >
            Tipo de eventos <IconWrapper className="ml-2" icon="chevronDown" />
          </OptionFilterButton>
        </div>
      </div>

      <section className="flex flex-col space-y-8 h-full w-full mt-8 mx-auto">
        {events.length > 0 &&
          events.map((month, index) => {
            const monthIndex = new Date(`${month.month} 1, ${month.year}`);
            const monthInSpanish = monthIndex.toLocaleDateString("es-ES", {
              month: "long",
            });
            return (
              <div key={month.month + month.year}>
                <p className="text-muted-foreground mb-2 capitalize">
                  {monthInSpanish} {month.year}
                </p>
                <div className="flex flex-col space-y-4">
                  {month.dayEvents.map((day, indexDay) => {
                    const date = new Date(
                      Number(month.year),
                      monthIndex.getMonth(),
                      Number(day.day)
                    );

                    const dayOfWeek = date.toLocaleDateString("es-ES", {
                      weekday: "long",
                    });

                    return (
                      <Card
                        className="flex space-x-4 md:space-x-10 py-4 px-2"
                        key={month.month + month.year + day.day}
                      >
                        <div className="flex">
                          <div
                            className={cn(
                              "flex flex-col items-center w-28 md:w-36 text-muted-foreground",
                              index == 0 &&
                                indexDay == 0 &&
                                (inputValue == "upcoming" || !inputValue) &&
                                "text-[#E75F32]",
                              inputValue == "canceled" && "text-red-600"
                            )}
                          >
                            <p className="font-semibold">{dayOfWeek}</p>
                            <p className="font-medium text-4xl">{day.day}</p>
                          </div>
                          <div>
                            <Separator
                              className="h-full"
                              orientation="vertical"
                            />
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col divide-y">
                          {day.events.map((event) => {
                            const timeOptions: Intl.DateTimeFormatOptions = {
                              hour: "2-digit",
                              minute: "2-digit",
                            };

                            const startFormatted = new Date(
                              event.eventDate
                            ).toLocaleTimeString("en-US", timeOptions);

                            const type = eventType[event.eventType];
                            return (
                              <div className="py-4" key={event.id}>
                                <EventCard
                                  isFirst={
                                    index == 0 &&
                                    indexDay == 0 &&
                                    (inputValue == "upcoming" || !inputValue)
                                  }
                                  isCanceled={inputValue == "canceled"}
                                  event={event}
                                />
                                <div className="hidden md:flex">
                                  <div className="flex flex-col items-start w-full max-w-48 space-y-2">
                                    <div className="flex items-center gap-x-2 text-muted-foreground">
                                      <IconWrapper
                                        icon="clock"
                                        strokeWidth="bold"
                                      />
                                      <span>{startFormatted}</span>
                                    </div>
                                    <div
                                      className={cn(
                                        "flex items-center gap-x-2 text-muted-foreground",
                                        index == 0 &&
                                          indexDay == 0 &&
                                          (inputValue == "upcoming" ||
                                            !inputValue) &&
                                          "text-[#E75F32]",
                                        inputValue == "canceled" &&
                                          "text-red-600"
                                      )}
                                    >
                                      <IconWrapper
                                        icon={type.icon}
                                        strokeWidth="bold"
                                      />
                                      <p className="w-fit text-xs font-bold capitalize">
                                        {type.text}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-full flex flex-col space-y-2">
                                    <CardTitle className="leading-tight text-muted-foreground">
                                      {event.name}
                                    </CardTitle>
                                    <div className="flex gap-x-8">
                                      <div className="flex gap-x-2  items-center">
                                        {event.operators.length > 0 && (
                                          <div className="flex -space-x-3">
                                            {event.operators.map((operator) => (
                                              <TooltipProvider
                                                delayDuration={0.2}
                                                key={operator.username}
                                              >
                                                <Tooltip>
                                                  <TooltipTrigger asChild>
                                                    <Avatar className="w-8 h-8 rounded-full border border-white">
                                                      <AvatarImage alt="@shadcn" />
                                                      <AvatarFallback className="text-xs uppercase cursor-default">
                                                        {operator.firstName.charAt(
                                                          0
                                                        )}
                                                        {operator.lastName.charAt(
                                                          0
                                                        )}
                                                      </AvatarFallback>
                                                    </Avatar>
                                                  </TooltipTrigger>
                                                  <TooltipContent
                                                    align="start"
                                                    side="bottom"
                                                  >
                                                    <p>
                                                      {operator.firstName}{" "}
                                                      {operator.lastName}
                                                    </p>
                                                    <p className="text-xs leading-tight text-muted-foreground">
                                                      {operator.email}
                                                    </p>
                                                  </TooltipContent>
                                                </Tooltip>
                                              </TooltipProvider>
                                            ))}
                                          </div>
                                        )}

                                        <div className="text-muted-foreground text-[10px]">
                                          <p className="font-semibold leading-tight ">
                                            Operadores
                                          </p>
                                          <p>
                                            {event.operators.length > 0
                                              ? "Personal a cargo"
                                              : "Sin personal a cargo"}
                                          </p>
                                        </div>
                                      </div>

                                      {event.lots.length > 0 && (
                                        <div className="flex items-center gap-x-2">
                                          <TooltipProvider delayDuration={0.2}>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Avatar className="w-8 h-8 rounded-full border border-white">
                                                  <AvatarImage alt="@shadcn" />
                                                  <AvatarFallback className="text-xs uppercase cursor-default text-muted-foreground">
                                                    {event.lots.length}
                                                  </AvatarFallback>
                                                </Avatar>
                                              </TooltipTrigger>
                                              <TooltipContent
                                                align="start"
                                                side="bottom"
                                              >
                                                <div className="grid grid-cols-1 divide-y">
                                                  {event.lots.map((lot) => (
                                                    <p
                                                      className="p-2"
                                                      key={lot.id}
                                                    >
                                                      {lot.name}
                                                    </p>
                                                  ))}
                                                </div>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                          <p className="text-sm text-muted-foreground font-medium">
                                            Lotes
                                          </p>
                                        </div>
                                      )}

                                      {event.cattle.length > 0 && (
                                        <div className="flex items-center gap-x-2">
                                          <TooltipProvider delayDuration={0.2}>
                                            <Tooltip>
                                              <TooltipTrigger asChild>
                                                <Avatar className="w-8 h-8 rounded-full border border-white">
                                                  <AvatarImage alt="@shadcn" />
                                                  <AvatarFallback className="text-xs uppercase cursor-default text-muted-foreground">
                                                    {event.cattle.length}
                                                  </AvatarFallback>
                                                </Avatar>
                                              </TooltipTrigger>
                                              <TooltipContent
                                                align="start"
                                                side="bottom"
                                              >
                                                <div className="grid grid-cols-1 divide-y">
                                                  {event.cattle.map(
                                                    (bovine) => (
                                                      <div
                                                        className="p-2"
                                                        key={bovine.id}
                                                      >
                                                        <p>{bovine.brand}</p>
                                                        <p className="text-xs text-muted-foreground">
                                                          {bovine.breed}
                                                        </p>
                                                      </div>
                                                    )
                                                  )}
                                                </div>
                                              </TooltipContent>
                                            </Tooltip>
                                          </TooltipProvider>
                                          <p className="text-sm text-muted-foreground font-medium">
                                            Bovinos
                                          </p>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })}{" "}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>
    </Tabs>
  );
};
