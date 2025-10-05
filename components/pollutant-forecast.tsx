"use client"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const ozoneData = [
  { time: "Now", value: 45, forecast: 45 },
  { time: "6h", value: null, forecast: 52 },
  { time: "12h", value: null, forecast: 58 },
  { time: "18h", value: null, forecast: 54 },
  { time: "24h", value: null, forecast: 48 },
  { time: "30h", value: null, forecast: 42 },
  { time: "36h", value: null, forecast: 40 },
  { time: "42h", value: null, forecast: 38 },
  { time: "48h", value: null, forecast: 36 },
]

const no2Data = [
  { time: "Now", value: 28, forecast: 28 },
  { time: "6h", value: null, forecast: 32 },
  { time: "12h", value: null, forecast: 35 },
  { time: "18h", value: null, forecast: 30 },
  { time: "24h", value: null, forecast: 26 },
  { time: "30h", value: null, forecast: 24 },
  { time: "36h", value: null, forecast: 22 },
  { time: "42h", value: null, forecast: 20 },
  { time: "48h", value: null, forecast: 19 },
]

const chartConfig = {
  forecast: {
    label: "Forecast",
    color: "hsl(var(--chart-1))",
  },
}

export function PollutantForecast() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg font-semibold">Individual Pollutant Forecasts</h3>
          <p className="text-sm text-muted-foreground">48-hour predictions for key pollutants</p>
        </div>

        <Tabs defaultValue="ozone" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="ozone">O₃</TabsTrigger>
            <TabsTrigger value="no2">NO₂</TabsTrigger>
            <TabsTrigger value="so2">SO₂</TabsTrigger>
            <TabsTrigger value="hcho">HCHO</TabsTrigger>
          </TabsList>

          <TabsContent value="ozone" className="mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">45</span>
                <span className="text-sm text-muted-foreground">ppb current</span>
                <span className="text-sm text-chart-3">→ 58 ppb peak (12h)</span>
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ozoneData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="hsl(var(--chart-1))"
                      fill="hsl(var(--chart-1))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="no2" className="mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">28</span>
                <span className="text-sm text-muted-foreground">ppb current</span>
                <span className="text-sm text-chart-3">→ 35 ppb peak (12h)</span>
              </div>
              <ChartContainer config={chartConfig} className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={no2Data}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="forecast"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>
          </TabsContent>

          <TabsContent value="so2" className="mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">12</span>
                <span className="text-sm text-muted-foreground">ppb current</span>
                <span className="text-sm text-chart-2">→ 10 ppb (improving)</span>
              </div>
              <p className="text-sm text-muted-foreground">Forecast shows stable, healthy levels for next 48 hours.</p>
            </div>
          </TabsContent>

          <TabsContent value="hcho" className="mt-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold">8</span>
                <span className="text-sm text-muted-foreground">ppb current</span>
                <span className="text-sm text-chart-2">→ 7 ppb (improving)</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Formaldehyde levels expected to decrease gradually over next 48 hours.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  )
}
