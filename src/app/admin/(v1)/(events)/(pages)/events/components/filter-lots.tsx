"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { QueryOptionFilter } from "@/components/query-option-filter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OptionFilterButton } from "./filter-type-events";
import {
  getLotList,
  getLotsByUser,
  getOperators,
} from "@/services/bovine.service";
import { useEffect, useState } from "react";
type Option = {
  id: string;
  text: string;
};

export const FilterLots = () => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchLots = async () => {
      const operators = await getLotList();
      const formattedOptions = operators.data.map((lot) => ({
        id: `${lot.id}`,
        text: `${lot.name}`,
      }));
      setOptions(formattedOptions);
    };

    fetchLots();
  }, []);

  return (
    <OptionFilterButton
      title="Filtrar por lotes"
      queryKey="lots"
      align="start"
      side="right"
      options={options}
      isMultiple
    >
      <IconWrapper className="mr-2 text-muted-foreground" icon="gridCheck" strokeWidth="bold" />
      Lotes
      <IconWrapper className="ml-2" icon="chevronDown" />
    </OptionFilterButton>
  );
};
