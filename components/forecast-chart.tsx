"use client"

import { Card } from "@/components/ui/card"
import { Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, ReferenceLine } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"

const forecastData = [
  { time: "Now", aqi: 68, confidence: 100 },
  { time: "3h", aqi: 72, confidence: 95 },
  { time: "6h", aqi: 78, confidence: 90 },
  { time: "9h", aqi: 82, confidence: 85 },
  { time: "12h", aqi: 75, confidence: 80 },
  { time: "15h", aqi: 70, confidence: 75 },
  { time: "18h", aqi: 65, confidence: 70 },
  { time: "21h", aqi: 62, confidence: 65 },
  { time: "24h", aqi: 58, confidence: 60 },
  { time: "27h", aqi: 55, confidence: 55 },
  { time: "30h", aqi: 52, confidence: 50 },
  { time: "33h", aqi: 50, confidence: 50 },
]

const chartConfig = {
  aqi: {
    label: "AQI",
    color: "hsl(var(--chart-1))",
  },
}

export function ForecastChart() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">48-Hour Air Quality Forecast</h3>
            <p className="text-sm text-muted-foreground">Predicted AQI with confidence intervals</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            ML Powered
          </Badge>
        </div>

        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="time" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
              <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} domain={[0, 150]} />
              <ReferenceLine y={50} stroke="hsl(var(--chart-2))" strokeDasharray="3 3" label="Good" />
              <ReferenceLine y={100} stroke="hsl(var(--chart-5))" strokeDasharray="3 3" label="Moderate" />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    formatter={(value, name, props) => {
                      const confidence = props.payload.confidence
                      return (
                        <div className="flex flex-col gap-1">
                          <div>
                            AQI: <span className="font-bold">{value}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Confidence: {confidence}%</div>
                        </div>
                      )
                    }}
                  />
                }
              />
              <Line
                type="monotone"
                dataKey="aqi"
                stroke="hsl(var(--chart-1))"
                strokeWidth={3}
                dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>

        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Good (0-50)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-5" />
            <span className="text-muted-foreground">Moderate (51-100)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-3" />
            <span className="text-muted-foreground">Unhealthy (101+)</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
