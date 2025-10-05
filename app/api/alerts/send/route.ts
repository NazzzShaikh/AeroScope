import { NextRequest, NextResponse } from "next/server"
import { sendAirQualityAlert } from "@/lib/email"
import { verifyToken } from "@/lib/auth"
import Cookies from "js-cookie"

export async function POST(request: NextRequest) {
  try {
    const { alertData } = await request.json()
    
    // Get token from cookies (in real implementation)
    const token = request.cookies.get('token')?.value
    
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // For demo purposes, using sample data
    const userEmail = "user@example.com"
    const userName = "AeroScope User"

    // Send email alert
    const emailSent = await sendAirQualityAlert(userEmail, userName, alertData)

    if (emailSent) {
      return NextResponse.json({ message: "Alert email sent successfully" })
    } else {
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }
  } catch (error) {
    console.error('Alert API error:', error)
    return NextResponse.json({ error: "Failed to send alert" }, { status: 500 })
  }
}