import { type NextRequest, NextResponse } from "next/server"

// Mock Stripe payment processing
export async function POST(request: NextRequest) {
  try {
    const { amount, paymentMethod, orderData } = await request.json()

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock payment success (90% success rate)
    const isSuccess = Math.random() > 0.1

    if (isSuccess) {
      return NextResponse.json({
        success: true,
        paymentId: `pi_${Math.random().toString(36).substr(2, 9)}`,
        message: "Payment processed successfully",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Payment failed. Please try again.",
        },
        { status: 400 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Payment processing error",
      },
      { status: 500 },
    )
  }
}
