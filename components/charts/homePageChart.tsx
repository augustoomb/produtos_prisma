"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart"

const chartData = [
  { month: "January", produtos: 186, vendas: 80 },
  { month: "February", produtos: 305, vendas: 200 },
  { month: "March", produtos: 237, vendas: 120 },
  { month: "April", produtos: 73, vendas: 190 },
  { month: "May", produtos: 209, vendas: 130 },
  { month: "June", produtos: 214, vendas: 140 },
]

const chartConfig = {
  produtos: {
    label: "produtos",
    color: "#2563eb",
  },
  vendas: {
    label: "vendas",
    color: "#60a5fa",
  },
} satisfies ChartConfig

export function HomePageChart() {
  return (
    <ChartContainer config={chartConfig} className="min-h-[50px] h-1/3 w-4/6">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="produtos" fill="var(--color-produtos)" radius={4} />
        <Bar dataKey="vendas" fill="var(--color-vendas)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
