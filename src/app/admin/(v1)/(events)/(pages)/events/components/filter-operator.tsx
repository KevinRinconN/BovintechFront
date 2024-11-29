"use client";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { OptionFilterButton } from "./filter-type-events";
import { getOperators } from "@/services/bovine.service";
import { useEffect, useState } from "react";
type Option = {
  id: string;
  text: string;
};

export const FilterOperator = ({ ...props}: Omit<OptionFilterButton, "queryKey">) => {
  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    const fetchOperators = async () => {
      const operators = await getOperators();
      const formattedOptions = operators.data.map((operator) => ({
        id: operator.username,
        text: `${operator.firstName}`,
      }));
      setOptions(formattedOptions);
    };

    fetchOperators();
  }, []);

  return (
    <OptionFilterButton
      title="Filtrar por operadores"
      queryKey="operators"
      options={options}
      {...props}
    >
      Operadores
      <IconWrapper className="ml-2" icon="chevronDown" />
    </OptionFilterButton>
  );
};
