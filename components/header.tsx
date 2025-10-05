"use client"

import { Cloud, Satellite, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

export function Header() {
  const router = useRouter()

  const handleLogout = () => {
    Cookies.remove('token')
    window.location.href = '/'
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <Satellite className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">AeroScope</span>
          </Link>
          <div className="hidden md:flex items-center gap-1 text-xs text-muted-foreground">
            <span>NASA Space Apps Challenge 2025</span>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/#dashboard"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/#forecast"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Forecast
          </Link>
          <Link
            href="/map"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Interactive Map
          </Link>
          <Link
            href="/#alerts"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Alerts
          </Link>
          <Button size="sm" className="gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </header>
  )
}
