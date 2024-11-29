"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";

import { Area, AreaChart } from "recharts";
import { IconWrapper } from "./icon/icon-wrapper";

const chartData = [
  { month: "January", desktop: 3 },
  { month: "February", desktop:20 },
  { month: "March", desktop: 10 },
  { month: "April", desktop: 30 },
  { month: "May", desktop:20 },
  { month: "June", desktop: 34 },
  { month: "July", desktop: 25},
  { month: "Augoust", desktop: 10 },
];

const chartDataLess = [
  { month: "January", desktop: 10 },
  { month: "February", desktop: 20 },
  { month: "March", desktop: 15 },
  { month: "April", desktop: 25 },
  { month: "May", desktop: 46 },
  { month: "June", desktop: 35 },
  { month: "July", desktop: 40},
  { month: "Augoust", desktop: 45 },
];

const chartConfig1 = {
  desktop: {
    label: "vehículos",
    color: "hsl(153, 96%, 30%)",
  },
} satisfies ChartConfig;

const chartConfigLess = {
  desktop: {
    label: "vehículos",
    color: "hsl(0, 81%, 52%)",
  },
} satisfies ChartConfig;

export function ContainerCardChar() {
  return (
    <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row md:space-x-4">
      <CardChar
        title="Total Embarazos"
        value="0"
        percentage={0}
        data={chartData}
        chartConfig={chartConfig1}
      />
      <CardChar
        title="Total Nacimientos"
        value="0"
        percentage={0}
        data={chartDataLess}
        chartConfig={chartConfig1}
      />
      <div className="flex items-center w-full rounded-xl bg-[#f4ca19]">
        <div className="flex w-full justify-between ">
          <div className="text-white px-6 py-6 md:py-0">
            <p className="text-xl md:text-2xl font-medium">Total Bovinos</p>
            <span className="text-5xl font-bold mt-4">335</span>
          </div>
          <IconWrapper
            icon="CowLogo"
            className="w-40 h-40 text-muted-foreground"
          />
        </div>
      </div>
    </div>
  );
}

interface CardCharProps {
  title: string;
  value: string;
  percentage: number;
  data?: any[];
  chartConfig: ChartConfig;
}

function generateGradientId(color: string) {
  return `fillDesktop-${color.replace(/[^a-zA-Z0-9]/g, "")}`;
}

function isTrendUpward(data: any[]) {
  if (data.length < 2) return null; // No se puede determinar la tendencia con menos de dos puntos de datos

  const firstValue = data[0].desktop;
  const lastValue = data[data.length - 1].desktop;

  return lastValue > firstValue;
}

export function CardChar({
  title,
  value,
  percentage,
  data = [], // Usar un array vacío por defecto si no se proporciona `data`
  chartConfig,
}: CardCharProps) {
  const color = chartConfig.desktop.color;
  const gradientId = generateGradientId(color || "");
  const isUpWard = isTrendUpward(data);

  return (
    <Card className="w-full space-y-2 border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 px-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <IconWrapper
          icon="moreVertical"
          className="w-4 h-4 text-muted-foreground"
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 justify-between pb-2 pr-2">
        <div className="flex flex-col space-y-2">
          <span className="text-3xl font-bold">{value}</span>
          <div className="flex gap-2">
            <span
              className={cn(
                "flex text-xs font-bold",
                isUpWard ? "text-[#039855]" : "text-[#eb4040]"
              )}
            >
              <IconWrapper
                icon={isUpWard ? "arrowUp" : "arrowDown"}
                strokeWidth="bold"
                className="mr-1"
              />
              <span>{percentage}%</span>
            </span>
            <span className="text-xs text-nowrap">vs último mes</span>
          </div>
        </div>
        {data.length > 0 && (
          <ChartContainer config={chartConfig} className="w-full h-28">
            <AreaChart accessibilityLayer data={data}>
              {/* <ChartTooltip   cursor={false} content={<ChartTooltipContent />} /> */}
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={color} stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <Area
                dataKey="desktop"
                type="natural"
                fill={`url(#${gradientId})`}
                fillOpacity={0.4}
                stroke={color}
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
