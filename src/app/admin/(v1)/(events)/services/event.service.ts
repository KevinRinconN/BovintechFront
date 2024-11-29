import { bovintechApi } from "@/api/bovintech.api";
import { ApiInterface } from "@/types/common.types";
import { CreateEvent, EventByMonth } from "../type/event.type";

export const getEventsByMonth = async (
  filter: string = "upcoming",
  types: string = "",
  operators: string = "",
  lots: string = ""
) => {
  const { data } = await bovintechApi.get<ApiInterface<EventByMonth[]>>(
    `/event?filter=${filter}&type=${types}&operators=${operators}&lots=${lots}`
  );
  return data;
};

export const saveEvent = async () => {};

export const createEvent = async (event: CreateEvent) => {
  const { data } = await bovintechApi.post<ApiInterface<Event>>(
    `/event`,
    event
  );
  return data;
};
