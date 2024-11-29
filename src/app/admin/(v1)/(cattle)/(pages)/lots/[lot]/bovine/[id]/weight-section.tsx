import { IconWrapper } from "@/components/icon/icon-wrapper";
import { RecordToCattle } from "../../../../../components/record-to-bovine";
import { CardChar } from "@/components/card-char";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig } from "@/components/ui/chart";
const chartConfig1 = {
  desktop: {
    label: "Peso",
    color: "hsl(153, 96%, 30%)",
  },
} satisfies ChartConfig;

const chartData = [
  { month: "January", desktop: 0 },
  { month: "February", desktop: 20 },
  { month: "March", desktop: 50 },
  { month: "April", desktop: 60 },
  { month: "May", desktop: 40 },
  { month: "June", desktop: 40 },
  { month: "July", desktop: 80 },
  { month: "Augoust", desktop: 100 },
];
export const WeightSection = ({
  cattle,
  weight
}: {
  cattle: string;
  weight: number;
}) => {
  const currentWeight = weight; // Convertir el peso a número
  const targetWeight = 510;
  const weightProgress = Math.min((currentWeight / targetWeight) * 100, 100).toFixed(0);
  return (
    <section>
      <h3 className="flex gap-x-2 items-center text-muted-foreground mb-4">
        <IconWrapper icon="weight" strokeWidth="bold" /> Registro de pesajes
      </h3>
      <RecordToCattle className="lg:basis-1/4" cattle={cattle} />
      <article className="grid grid-cols-1 gap-y-4 md:space-y-0 md:grid-cols-2 gap-x-6 mt-4">
        <CardChar
          title="Total Pesajes"
          value={weight ? `${weight} Kg` : "0 kg"}
          percentage={40}
          data={chartData}
          chartConfig={chartConfig1}
        />
        <Card className="px-4 border py-8">
          <CardHeader>
            <CardTitle>Progreso de peso</CardTitle>
            <CardDescription>{weightProgress}% del peso objetivo alcanzado</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <div className="flex flex-col md:flex-row justify-between text-sm text-muted-foreground">
              <p>Peso actual: {weight} kg</p>
              <p>Peso objetivo: {targetWeight} kg</p>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-6">
              <div
                className="bg-primary h-6 rounded-full transition-all duration-500"
                style={{ width: `${weightProgress}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </article>
    </section>
  );
};
