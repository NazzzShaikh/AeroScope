import { Satellite, Cloud, Radio, Database } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const dataSources = [
  {
    name: "NASA TEMPO",
    type: "Satellite",
    icon: Satellite,
    status: "active",
    description: "Hourly pollutant measurements",
    lastUpdate: "2 min ago",
  },
  {
    name: "Weather Data",
    type: "Meteorological",
    icon: Cloud,
    status: "active",
    description: "Wind, temperature, humidity",
    lastUpdate: "5 min ago",
  },
  {
    name: "Pandora Network",
    type: "Ground Sensors",
    icon: Radio,
    status: "active",
    description: "Ground-based validation",
    lastUpdate: "3 min ago",
  },
  {
    name: "OpenAQ",
    type: "Community Data",
    icon: Database,
    status: "active",
    description: "Global air quality database",
    lastUpdate: "10 min ago",
  },
]

export function DataSourcesPanel() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Data Sources</h3>
          <Badge variant="outline" className="bg-chart-2/20 text-chart-2 border-chart-2/30">
            All Active
          </Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dataSources.map((source) => {
            const Icon = source.icon
            return (
              <div
                key={source.name}
                className="p-4 rounded-lg border border-border/50 bg-background/50 flex flex-col gap-2"
              >
                <div className="flex items-start justify-between">
                  <div className="p-2 rounded-md bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="h-2 w-2 rounded-full bg-chart-2 animate-pulse" />
                </div>
                <div className="flex flex-col gap-1">
                  <h4 className="font-semibold text-sm">{source.name}</h4>
                  <p className="text-xs text-muted-foreground">{source.description}</p>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{source.type}</span>
                  <span>{source.lastUpdate}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
