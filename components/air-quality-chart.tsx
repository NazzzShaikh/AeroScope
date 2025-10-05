"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  { time: "00:00", ozone: 42, no2: 25, so2: 10, hcho: 7 },
  { time: "03:00", ozone: 38, no2: 22, so2: 9, hcho: 6 },
  { time: "06:00", ozone: 35, no2: 28, so2: 11, hcho: 8 },
  { time: "09:00", ozone: 48, no2: 35, so2: 14, hcho: 10 },
  { time: "12:00", ozone: 52, no2: 38, so2: 15, hcho: 11 },
  { time: "15:00", ozone: 55, no2: 32, so2: 13, hcho: 9 },
  { time: "18:00", ozone: 45, no2: 28, so2: 12, hcho: 8 },
  { time: "21:00", ozone: 40, no2: 24, so2: 10, hcho: 7 },
]

const chartConfig = {
  ozone: {
    label: "Ozone",
    color: "hsl(var(--chart-1))",
  },
  no2: {
    label: "NO₂",
    color: "hsl(var(--chart-2))",
  },
  so2: {
    label: "SO₂",
    color: "hsl(var(--chart-4))",
  },
  hcho: {
    label: "HCHO",
    color: "hsl(var(--chart-5))",
  },
}

export function AirQualityChart() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">24-Hour Pollutant Trends</h3>
            <p className="text-sm text-muted-foreground">Hourly measurements in parts per billion (ppb)</p>
          </div>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="ozone"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="no2"
                stackId="2"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="so2"
                stackId="3"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="hcho"
                stackId="4"
                stroke="hsl(var(--chart-5))"
                fill="hsl(var(--chart-5))"
                fillOpacity={0.6}
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </Card>
  )
}
