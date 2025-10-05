"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface LocationSearchProps {
  onLocationSelect: (location: string, lat: number, lng: number) => void
  placeholder?: string
  label?: string
}

export function LocationSearch({ onLocationSelect, placeholder = "Search location...", label = "Location" }: LocationSearchProps) {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)

  const fetchSuggestions = async (searchQuery: string) => {
    try {
      const response = await fetch(`/api/geocode?address=${encodeURIComponent(searchQuery)}`)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    
    if (value.length >= 3) {
      fetchSuggestions(value)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }

  const selectLocation = (suggestion: any) => {
    const lat = suggestion.geometry.location.lat
    const lng = suggestion.geometry.location.lng
    setQuery(suggestion.formatted_address)
    onLocationSelect(suggestion.formatted_address, lat, lng)
    setShowSuggestions(false)
    setSuggestions([])
  }

  return (
    <div className="relative">
      <Label>{label}</Label>
      <Input
        value={query}
        onChange={handleInputChange}
        placeholder={placeholder}
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
    </div>
  )
}