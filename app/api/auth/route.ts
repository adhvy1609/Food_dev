import { type NextRequest, NextResponse } from "next/server"

// Mock user database
const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123", // In production, this would be hashed
    name: "John Doe",
    role: "user",
  },
  {
    id: 2,
    email: "admin@foodexpress.com",
    password: "admin123", // In production, this would be hashed
    name: "Admin User",
    role: "admin",
  },
]


export async function POST(request: NextRequest) {
  try {
    const { email, password, action } = await request.json()

    if (action === "login") {
      const user = users.find((u) => u.email === email && u.password === password)

      if (user) {
        // In production, you would generate a JWT token here
        return NextResponse.json({
          success: true,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          },
          token: "mock-jwt-token",
        })
      } else {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid credentials",
          },
          { status: 401 },
        )
      }
    }

    if (action === "register") {
      const { name, phone, address } = await request.json()

      // Check if user already exists
      const existingUser = users.find((u) => u.email === email)
      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: "User already exists",
          },
          { status: 400 },
        )
      }

      // Create new user
      const newUser = {
        id: users.length + 1,
        email,
        password, // In production, hash this
        name,
        role: "user",
      }

      users.push(newUser)

      return NextResponse.json({
        success: true,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role,
        },
        token: "mock-jwt-token",
      })
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid action",
      },
      { status: 400 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Server error",
      },
      { status: 500 },
    )
  }
}
