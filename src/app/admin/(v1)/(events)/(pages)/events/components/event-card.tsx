import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Event } from "../../../type/event.type";
import { eventType } from "./tabs-events";

interface EventCardProps {
  isFirst?: boolean;
  isCanceled?: boolean;
  event: Event;
}

export const EventCard = ({ event, isFirst, isCanceled }: EventCardProps) => {
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };

  const startFormatted = new Date(event.eventDate).toLocaleTimeString(
    "en-US",
    timeOptions
  );

  const type = eventType[event.eventType];
  return (
    <div className="flex md:hidden" key={event.id}>
      <div className="flex flex-col space-y-2">
        <CardTitle className="text-sm leading-tight text-muted-foreground">
          {event.name}
        </CardTitle>
        <div className="flex flex-col text-xs items-start w-full space-y-1">
          <div className="flex items-center gap-x-2 text-muted-foreground">
            <IconWrapper className="w-4 h-4" icon="clock" strokeWidth="bold" />
            <span>{startFormatted}</span>
          </div>
          <div
            className={cn(
              "flex items-center gap-x-2 text-muted-foreground",
              isFirst && "text-[#E75F32]",
              isCanceled && "text-red-600"
            )}
          >
            <IconWrapper
              className="w-4 h-4"
              icon={type.icon}
              strokeWidth="bold"
            />
            <p className="w-fit text-xs capitalize">{type.text}</p>
          </div>
        </div>
        <div className="flex gap-x-2  items-center">
          {event.operators.length > 0 && (
            <div className="flex -space-x-3">
              {event.operators.map((operator) => (
                <TooltipProvider delayDuration={0.2} key={operator.username}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Avatar className="w-8 h-8 rounded-full border border-white">
                        <AvatarImage alt="@shadcn" />
                        <AvatarFallback className="text-xs uppercase cursor-default">
                          {operator.firstName.charAt(0)}
                          {operator.lastName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent align="start" side="bottom">
                      <p>
                        {operator.firstName} {operator.lastName}
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
            <p className="font-semibold leading-tight ">Operadores</p>
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
                <TooltipContent align="start" side="bottom">
                  <div className="grid grid-cols-1 divide-y">
                    {event.lots.map((lot) => (
                      <p className="p-2" key={lot.id}>
                        {lot.name}
                      </p>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-sm text-muted-foreground font-medium">Lotes</p>
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
                <TooltipContent align="start" side="bottom">
                  <div className="grid grid-cols-1 divide-y">
                    {event.cattle.map((bovine) => (
                      <div className="p-2" key={bovine.id}>
                        <p>{bovine.brand}</p>
                        <p className="text-xs text-muted-foreground">
                          {bovine.breed}
                        </p>
                      </div>
                    ))}
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <p className="text-sm text-muted-foreground font-medium">Bovinos</p>
          </div>
        )}
      </div>
    </div>
  );
};
