import { IconAdminPages } from "@/components/icon/icons";

export interface Route {
  title: string;
  href: string;
  icon: IconAdminPages;
}

const adminPrefix = "/admin";

export const routesAdmin: Route[] = [
  {
    href: `${adminPrefix}/lots`,
    icon: "lot",
    title: "Inicio",
  },
  {
    href: `${adminPrefix}/create`,
    icon: "register",
    title: "Registrar",
  },
  {
    href: `${adminPrefix}/operator`,
    icon: "operator",
    title: "Operadores",
  },
  {
    href: `${adminPrefix}/events`,
    icon: "events",
    title: "Eventos",
  },
  {
    href: `${adminPrefix}/log`,
    icon: "record",
    title: "Historial",
  },
];

export const routesOperator: Route[] = [
  {
    href: `${adminPrefix}/lots`,
    icon: "lot",
    title: "Inicio",
  },
  {
    href: `${adminPrefix}/create`,
    icon: "register",
    title: "Registrar",
  },
  {
    href: `${adminPrefix}/events`,
    icon: "events",
    title: "Eventos",
  },
];
