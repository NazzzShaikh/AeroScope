import { NextRequest, NextResponse } from "next/server"
import { simpleDb } from "@/lib/simple-db"
import { generateToken } from "@/lib/auth"
import bcrypt from "bcryptjs"

export async function POST(request: NextRequest) {
  try {
    const { name, email, username, password, location, latitude, longitude } = await request.json()

    // Check if user exists
    if (simpleDb.getUserByUsername(username)) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }
    if (simpleDb.getUserByEmail(email)) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const user = simpleDb.createUser({
      name,
      email,
      username,
      password: hashedPassword,
      location,
      latitude: latitude || 0,
      longitude: longitude || 0
    })

    // Generate JWT token
    const token = generateToken(user.id, email)

    return NextResponse.json({ 
      message: "User created successfully",
      token,
      user: { id: user.id, name, email, username }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}