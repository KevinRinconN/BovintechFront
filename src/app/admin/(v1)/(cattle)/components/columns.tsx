"use client";

import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bovine } from "@/types/bovine.types";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useCattleSheetStore } from "./details-bovine-sheet";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Bovine>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "brand",
    header: "Marca",
    cell: ({ row }) => {
      const bovine = row.original;

      return (
        <div className="flex items-center gap-4">
          <figure className="w-8 h-8 rounded-full bg-muted overflow-hidden">
            {bovine.lastWeightImage ? (
              <img
                src={bovine.lastWeightImage}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <IconWrapper
                  icon="img"
                  className="text-muted-foreground"
                  size="sm"
                />
              </div>
            )}
          </figure>
          <span>{bovine.brand}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "breed",
    header: "Raza",
  },
  {
    accessorKey: "gender",
    header: "Sexo",
    cell: ({ row }) => {
      const bovine = row.original;

      return bovine.gender == "BULL" ? "Macho" : "Hembra";
    },
  },
  {
    accessorKey: "lastWeight",
    header: "Peso",
    cell: ({ row }) => {
      const bovine = row.original;

      return (
        <div className="flex items-center">
          {bovine.lastWeight ? <span>{bovine.lastWeight} kg</span> : "-"}
        </div>
      );
    },
  },
  {
    accessorKey: "stage",
    header: "Etapa",
  },
  {
    accessorKey: "distinctiveTrait",
    header: "Descripcion",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const ActionsCell = () => {
        const cattle = row.original;
        const setOpen = useCattleSheetStore((state) => state.setOpen);
        const setCattle = useCattleSheetStore((state) => state.setCattle);

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className=" p-0">
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  setCattle(cattle.id);
                  setOpen(true);
                }}
              >
                Ver más
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      };

      return <ActionsCell />;
    },
  },
];
