import { AlertTriangle, CheckCircle, Info } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    type: "warning",
    title: "Elevated Ozone Levels",
    message: "Ozone levels expected to reach moderate range by 2 PM",
    time: "10 minutes ago",
    location: "Downtown Area",
  },
  {
    id: 2,
    type: "info",
    title: "Air Quality Improving",
    message: "Wind patterns bringing cleaner air from the north",
    time: "1 hour ago",
    location: "City-wide",
  },
  {
    id: 3,
    type: "success",
    title: "Good Air Quality",
    message: "All pollutants within healthy ranges",
    time: "2 hours ago",
    location: "Suburban Areas",
  },
]

const alertStyles = {
  warning: {
    icon: AlertTriangle,
    color: "text-chart-5 bg-chart-5/10 border-chart-5/20",
    badge: "bg-chart-5/20 text-chart-5 border-chart-5/30",
  },
  info: {
    icon: Info,
    color: "text-chart-1 bg-chart-1/10 border-chart-1/20",
    badge: "bg-chart-1/20 text-chart-1 border-chart-1/30",
  },
  success: {
    icon: CheckCircle,
    color: "text-chart-2 bg-chart-2/10 border-chart-2/20",
    badge: "bg-chart-2/20 text-chart-2 border-chart-2/30",
  },
}

export function AlertsPanel() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50 h-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Recent Alerts</h3>
          <Badge variant="outline" className="text-xs">
            Live
          </Badge>
        </div>

        <div className="flex flex-col gap-3">
          {alerts.map((alert) => {
            const style = alertStyles[alert.type as keyof typeof alertStyles]
            const Icon = style.icon

            return (
              <div key={alert.id} className={cn("p-4 rounded-lg border flex gap-3", style.color)}>
                <Icon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-sm leading-tight">{alert.title}</h4>
                  </div>
                  <p className="text-sm opacity-90 leading-relaxed">{alert.message}</p>
                  <div className="flex items-center gap-2 text-xs opacity-75">
                    <span>{alert.location}</span>
                    <span>•</span>
                    <span>{alert.time}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
