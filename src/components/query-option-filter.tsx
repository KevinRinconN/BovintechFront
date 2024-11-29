"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { OptionFilter, OptionFilterProps } from "./option-filter";

export interface QueryOptionFilter extends OptionFilterProps {
  queryKey: string;
}

export const QueryOptionFilter = ({
  queryKey,
  initialValues,
  ...props
}: QueryOptionFilter) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selectedValues, setSelectedValues] = useState<string[]>(() => {
    const paramValue = searchParams?.get(queryKey);
    return paramValue ? paramValue.split(",") : initialValues || [];
  });

  // Actualiza los query params en la URL
  const updateQueryParams = (newValues: string[]) => {
    const params = new URLSearchParams(searchParams?.toString() || "");
    if (newValues.length > 0) {
      params.set(queryKey, newValues.join(","));
    } else {
      params.delete(queryKey);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Sincroniza los valores seleccionados con los query params
  useEffect(() => {
    const paramValue = searchParams?.get(queryKey);
    if (paramValue) {
      setSelectedValues(paramValue.split(","));
    } else {
      setSelectedValues([]);
    }
  }, [searchParams, queryKey, initialValues]);

  // Actualiza los query params cuando cambian los valores seleccionados
  useEffect(() => {
    updateQueryParams(selectedValues);
  }, [selectedValues]);

  return (
    <OptionFilter
      initialValues={selectedValues}
      onChangeValues={(values) => {
        setSelectedValues(values);
      }}
      {...props}
    />
  );
};
