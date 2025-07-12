"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Star, Clock, Plus, Minus, ShoppingCart, Truck } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function MenuPage() {
  const [cart, setCart] = useState<{ [key: number]: number }>({})
  const [searchTerm, setSearchTerm] = useState("")

  const menuItems = [
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
    },
    {
      id: 4,
      name: "Veggie Burger",
      description: "Plant-based patty with fresh vegetables",
      price: 11.99,
      category: "burgers",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.4,
      prepTime: "15-20 min",
      isVegetarian: true,
    },
    {
      id: 5,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with parmesan and croutons",
      price: 9.99,
      category: "salads",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.5,
      prepTime: "10-15 min",
      isVegetarian: true,
    },
    {
      id: 6,
      name: "Greek Salad",
      description: "Fresh vegetables with feta cheese and olives",
      price: 10.99,
      category: "salads",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.3,
      prepTime: "10-15 min",
      isVegetarian: true,
    },
    {
      id: 7,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with chocolate frosting",
      price: 6.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.9,
      prepTime: "5 min",
      isVegetarian: true,
    },
    {
      id: 8,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee and mascarpone",
      price: 7.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      rating: 4.8,
      prepTime: "5 min",
      isVegetarian: true,
    },
  ]

  const categories = [
    { id: "all", name: "All Items" },
    { id: "pizza", name: "Pizza" },
    { id: "burgers", name: "Burgers" },
    { id: "salads", name: "Salads" },
    { id: "desserts", name: "Desserts" },
  ]

  const filteredItems = (category: string) => {
    let items = category === "all" ? menuItems : menuItems.filter((item) => item.category === category)
    if (searchTerm) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    return items
  }

  const addToCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }))
  }

  const removeFromCart = (itemId: number) => {
    setCart((prev) => ({
      ...prev,
      [itemId]: Math.max((prev[itemId] || 0) - 1, 0),
    }))
  }

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0)
  }

  const getTotalPrice = () => {
    return Object.entries(cart).reduce((sum, [itemId, count]) => {
      const item = menuItems.find((item) => item.id === Number.parseInt(itemId))
      return sum + (item ? item.price * count : 0)
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <Truck className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FoodExpress</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="outline">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({getTotalItems()})
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="sm">Login</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search for food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Menu Categories */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems(category.id).map((item) => (
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
                      {item.isVegetarian && <Badge className="absolute top-2 left-2 bg-green-500">Vegetarian</Badge>}
                    </div>
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span className="text-lg">{item.name}</span>
                        <span className="text-orange-500 font-bold">${item.price}</span>
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="w-4 h-4 mr-1" />
                          {item.prepTime}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        {cart[item.id] > 0 ? (
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" onClick={() => removeFromCart(item.id)}>
                              <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-medium">{cart[item.id]}</span>
                            <Button size="sm" variant="outline" onClick={() => addToCart(item.id)}>
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            onClick={() => addToCart(item.id)}
                            className="bg-orange-500 hover:bg-orange-600"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add to Cart
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Cart Summary */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 border">
            <div className="text-sm text-gray-600 mb-2">{getTotalItems()} items in cart</div>
            <div className="text-lg font-bold text-orange-500 mb-3">Total: ${getTotalPrice().toFixed(2)}</div>
            <Link href="/cart">
              <Button className="w-full bg-orange-500 hover:bg-orange-600">View Cart & Checkout</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
