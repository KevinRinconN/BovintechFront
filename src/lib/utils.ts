import { type ClassValue, clsx } from "clsx";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale/es";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getSex = (gender: "BULL" | "COW" | undefined) => {
  if (gender == "BULL") return "Macho";
  if (gender == "COW") return "Hembra";
};

export const formatDate = (date: string) => {
  const utcDate = new Date(date);
  const adjustedDate = new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds()
  );

  return format(adjustedDate, "LLL dd, y", {
    locale: es,
  });
};

export const formatDateHour = (date: string) => {
  const utcDate = new Date(date);
  const adjustedDate = new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds()
  );

  return format(adjustedDate, "LLL dd, y HH:mm", {
    locale: es,
  });
};

export const getMonthDate = (date: string) => {
  const fechaActual = new Date();
  const fechaInicio = new Date(date);
  const añosDiferencia = fechaActual.getFullYear() - fechaInicio.getFullYear();
  const mesesDiferencia = fechaActual.getMonth() - fechaInicio.getMonth();

  return añosDiferencia * 12 + mesesDiferencia;
};

export const formatDateToBack = (date: Date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados.
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export const getMonth = (date: Date) => {
  return format(date, "MMM", { locale: es });
};

export const getDay = (date: Date) => {
  return format(date, "d");
};

export const getYear = (date: Date) => {
  return format(date, "yyyy");
};

