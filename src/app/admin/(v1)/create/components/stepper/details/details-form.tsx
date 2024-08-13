"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { StepperControl, StepperPrevious } from "@/components/ui/stepper";

import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ScaleIcon, UsersIcon } from "@heroicons/react/24/outline";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { CreateBovine, createBovine } from "@/services/bovine.service";
import { useParientsStepperStore } from "@/store/create-bovine/create-bovine.store";

const formSchema = z.object({
  breed: z.string({
    required_error: "Raza requerida",
  }),
  distinctiveTrait: z.string({
    required_error: "Rasgo distintivo requerido",
  }),
  dateOfBirth: z.date({
    required_error: "Fecha de nacimiento requerida",
  }),
  gender: z.string({
    required_error: "Sexo requerido",
  }),
  brand: z.string({
    required_error: "Marca requerida",
  }),
});

interface detailsProps {
  distinctiveTrait: string;
  breed: string;
  dateOfBirth: Date;
  brand: string;
  gender: string;

  setDistinctiveTrait: (distinctiveTrait: string) => void;
  setBreed: (breed: string) => void;
  setDateOfBirth: (dateOfBirth: Date) => void;
  setGender: (gender: string) => void;
  setBrand: (brand: string) => void;
}

// Convertir todas las propiedades a opcionales
type OptionalDetailsProps = Partial<detailsProps>;

export const DetailsForm = ({
  setDistinctiveTrait,
  setBreed,
  setDateOfBirth,
  setGender,
  setBrand,

  ...defaultValues
}: OptionalDetailsProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
    },
  });
  const store = useParientsStepperStore((state) => state);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setDistinctiveTrait && setDistinctiveTrait(values.distinctiveTrait);
    setBreed && setBreed(values.breed);
    setDateOfBirth && setDateOfBirth(values.dateOfBirth);
    setGender && setGender(values.gender);
    setBrand && setBrand(values.brand);

    const bovine: CreateBovine = {
      brand: values.brand,
      breed: values.breed,
      date_of_birth: formaterDate(values.dateOfBirth),
      distinctive_trait: values.distinctiveTrait,
      gender: values.gender,
      sireId: store.sire,
      damId: store.dam,
    };
    console.log(bovine);
    return await createBovine(bovine);
  };

  const formaterDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript son 0-indexados.
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <StepperControl>
      {({ next }) => {
        const handleSubmit = (values: z.infer<typeof formSchema>) => {
          toast.promise(onSubmit(values), {
            loading: "Loading...",
            success: () => {
              next();
              return `El Bovino ha sido creado`;
            },
            error: (error) => `${error}`,
          });
        };
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
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
                      <FormDescription>
                        Digita la raza del bovino
                      </FormDescription>
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
                      <FormDescription>
                        Digita la marca del bovino
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fecha de nacimiento</FormLabel>
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
                              format(field.value, "PPP", {
                                locale: esLocale as any,
                              })
                            ) : (
                              <span>Selecciona una fecha</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
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
                      Selecciona la fecha de nacimiento
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <UsersIcon className="mb-3 h-6 w-6" />
                            Hombre
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
                            className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                          >
                            <ScaleIcon className="mb-3 h-6 w-6" />
                            Mujer
                          </Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Selecciona un sexo disponible
                    </FormDescription>
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

              <div className="flex flex-col">
                <Separator className="" />
                <div className="w-full flex justify-end gap-2 px-6 py-4">
                  <StepperPrevious type="button">Atras</StepperPrevious>
                  <Button type="submit">Registar bovino</Button>
                </div>
              </div>
            </form>
          </Form>
        );
      }}
    </StepperControl>
  );
};
