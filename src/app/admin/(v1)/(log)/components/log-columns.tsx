"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Log } from "../types/log.type";
import { formatDate, formatDateHour } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { LogActions, LogModules } from "../(pages)/log/page";

export const columns: ColumnDef<Log>[] = [
  {
    accessorKey: "logger",
    header: "Mensaje",
  },
  {
    accessorKey: "timestamp",
    header: "Fecha",
    cell: ({ row }) => {
      const log = row.original;

      return <p className="flex-none text-nowrap">{formatDateHour(log.timestamp)}</p>;
    },
  },
  {
    accessorKey: "action",
    header: "Accción",
    cell: ({ row }) => {
      const log = row.original;
      return <Badge variant="secondary">{LogActions[log.action].text}</Badge>;
    },
  },
  {
    accessorKey: "module",
    header: "Modulo",
    cell: ({ row }) => {
        const log = row.original;
        return <Badge variant="outline">{LogModules[log.module].text}</Badge>;
      },
  },
  {
    accessorKey: "user",
    header: "Usuario",
    cell: ({ row }) => {
      const log = row.original;

      return (
        <div className="flex flex-col">
          <p>
            {log.user.firstName} {log.user.lastName}
          </p>
          <p className="text-xs text-muted-foreground">{log.user.rol}</p>
        </div>
      );
    },
  },
];
