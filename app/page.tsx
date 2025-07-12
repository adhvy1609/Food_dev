import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart, Clock, Star, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  const featuredItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Fresh tomatoes, mozzarella, and basil",
      price: 18.99,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      prepTime: "25-30 min",
    },
    {
      id: 2,
      name: "Chicken Burger",
      description: "Grilled chicken with lettuce and mayo",
      price: 12.99,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.6,
      prepTime: "15-20 min",
    },
    {
      id: 3,
      name: "Caesar Salad",
      description: "Crisp romaine with parmesan and croutons",
      price: 9.99,
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      prepTime: "10-15 min",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FoodExpress</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/menu" className="text-gray-600 hover:text-orange-500">
              Menu
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-500">
              About
            </Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-500">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="outline" size="sm">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart (0)
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Delicious Food <span className="text-orange-500">Delivered Fast</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/menu">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              Order Now
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button variant="outline" size="lg">
              Sign Up
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Get your food delivered in 30 minutes or less, guaranteed fresh and hot.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <Star className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>Quality Food</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                We partner with the best restaurants to bring you high-quality, delicious meals.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardHeader>
              <ShoppingCart className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <CardTitle>Easy Ordering</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Simple, intuitive ordering process with secure payment and real-time tracking.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Featured Items */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Featured Items</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-sm font-medium flex items-center">
                  <Star className="w-3 h-3 text-yellow-400 mr-1" />
                  {item.rating}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  {item.name}
                  <span className="text-orange-500 font-bold">${item.price}</span>
                </CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {item.prepTime}
                  </div>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold">FoodExpress</span>
              </div>
              <p className="text-gray-400">Delivering happiness, one meal at a time.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/menu" className="hover:text-white">
                    Menu
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-gray-400">
                <p>📞 (555) 123-4567</p>
                <p>📧 support@foodexpress.com</p>
                <p>📍 123 Food Street, City, State</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FoodExpress. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
