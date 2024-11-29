"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormInput,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatDateToBack } from "@/lib/utils";
import { getOperators, saveRecordByCattle } from "@/services/bovine.service";
import { Operator } from "@/types/bovine.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const LotCattleFormSchema = z.object({
  name: z.string({
    required_error: "Digita el nombre del LOTE",
  }),
  description: z.string().optional(),
  operator: z.string().optional(),
});

interface Props {
  onSubmit?: (data: z.infer<typeof LotCattleFormSchema>) => void;
  children?: React.ReactNode;
}

export const LotCattleForm = ({ onSubmit, children }: Props) => {
  const [operators, setOperators] = useState<Operator[]>([]);

  const form = useForm<z.infer<typeof LotCattleFormSchema>>({
    resolver: zodResolver(LotCattleFormSchema),
  });

  const loadOperators = async () => {
    try {
      const { data } = await getOperators();
      setOperators(data);
    } catch (error) {}
  };

  useEffect(() => {
    loadOperators();
  }, []);

  function onSubmitData(data: z.infer<typeof LotCattleFormSchema>) {
    onSubmit && onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitData)}>
        <div className="text-start space-y-4">
          <FormField
            control={form.control}
            name="operator"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Operador</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona uno de tus operadores" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {operators.map((operator) => (
                      <SelectItem
                        value={operator.username}
                        key={operator.username}
                      >
                        {operator.firstName} {operator.lastName}
                      </SelectItem>
                    ))}
                    {!operators && (
                      <div className="p-2">No hay operadores registrados</div>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Nombre
                  <span className="font-bold text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <FormInput {...field} autoComplete="name" />
                </FormControl>
                <FormDescription>Registra el nombre del lote</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Añade una descripcion al lote"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {children}
      </form>
    </Form>
  );
};
