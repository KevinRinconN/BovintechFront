import { DropZoneWrapper } from "@/components/drop-zone-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Combobox, ComboboxContent, ComboboxGroup, ComboboxItem, ComboboxList, ComboboxOption, ComboboxTrigger, ComboboxValue } from "@/components/ui/combobox";
import { CommandEmpty, CommandInput } from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, formatDateToBack } from "@/lib/utils";
import { getCattleByGender, saveRecordByCattle } from "@/services/bovine.service";
import { Bovine } from "@/types/bovine.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const NewBirthFormSchema = z.object({
  insemination_date: z.date({
    required_error: "Fecha de registro requerida",
  }),
  IdSire: z.string({
    required_error: "Digita el peso del bovino",
  }),
});

interface Props {
  onSubmit?: (data: z.infer<typeof NewBirthFormSchema>) => void;
  children?: React.ReactNode;
}

export const NewBirthForm = ({ onSubmit, children }: Props) => {
  const form = useForm<z.infer<typeof NewBirthFormSchema>>({
    resolver: zodResolver(NewBirthFormSchema),
    defaultValues: {
        IdSire: "",
      },
  });

  function onSubmitData(data: z.infer<typeof NewBirthFormSchema>) {
    onSubmit && onSubmit(data);
  }

  const [searchSire, setSearchSire] = useState("");
  const [cattleSire, setCattleSire] = useState<Bovine[]>([]);

  const setCattleSireHandle = async () => {
    try {
      const { data } = await getCattleByGender("BULL");
      setCattleSire(data.content);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    setCattleSireHandle();
  }, [searchSire]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitData)}>
        <div className="text-start space-y-4">
          <FormField
            control={form.control}
            name="insemination_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Fecha</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          formatDate(field.value, "PPP", {
                            locale: es as any,
                          })
                        ) : (
                          <span>Selecciona una fecha</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 pointer-events-auto"
                    align="start"
                  >
                    <Calendar
                      classNames={{
                        caption_label: "hidden",
                        caption_dropdowns: "flex mx-2",
                        dropdown_month: "[&>span]:hidden",
                        dropdown_year: "[&>span]:hidden",
                      }}
                      captionLayout="dropdown-buttons"
                      fromYear={2010}
                      toYear={2024}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Selecciona la fecha de registro
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="IdSire"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Padre</FormLabel>
                <Combobox
                  value={field.value.toString()}
                  onValueChange={(value) => field.onChange(value.toString())}
                >
                  <FormControl>
                    <ComboboxTrigger asChild>
                      <ComboboxValue
                        className="w-full max-w-md"
                        placeholder="Selecciona una empresa"
                      ></ComboboxValue>
                    </ComboboxTrigger>
                  </FormControl>
                  <ComboboxContent align="start" className="p-0 pointer-events-auto">
                    <CommandInput
                      onValueChange={setSearchSire}
                      placeholder="Busca un padre ..."
                    />
                    <ComboboxList>
                      <CommandEmpty>Padre no encontrado</CommandEmpty>
                      <ComboboxGroup>
                        {cattleSire.map((bovine) => (
                          <ComboboxItem
                            key={bovine.id}
                            value={bovine.id}
                            label={bovine.brand}
                            className="px-2"
                          >
                            <p className="flex flex-col">
                              <strong className="font-medium">
                                {bovine.brand}
                              </strong>
                              {bovine.breed}
                            </p>
                          </ComboboxItem>
                        ))}
                        <ComboboxOption className="justify-center">
                          Ver mas
                        </ComboboxOption>
                      </ComboboxGroup>
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
                <FormDescription>Busca por la marca</FormDescription>
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
