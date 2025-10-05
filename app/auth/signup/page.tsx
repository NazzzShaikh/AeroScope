"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Satellite } from "lucide-react"
import Link from "next/link"
import Cookies from "js-cookie"

export default function SignupPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    location: "",
    latitude: 0,
    longitude: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  
  const fetchLocationSuggestions = async (location: string) => {
    try {
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(location)}`)
      const data = await response.json()
      if (data.results) {
        setSuggestions(data.results)
        setShowSuggestions(data.results.length > 0)
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error)
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value
    setFormData({...formData, location})
    
    if (location.length >= 3) {
      fetchLocationSuggestions(location)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const selectLocation = (suggestion: any) => {
    const lat = suggestion.geometry.location.lat
    const lng = suggestion.geometry.location.lng
    setFormData({
      ...formData,
      location: suggestion.formatted_address,
      latitude: lat,
      longitude: lng
    })
    setShowSuggestions(false)
    setSuggestions([])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        Cookies.set('token', data.token, { expires: 7 })
        window.location.href = "/"
      } else {
        setError(data.error || "Signup failed")
      }
    } catch (err) {
      setError("Network error. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Satellite className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">AeroScope</span>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username: e.target.value})}
              required
            />
          </div>
          
          <div className="relative">
            <Label htmlFor="location">Location (City, Country)</Label>
            <Input
              id="location"
              placeholder="e.g., New York, USA"
              value={formData.location}
              onChange={handleLocationChange}
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute z-50 w-full bg-background border border-border rounded-md shadow-lg mt-1 max-h-60 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-3 hover:bg-muted cursor-pointer text-sm border-b border-border last:border-b-0"
                    onClick={() => selectLocation(suggestion)}
                  >
                    <div className="font-medium">{suggestion.formatted_address.split(',')[0]}</div>
                    <div className="text-xs text-muted-foreground">{suggestion.formatted_address}</div>
                  </div>
                ))}
              </div>
            )}
            {formData.latitude !== 0 && (
              <p className="text-xs text-muted-foreground mt-1">
                Coordinates: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Sign Up"}
          </Button>
        </form>
        
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-primary hover:underline">
            Login
          </Link>
        </p>
      </Card>
    </div>
  )
}