import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const aqiLevels = [
  { range: "0-50", label: "Good", color: "bg-chart-2", description: "Air quality is satisfactory" },
  { range: "51-100", label: "Moderate", color: "bg-chart-5", description: "Acceptable for most people" },
  {
    range: "101-150",
    label: "Unhealthy for Sensitive",
    color: "bg-chart-3",
    description: "Sensitive groups may be affected",
  },
  {
    range: "151-200",
    label: "Unhealthy",
    color: "bg-destructive",
    description: "Everyone may begin to experience effects",
  },
]

export function AirQualityIndex() {
  const currentAQI = 68

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Air Quality Index (AQI)</h3>
          <p className="text-sm text-muted-foreground">Current overall air quality rating</p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="80" fill="none" stroke="hsl(var(--border))" strokeWidth="20" />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="hsl(var(--chart-5))"
                strokeWidth="20"
                strokeDasharray={`${(currentAQI / 200) * 502.65} 502.65`}
                strokeLinecap="round"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-bold">{currentAQI}</span>
              <span className="text-sm text-muted-foreground">AQI</span>
            </div>
          </div>

          <div className="text-center">
            <div className="text-xl font-semibold text-chart-5">Moderate</div>
            <p className="text-sm text-muted-foreground mt-1">Acceptable for most people</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {aqiLevels.map((level) => (
            <div key={level.range} className="flex items-center gap-3">
              <div className={cn("w-12 h-3 rounded-full", level.color)} />
              <div className="flex-1 flex items-center justify-between text-sm">
                <span className="font-medium">{level.label}</span>
                <span className="text-muted-foreground">{level.range}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
