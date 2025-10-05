import { NextRequest, NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"
import { generateToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // Get user from database
    const user = simpleDb.getUserByUsername(username)
    
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password)
    
    if (!isValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Generate JWT token
    const token = generateToken(user.id, user.email)

    return NextResponse.json({ 
      message: "Login successful", 
      token,
      user: { id: user.id, name: user.name, email: user.email, username: user.username } 
    })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: "Login failed" }, { status: 500 })
  }
}