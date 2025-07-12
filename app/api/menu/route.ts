import { type NextRequest, NextResponse } from "next/server"

// Mock menu database
let menuItems = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Fresh tomatoes, mozzarella cheese, and basil leaves",
    price: 18.99,
    category: "pizza",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    prepTime: "25-30 min",
    isVegetarian: true,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "Classic pepperoni with mozzarella cheese",
    price: 21.99,
    category: "pizza",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    prepTime: "25-30 min",
    isVegetarian: false,
    isAvailable: true,
  },
  {
    id: 3,
    name: "Chicken Burger",
    description: "Grilled chicken breast with lettuce, tomato, and mayo",
    price: 12.99,
    category: "burgers",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    prepTime: "15-20 min",
    isVegetarian: false,
    isAvailable: true,
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const search = searchParams.get("search")

  let filteredItems = menuItems.filter((item) => item.isAvailable)

  if (category && category !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === category)
  }

  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()),
    )
  }

  return NextResponse.json({
    success: true,
    items: filteredItems,
  })
}

export async function POST(request: NextRequest) {
  try {
    const newItem = await request.json()

    const item = {
      id: menuItems.length + 1,
      ...newItem,
      rating: 0,
      isAvailable: true,
    }

    menuItems.push(item)

    return NextResponse.json({
      success: true,
      item,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to add menu item",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { id, ...updates } = await request.json()

    const itemIndex = menuItems.findIndex((item) => item.id === id)
    if (itemIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Item not found",
        },
        { status: 404 },
      )
    }

    menuItems[itemIndex] = { ...menuItems[itemIndex], ...updates }

    return NextResponse.json({
      success: true,
      item: menuItems[itemIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update menu item",
      },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = Number.parseInt(searchParams.get("id") || "0")

    menuItems = menuItems.filter((item) => item.id !== id)

    return NextResponse.json({
      success: true,
      message: "Item deleted successfully",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete menu item",
      },
      { status: 500 },
    )
  }
}
