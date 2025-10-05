import { ArrowDown, ArrowUp, Minus } from "lucide-react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface PollutantCardProps {
  name: string
  value: number
  unit: string
  status: "good" | "moderate" | "unhealthy" | "hazardous"
  trend: "up" | "down" | "stable"
  change: number
}

const statusColors = {
  good: "text-chart-2 bg-chart-2/10 border-chart-2/20",
  moderate: "text-chart-5 bg-chart-5/10 border-chart-5/20",
  unhealthy: "text-chart-3 bg-chart-3/10 border-chart-3/20",
  hazardous: "text-destructive bg-destructive/10 border-destructive/20",
}

export function PollutantCard({ name, value, unit, status, trend, change }: PollutantCardProps) {
  const TrendIcon = trend === "up" ? ArrowUp : trend === "down" ? ArrowDown : Minus

  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-medium text-muted-foreground">{name}</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{value}</span>
              <span className="text-sm text-muted-foreground">{unit}</span>
            </div>
          </div>
          <div className={cn("px-2 py-1 rounded text-xs font-medium border", statusColors[status])}>
            {status.toUpperCase()}
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <TrendIcon
            className={cn(
              "h-4 w-4",
              trend === "up" && "text-chart-3",
              trend === "down" && "text-chart-2",
              trend === "stable" && "text-muted-foreground",
            )}
          />
          <span className="text-muted-foreground">
            {change !== 0 && (change > 0 ? "+" : "")}
            {change}% from last hour
          </span>
        </div>
      </div>
    </Card>
  )
}
