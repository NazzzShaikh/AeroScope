"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Satellite } from "lucide-react"
import Link from "next/link"
import Cookies from "js-cookie"

interface AuthGuardProps {
  children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    setIsAuthenticated(!!token)
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md p-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Satellite className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">AeroScope</span>
          </div>
          
          <h1 className="text-xl font-semibold mb-2">Welcome to AeroScope</h1>
          <p className="text-muted-foreground mb-6">See the air, shape the future.</p>
          
          <div className="space-y-3">
            <Link href="/auth/login" className="w-full">
              <Button className="w-full">Login</Button>
            </Link>
            <Link href="/auth/signup" className="w-full">
              <Button variant="outline" className="w-full">Sign Up</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}