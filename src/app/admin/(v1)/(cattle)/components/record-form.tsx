import { DropZoneWrapper } from "@/components/drop-zone-wrapper";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import { saveRecordByCattle } from "@/services/bovine.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const RecordFormSchema = z.object({
  dateOfRecord: z.date({
    required_error: "Fecha de registro requerida",
  }),
  weight: z.string({
    required_error: "Digita el peso del bovino",
  }),
  files: z.array(z.instanceof(File, { message: "Debe ser un archivo válido" })),
});

interface Props {
    onSubmit?: (data: z.infer<typeof RecordFormSchema>) => void;
  children?: React.ReactNode;
}

export const RecordForm = ({onSubmit, children }: Props) => {
  const form = useForm<z.infer<typeof RecordFormSchema>>({
    resolver: zodResolver(RecordFormSchema),
  });

  function onSubmitData(data: z.infer<typeof RecordFormSchema>) {
    onSubmit && onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitData)}>
        <div className="text-start space-y-4">
          <FormField
            control={form.control}
            name="dateOfRecord"
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
                    className="w-auto p-0 z-[120] pointer-events-auto"
                    align="start"
                  >
                    <Calendar
                    className="z-[120]"
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
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Peso
                  <span className="font-bold text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <FormInput {...field} type="number" autoComplete="weight" />
                </FormControl>
                <FormDescription>Registra el peso del bovino</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="files"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Foto del pesaje
                  <span className="font-bold text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <DropZoneWrapper
                    fileValues={field.value}
                    setFileValues={field.onChange}
                    type="img"
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
