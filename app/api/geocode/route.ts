import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address')
    
    if (!address) {
      return NextResponse.json({ error: 'Address is required' }, { status: 400 })
    }

    // Replace with your Google Maps API key
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'
    
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`
    )
    
    const data = await response.json()
    
    if (data.status === 'OK') {
      return NextResponse.json({ results: data.results })
    } else {
      return NextResponse.json({ results: [] })
    }
  } catch (error) {
    console.error('Geocoding error:', error)
    return NextResponse.json({ error: 'Geocoding failed' }, { status: 500 })
  }
}