import { AuthGuard } from "@/components/auth-guard"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AirQualityDashboard } from "@/components/air-quality-dashboard"
import { LocationSelector } from "@/components/location-selector"
import { DataSourcesPanel } from "@/components/data-sources-panel"
import { AirQualityIndex } from "@/components/air-quality-index"
import { HealthRecommendations } from "@/components/health-recommendations"
import { ForecastChart } from "@/components/forecast-chart"
import { PollutantForecast } from "@/components/pollutant-forecast"
import { UserLocation } from "@/components/user-location"
import { AlertButton } from "@/components/alert-button"
import { CoordinateFetcher } from "@/components/coordinate-fetcher"

export default function Home() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <HeroSection />

          <section className="container py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <LocationSelector />
              </div>
              <div className="space-y-4">
                <UserLocation />
                <AirQualityIndex />
                <AlertButton />
              </div>
            </div>
          </section>

          <AirQualityDashboard />

          <section id="forecast" className="container py-8 space-y-6">
            <div className="flex flex-col gap-2">
              <h2 className="text-3xl font-bold tracking-tight">Air Quality Forecast</h2>
              <p className="text-muted-foreground">
                Machine learning predictions based on satellite data and atmospheric models
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ForecastChart />
              <PollutantForecast />
            </div>
          </section>

          <section className="container py-8 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <DataSourcesPanel />
              <HealthRecommendations />
            </div>
            <CoordinateFetcher />
          </section>
        </main>
      </div>
    </AuthGuard>
  )
}
