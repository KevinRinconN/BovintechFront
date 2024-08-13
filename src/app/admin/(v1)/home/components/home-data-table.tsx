"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCattle } from "@/services/bovine.service";
import { Bovine } from "@/types/bovine.types";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export const HomeDataTable = () => {
  const [bovine, setBovine] = useState<Bovine[]>();
  const [bovinefilter, setBovineFilter] = useState<Bovine[]>();
  const [search, setSearch] = useState("");

  const setBovineHandler = async () => {
    try {
      const { data } = await getCattle();

      setBovine(data.content);
      setBovineFilter(data.content);
    } catch (error) {}
  };

  const filterBovine = (value: string) => {
    setBovineFilter(
      bovine?.filter((bovine) => bovine.distinctiveTrait.includes(value))
    );
  };
  useEffect(() => {
    filterBovine(search);
  }, [search]);

  useEffect(() => {
    setBovineHandler();
  }, []);
  return (
    <>
      <div className="space-y-4">
        <Input
          placeholder="Filtra por descripción..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Marca</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>genero</TableHead>
                <TableHead className="sr-only">acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bovinefilter?.map((bovine) => (
                <TableRow key={bovine.id}>
                  <TableCell className="font-medium">{bovine.brand}</TableCell>
                  <TableCell className="font-medium">
                    <div className="flex space-x-2">
                      <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                        {bovine.breed}
                      </div>
                      <span className="max-w-[500px] truncate font-medium">
                        {bovine.distinctiveTrait}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{bovine.gender}</TableCell>
                  <TableCell className="flex font-medium justify-end px-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <EllipsisHorizontalIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem>Editar</DropdownMenuItem>
                        <DropdownMenuItem>Asignar eventos</DropdownMenuItem>
                        <DropdownMenuItem>
                          Delete
                          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};
