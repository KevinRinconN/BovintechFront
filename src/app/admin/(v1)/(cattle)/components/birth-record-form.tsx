import { DropZoneWrapper } from "@/components/drop-zone-wrapper";
import { IconWrapper } from "@/components/icon/icon-wrapper";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn, formatDateToBack } from "@/lib/utils";
import { saveRecordByCattle } from "@/services/bovine.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const BirthRecordFormSchema = z.object({
  brand: z.string({
    required_error: "Digita la marca del bovino",
  }),
  gender: z.string({
    required_error: "Digita el sexo del bovino",
  }),
  breed: z.string({
    required_error: "Digita la raza del bovino",
  }),
  distinctiveTrait: z.string({
    required_error: "Digita el peso del bovino",
  }),
  birthDate: z.date({
    required_error: "Fecha de registro requerida",
  }),
  weight: z.string({
    required_error: "Digita el peso del bovino",
  }),
  files: z.array(z.instanceof(File, { message: "Debe ser un archivo válido" })),
});

interface Props {
  onSubmit?: (data: z.infer<typeof BirthRecordFormSchema>) => void;
  children?: React.ReactNode;
}

export const BirthRecordForm = ({ onSubmit, children }: Props) => {
  const form = useForm<z.infer<typeof BirthRecordFormSchema>>({
    resolver: zodResolver(BirthRecordFormSchema),
  });

  function onSubmitData(data: z.infer<typeof BirthRecordFormSchema>) {
    onSubmit && onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitData)}>
        <div className="md:grid md:grid-cols-2 md:gap-16">
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raza</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Digita la raza del bovino</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="brand"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Marca</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormDescription>Digita la marca del bovino</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sexo</FormLabel>
              <FormControl>
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="grid grid-cols-3 gap-4 max-w-lg"
                >
                  <div>
                    <RadioGroupItem
                      value="BULL"
                      id="men"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="men"
                      className="flex flex-col space-y-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <IconWrapper icon="bull" size="xl" />
                      <span>Toro</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem
                      value="COW"
                      id="women"
                      className="peer sr-only"
                    />
                    <Label
                      htmlFor="women"
                      className="flex flex-col space-y-4 items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                    >
                      <IconWrapper icon="cow" size="xl" />
                      <span>Vaca</span>
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription>Selecciona un sexo disponible</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-8">
          <FormField
            control={form.control}
            name="distinctiveTrait"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rasgos caracteristicos</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escribe rasgos caracteristicos del bovino"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="text-start space-y-4">
          <FormField
            control={form.control}
            name="birthDate"
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
                  Foto del punto de recogida{" "}
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
