import { AlertTriangle, Cloud, Satellite, Wind } from "lucide-react"
import { Card } from "@/components/ui/card"

export function HeroSection() {
  return (
    <section className="container py-12 md:py-20">
      <div className="flex flex-col items-center text-center gap-6 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
          <Satellite className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">Powered by NASA TEMPO Satellite Data</span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-balance">See the air, shape the future.</h1>

        <p className="text-xl text-muted-foreground text-balance leading-relaxed max-w-2xl">
          Advanced air quality forecasting using NASA satellite data to predict cleaner, safer skies with
          neighborhood-scale hourly predictions and pollution alerts.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full mt-8">
          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <Wind className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Hourly Forecasts</h3>
              <p className="text-sm text-muted-foreground">
                Neighborhood-scale air quality predictions updated every hour
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <AlertTriangle className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Real-time Alerts</h3>
              <p className="text-sm text-muted-foreground">
                Instant notifications for pollution level changes and health risks
              </p>
            </div>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur border-border/50">
            <div className="flex flex-col items-center gap-3 text-center">
              <div className="p-3 rounded-lg bg-primary/10">
                <Cloud className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold">Multi-Source Data</h3>
              <p className="text-sm text-muted-foreground">
                Combines satellite, weather, and ground sensor data for accuracy
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
