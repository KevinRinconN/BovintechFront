"use client";
import { Button } from "@/components/ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxGroup,
  ComboboxItem,
  ComboboxList,
  ComboboxOption,
  ComboboxTrigger,
  ComboboxValue,
} from "@/components/ui/combobox";
import { CommandEmpty, CommandInput } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { StepperControl, StepperPrevious } from "@/components/ui/stepper";
import { getCattleByGender } from "@/services/bovine.service";
import { Bovine } from "@/types/bovine.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface AsignParentsProps {
  sire: string;
  dam: string;
  setSire: (sire: string) => void;
  setDam: (dam: string) => void;
}

type OptionalAsignParentsProps = Partial<AsignParentsProps>;

const formSchema = z.object({
  sire: z.string({
    required_error: "Selecciona un padre para continuar",
  }),
  dam: z.string({
    required_error: "Selecciona un padre para continuar",
  }),
});

export const AsignParentsForm = ({
  sire,
  dam,
  setSire,
  setDam,
}: OptionalAsignParentsProps) => {
  const [searchSire, setSearchSire] = useState("");
  const [cattleSire, setCattleSire] = useState<Bovine[]>([]);
  const [searchDam, setSearchDam] = useState("");
  const [cattleDam, setCattleDam] = useState<Bovine[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      sire: sire,
      dam: dam,
    },
  });

  const setCattleSireHandle = async () => {
    try {
      const { data } = await getCattleByGender("BULL");
      setCattleSire(data.content);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const setCattleDamHandle = async () => {
    try {
      const { data } = await getCattleByGender("COW");
      setCattleDam(data.content);
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  useEffect(() => {
    setCattleDamHandle();
  }, [searchDam]);

  useEffect(() => {
    setCattleSireHandle();
  }, [searchSire]);

  function onSubmit(data: z.infer<typeof formSchema>) {
    setSire && setSire(data.sire);
    setDam && setDam(data.dam);
  }
  return (
    <StepperControl>
      {({ next }) => {
        const handleSubmit = (values: z.infer<typeof formSchema>) => {
          onSubmit(values);
          next();
        };
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className=" space-y-8"
            >
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="sire"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Padre</FormLabel>
                      <Combobox
                        value={field.value.toString()}
                        onValueChange={(value) =>
                          field.onChange(value.toString())
                        }
                      >
                        <FormControl>
                          <ComboboxTrigger asChild>
                            <ComboboxValue
                              className="w-full md:max-w-md"
                              placeholder="Selecciona el padre"
                            ></ComboboxValue>
                          </ComboboxTrigger>
                        </FormControl>
                        <ComboboxContent align="start" className=" p-0 z-[100] pointer-events-auto">
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
              <div className="w-1/2">
                <FormField
                  control={form.control}
                  name="dam"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Madre</FormLabel>
                      <Combobox
                        value={field.value.toString()}
                        onValueChange={(value) =>
                          field.onChange(value.toString())
                        }
                      >
                        <FormControl>
                          <ComboboxTrigger asChild>
                            <ComboboxValue
                              className="w-full md:max-w-md"
                              placeholder="Selecciona la madre"
                            ></ComboboxValue>
                          </ComboboxTrigger>
                        </FormControl>
                        <ComboboxContent align="start" className=" p-0 z-[100] pointer-events-auto">
                          <CommandInput
                            onValueChange={setSearchDam}
                            placeholder="Busca una madre ..."
                          />
                          <ComboboxList>
                            <CommandEmpty>Madre no encontrada</CommandEmpty>
                            <ComboboxGroup>
                              {cattleDam.map((bovine) => (
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
              <div className="flex flex-col">
                <Separator className="" />
                <div className="w-full flex justify-end gap-2 px-6 py-4">
                  <StepperPrevious type="button">Atras</StepperPrevious>
                  <Button type="submit">Siguiente</Button>
                </div>
              </div>
            </form>
          </Form>
        );
      }}
    </StepperControl>
  );
};
