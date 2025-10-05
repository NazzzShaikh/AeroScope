import { PollutantCard } from "@/components/pollutant-card"
import { AirQualityChart } from "@/components/air-quality-chart"
import { AlertsPanel } from "@/components/alerts-panel"

export function AirQualityDashboard() {
  return (
    <section id="dashboard" className="container py-12 space-y-8">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Air Quality Dashboard</h2>
        <p className="text-muted-foreground">Real-time monitoring of key pollutants across North America</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <PollutantCard name="Ozone (O₃)" value={45} unit="ppb" status="good" trend="down" change={-5} />
        <PollutantCard name="Nitrogen Dioxide (NO₂)" value={28} unit="ppb" status="moderate" trend="up" change={3} />
        <PollutantCard name="Sulfur Dioxide (SO₂)" value={12} unit="ppb" status="good" trend="stable" change={0} />
        <PollutantCard name="Formaldehyde (HCHO)" value={8} unit="ppb" status="good" trend="down" change={-2} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AirQualityChart />
        </div>
        <div>
          <AlertsPanel />
        </div>
      </div>
    </section>
  )
}
