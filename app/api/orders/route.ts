import { type NextRequest, NextResponse } from "next/server"

// Mock orders database
const orders = [
  {
    id: "ORD001",
    customerId: 1,
    customerName: "John Doe",
    customerEmail: "john@example.com",
    items: [
      { id: 1, name: "Margherita Pizza", price: 18.99, quantity: 2 },
      { id: 3, name: "Chicken Burger", price: 12.99, quantity: 1 },
    ],
    subtotal: 50.97,
    deliveryFee: 3.99,
    total: 54.96,
    status: "preparing",
    deliveryAddress: {
      street: "123 Main St",
      city: "City",
      state: "State",
      zipCode: "12345",
    },
    paymentMethod: "card",
    specialInstructions: "",
    createdAt: new Date(Date.now() - 10 * 60 * 1000), // 10 minutes ago
    estimatedDelivery: new Date(Date.now() + 25 * 60 * 1000), // 25 minutes from now
  },
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const customerId = searchParams.get("customerId")
  const status = searchParams.get("status")

  let filteredOrders = orders

  if (customerId) {
    filteredOrders = filteredOrders.filter((order) => order.customerId === Number.parseInt(customerId))
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status)
  }

  return NextResponse.json({
    success: true,
    orders: filteredOrders,
  })
}

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    const newOrder = {
      id: `ORD${String(orders.length + 1).padStart(3, "0")}`,
      ...orderData,
      status: "pending",
      createdAt: new Date(),
      estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000), // 30 minutes from now
    }

    orders.push(newOrder)

    return NextResponse.json({
      success: true,
      order: newOrder,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create order",
      },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { orderId, status } = await request.json()

    const orderIndex = orders.findIndex((order) => order.id === orderId)
    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Order not found",
        },
        { status: 404 },
      )
    }

    orders[orderIndex].status = status

    return NextResponse.json({
      success: true,
      order: orders[orderIndex],
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to update order",
      },
      { status: 500 },
    )
  }
}
