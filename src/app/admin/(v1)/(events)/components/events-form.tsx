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
import {
  getCattle,
  getLotList,
  getOperators,
  saveRecordByCattle,
} from "@/services/bovine.service";
import { Operator } from "@/types/bovine.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatDate } from "date-fns";
import { es } from "date-fns/locale/es";
import { CalendarIcon, icons } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { eventType } from "../(pages)/events/components/tabs-events";
import { IconWrapper } from "@/components/icon/icon-wrapper";
import { Button } from "@/components/ui/button";
import { InputList, ItemCombobox } from "../../../../../components/input-list";
import { ImgAvatar } from "@/components/img-avatar";
import { ImgUser } from "@/components/img-avatar-user";
import { useSession } from "next-auth/react";

export const EventFormSchema = z.object({
  name: z.string().min(2, {
    message: "El nombre debería contener mas de 2 caracteres",
  }),
  date: z.date(),
  eventType: z.string({
    required_error: "Digita el tipo de evento",
  }),
  operator: z.array(z.string()).optional(),
  lots: z.array(z.string()).optional(),
  cattle: z.array(z.string()).optional(),
});

interface Props {
  onSubmit?: (data: z.infer<typeof EventFormSchema>) => void;
  children?: React.ReactNode;
}

const events = Object.values(eventType).map(({ id, icon, text }) => ({
  id,
  icon,
  text,
}));

export const EventForm = ({ onSubmit, children }: Props) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof EventFormSchema>>({
    resolver: zodResolver(EventFormSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmitData(data: z.infer<typeof EventFormSchema>) {
    onSubmit && onSubmit(data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmitData)}>
        <div className="text-start space-y-4">
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
                <FormDescription>Registra el nombre del evento</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Fecha y Hora
                  <span className="font-bold text-red-700">*</span>
                </FormLabel>
                <FormControl>
                  <FormInput
                    className="w-fit"
                    type="datetime-local"
                    value={
                      field.value
                        ? new Date(
                            field.value.getTime() -
                              field.value.getTimezoneOffset() * 60000
                          )
                            .toISOString()
                            .slice(0, 16) // Solo toma hasta minutos
                        : ""
                    }
                    onChange={(e) => {
                      field.onChange(new Date(e.target.value));
                    }}
                    autoComplete="date"
                  />
                </FormControl>
                <FormDescription>
                  Registra la fecha de realización del evento
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="eventType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Tipo
                  <span className="font-bold text-red-700">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo de evento" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {events.map((event) => (
                      <SelectItem value={event.id} key={event.id}>
                        <div className="flex gap-x-2">
                          <IconWrapper icon={event.icon} strokeWidth="bold" />
                          {event.text}
                        </div>
                      </SelectItem>
                    ))}
                    {!events && (
                      <div className="p-2">
                        No hay tipos de eventos registrados
                      </div>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Registra el tipo de evento</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lots"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lotes</FormLabel>
                <FormControl>
                  <MultipleLoteCombobox
                    onValueChange={(values) => {
                      const data = values.map((value) => value.id);
                      field.onChange(data);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {session?.user.rol == "ADMIN" && (
            <FormField
              control={form.control}
              name="operator"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Operadores</FormLabel>
                  <FormControl>
                    <MultipleOperatorCombobox
                      onValueChange={(values) => {
                        const data = values.map((value) => value.id);
                        field.onChange(data);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="cattle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bovinos</FormLabel>
                <FormControl>
                  <MultipleBovinoCombobox
                    onValueChange={(values) => {
                      const data = values.map((value) => value.id);
                      field.onChange(data);
                    }}
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

const MultipleOperatorCombobox = ({
  onValueChange,
}: {
  onValueChange: (values: ItemCombobox[]) => void;
}) => {
  const [values, setValues] = useState<ItemCombobox[]>([]);
  const [items, setItems] = useState<ItemCombobox[]>([]);

  useEffect(() => {
    const fetchOperators = async () => {
      const operators = await getOperators();
      const formattedOptions = operators.data.map((operator) => ({
        id: operator.username,
        title: `${operator.username}`,
        subtitle: `${operator.firstName} ${operator.lastName}`,
      }));
      setItems(formattedOptions);
    };

    fetchOperators();
  }, []);

  const handleRemove = (id: string) => {
    setValues(values.filter((item) => item.id !== id));
    onValueChange(values.filter((item) => item.id !== id));
  };

  return (
    <div>
      <InputList
        items={items}
        onSelect={(value) => {
          if (values.some((item) => item.id == value) || value === "") return;
          const newValue = items.filter((item) => item.id == value);
          setValues([...(values || []), newValue[0]]);
          onValueChange([...(values || []), newValue[0]]);
        }}
      >
        <Button
          type="button"
          className="text-muted-foreground w-full rounded-full px-8 mt-4"
          variant="secondary"
        >
          Añadir Bovino
        </Button>
      </InputList>
      <div className="mt-4 grid grid-cols-1 divide-y divide-muted">
        {values.map((operator) => (
          <div
            key={operator?.id}
            className="flex justify-between items-center py-2"
          >
            <div className="flex gap-x-4 items-center">
              <ImgUser img={operator.img} className="w-12 h-12" />
              <div>
                <p className="text-sm font-medium">{operator?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {operator?.subtitle}
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleRemove(operator.id)}
            >
              <IconWrapper icon="x" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MultipleLoteCombobox = ({
  onValueChange,
}: {
  onValueChange: (values: ItemCombobox[]) => void;
}) => {
  const [values, setValues] = useState<ItemCombobox[]>([]);
  const [items, setItems] = useState<ItemCombobox[]>([]);

  useEffect(() => {
    const fetchLots = async () => {
      const operators = await getLotList();
      const formattedOptions = operators.data.map((lot) => ({
        id: `${lot.id}`,
        title: `${lot.name}`,
        subtitle: `${lot.description}`,
      }));
      setItems(formattedOptions);
    };

    fetchLots();
  }, []);

  const handleRemove = (id: string) => {
    setValues(values.filter((item) => item.id !== id));
    onValueChange(values.filter((item) => item.id !== id));
  };

  return (
    <div>
      <InputList
        items={items}
        onSelect={(value) => {
          if (values.some((item) => item.id == value) || value === "") return;
          const newValue = items.filter((item) => item.id == value);
          setValues([...(values || []), newValue[0]]);
          onValueChange([...(values || []), newValue[0]]);
        }}
      >
        <Button
          type="button"
          className="text-muted-foreground w-full rounded-full px-8 mt-4"
          variant="secondary"
        >
          Añadir Bovino
        </Button>
      </InputList>
      <div className="mt-4 grid grid-cols-1 divide-y divide-muted">
        {values.map((bovine) => (
          <div
            key={bovine?.id}
            className="flex justify-between items-center py-2"
          >
            <div className="flex gap-x-4 items-center">
              <div>
                <p className="text-sm font-medium">{bovine?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {bovine?.subtitle}
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleRemove(bovine.id)}
            >
              <IconWrapper icon="x" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

const MultipleBovinoCombobox = ({
  onValueChange,
}: {
  onValueChange: (values: ItemCombobox[]) => void;
}) => {
  const [values, setValues] = useState<ItemCombobox[]>([]);
  const [items, setItems] = useState<ItemCombobox[]>([]);
  const [search, setSearch] = useState<string>();
  useEffect(() => {
    const fetchLots = async () => {
      const cattle = await getCattle("", search);
      const formattedOptions = cattle.data.content.map((bovine) => ({
        id: `${bovine.id}`,
        title: `${bovine.brand}`,
        subtitle: `${bovine.breed}`,
      }));
      setItems(formattedOptions);
    };

    fetchLots();
  }, [search]);

  const handleRemove = (id: string) => {
    setValues(values.filter((item) => item.id !== id));
    onValueChange(values.filter((item) => item.id !== id));
  };

  return (
    <div>
      <InputList
        setSearch={setSearch}
        items={items}
        onSelect={(value) => {
          if (values.some((item) => item.id == value) || value === "") return;
          const newValue = items.filter((item) => item.id == value);
          setValues([...(values || []), newValue[0]]);
          onValueChange([...(values || []), newValue[0]]);
        }}
      >
        <Button
          type="button"
          className="text-muted-foreground w-full rounded-full px-8 mt-4"
          variant="secondary"
        >
          Añadir Bovino
        </Button>
      </InputList>
      <div className="mt-4 grid grid-cols-1 divide-y divide-muted">
        {values.map((bovine) => (
          <div
            key={bovine?.id}
            className="flex justify-between items-center py-2"
          >
            <div className="flex gap-x-4 items-center">
              <ImgAvatar lastWeightImage={bovine.img} className="w-12 h-12" />
              <div>
                <p className="text-sm font-medium">{bovine?.title}</p>
                <p className="text-xs text-muted-foreground">
                  {bovine?.subtitle}
                </p>
              </div>
            </div>
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={() => handleRemove(bovine.id)}
            >
              <IconWrapper icon="x" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
