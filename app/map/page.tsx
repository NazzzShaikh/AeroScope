import { Header } from "@/components/header"
import { InteractiveMap } from "@/components/interactive-map"

export default function MapPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col gap-4 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Interactive Pollutant Map</h1>
            <p className="text-muted-foreground">
              Real-time visualization of pollutant levels (ozone, NO₂, SO₂, etc.) across regions using NASA satellite data
            </p>
          </div>
          <InteractiveMap />
        </div>
      </main>
    </div>
  )
}