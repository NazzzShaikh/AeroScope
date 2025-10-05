import { cn } from "@/lib/utils"
import { Heart, Users, Activity, Home } from "lucide-react"
import { Card } from "@/components/ui/card"

const recommendations = [
  {
    icon: Heart,
    category: "General Public",
    advice: "Air quality is acceptable. Enjoy outdoor activities as usual.",
    color: "text-chart-2",
  },
  {
    icon: Users,
    category: "Sensitive Groups",
    advice: "Consider reducing prolonged outdoor exertion if you experience symptoms.",
    color: "text-chart-5",
  },
  {
    icon: Activity,
    category: "Outdoor Activities",
    advice: "Good conditions for exercise and outdoor recreation.",
    color: "text-chart-1",
  },
  {
    icon: Home,
    category: "Indoor Air",
    advice: "Keep windows open for natural ventilation when possible.",
    color: "text-chart-4",
  },
]

export function HealthRecommendations() {
  return (
    <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold">Health Recommendations</h3>
          <p className="text-sm text-muted-foreground">Personalized advice based on current air quality</p>
        </div>

        <div className="flex flex-col gap-3">
          {recommendations.map((rec) => {
            const Icon = rec.icon
            return (
              <div key={rec.category} className="flex gap-3 p-4 rounded-lg border border-border/50 bg-background/50">
                <div className={cn("p-2 rounded-md bg-primary/10 h-fit", rec.color)}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex flex-col gap-1 flex-1">
                  <h4 className="font-semibold text-sm">{rec.category}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">{rec.advice}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
