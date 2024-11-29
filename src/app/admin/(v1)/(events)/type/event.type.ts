import { Lot, Operator } from "@/types/bovine.types";

export interface Event {
  id: string;
  name: string;
  eventDate: string;
  eventType: EventType;
  status: string;
  operators: Operator[];
  cattle: {
    id: string;
    dateOfBirth: string;
    distinctiveTrait: string;
    brand: string;
    breed: string;
    gender: string;
  }[];
  lots: {
    id: string;
    name: string;
    description: string;
  }[];
}

export interface CreateEvent {
  name: string;
  date_event: Date;
  eventType: string;
  lotsId?: string[];
  operatorUsernames?: string[];
  cattleIds?: string[];
}

export interface EventByMonth {
  month: string;
  year: string;
  dayEvents: EventsByDay[];
}

export interface EventsByDay {
  day: string;
  events: Event[];
}

export enum EventType {
  BIRTH, // Parto
  VACCINATION, // Vacunación
  WEIGHING, // Pesaje
  MEDICAL_CHECK, // Chequeo médico
  BREEDING, // Reproducción
  SALE, // Venta
  OTHER, // Otro
}
