import { z } from "zod";
import { EventFormSchema } from "../components/events-form";
import { CreateEvent } from "../type/event.type";

export const formToCreateEvent = (
  data: z.infer<typeof EventFormSchema>
): CreateEvent => {
  const adjustedDate = new Date(
    data.date.getTime() - data.date.getTimezoneOffset() * 60000
  );
  return {
    name: data.name,
    eventType: data.eventType,
    date_event: adjustedDate,
    cattleIds: data.cattle,
    lotsId: data.lots,
    operatorUsernames: data.operator,
  };
};
