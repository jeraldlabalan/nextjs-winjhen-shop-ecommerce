"use client"

import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, User, ShoppingCart, ChevronDown, Star } from "lucide-react"
import { useState } from "react"

export default function HomePage() {
  const { data: session } = useSession()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isDragging, setIsDragging] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragStartCategory, setDragStartCategory] = useState("all")
  const [containerRect, setContainerRect] = useState<DOMRect | null>(null)

  const categories = [
    { id: "all", name: "All Products" },
    { id: "hair", name: "Hair" },
    { id: "skincare", name: "Skin Care" },
    { id: "makeup", name: "Makeup" },
    { id: "body", name: "Body" },
    { id: "fragrance", name: "Fragrance" },
    { id: "bath", name: "Bath" },
    { id: "home", name: "Home" },
  ]

  const handleMouseDown = (e: React.MouseEvent, categoryId: string) => {
    setIsDragging(true)
    setDragStartX(e.clientX)
    setDragStartCategory(categoryId)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const container = e.currentTarget.closest('.category-container')
    if (!container) return
    
    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const containerWidth = rect.width
    const categoryWidth = containerWidth / categories.length
    
    const categoryIndex = Math.floor(x / categoryWidth)
    const clampedIndex = Math.max(0, Math.min(categoryIndex, categories.length - 1))
    
    // Only update visual position while dragging, don't trigger backend logic yet
    setSelectedCategory(categories[clampedIndex].id)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    // Here you can add backend logic to fetch products for the selected category
    console.log('Category selected:', selectedCategory)
    // Example: fetchProductsByCategory(selectedCategory)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
    // Snap to nearest category when leaving container
    const currentIndex = categories.findIndex(cat => cat.id === selectedCategory)
    if (currentIndex !== -1) {
      setSelectedCategory(categories[currentIndex].id)
    }
  }

  const handleCategoryClick = (categoryId: string) => {
    // Direct click - immediately select and trigger backend logic
    setSelectedCategory(categoryId)
    console.log('Category clicked:', categoryId)
    // Example: fetchProductsByCategory(categoryId)
  }

  return (
    <div className="min-h-screen bg-white">
      

      {/* Header / Navigation */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold text-gray-900">
                <i>winjhen<span className="text-[var(--color-primary-pink)]">.</span></i>
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                  <span>Shop</span>
                  <Badge className="ml-1 bg-[var(--color-primary-pink-dark)] text-white text-xs">50% OFF</Badge>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>Best Sellers</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span>Collections</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="flex items-center space-x-1 text-gray-700 hover:text-gray-900">
                <span>Presets</span>
                <ChevronDown className="h-4 w-4" />
              </button>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-700 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900">
                <User className="h-5 w-5" />
              </button>
              <button className="text-gray-700 hover:text-gray-900 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-2 -right-2 bg-[var(--color-rich-brown)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  1
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[var(--color-warm-beige)] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-1 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-sm font-medium text-[var(--color-rich-brown)] uppercase tracking-wide">
                  PREMIUM COLLECTION
                </p>
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Quality products
                  <br />
                  <span className="text-[var(--color-rich-brown)]">every day.</span>
                </h1>

              </div>
              {/* Buttons removed - ready for custom image/video content */}
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900">
              <span className="text-2xl lg:text-3xl font-normal">Our</span>{" "}
              <span className="italic">best sellers.</span>
            </h2>
          </div>

          {/* Category Filters */}
          <div className="mb-12">
            {/* Desktop: Horizontal with slider */}
            <div className="hidden lg:flex justify-center">
              <div 
                className="flex space-x-2 bg-gray-100 p-1 rounded-full relative category-container cursor-grab active:cursor-grabbing"
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                {/* Animated Background Slider */}
                <div 
                  className="absolute top-1 bottom-1 bg-gray-900 rounded-full transition-all duration-300 ease-out shadow-lg"
                  style={{
                    left: `${categories.findIndex(cat => cat.id === selectedCategory) * (100 / categories.length)}%`,
                    width: `${100 / categories.length}%`
                  }}
                />
                
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    onMouseDown={(e) => handleMouseDown(e, category.id)}
                    className={`relative z-10 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ease-out min-w-[140px] text-center transform select-none ${
                      selectedCategory === category.id
                        ? "text-white scale-110"
                        : "text-gray-700 hover:text-gray-900 scale-100"
                    }`}
                    style={{
                      transform: selectedCategory === category.id ? 'scale(1.15)' : 'scale(1)',
                      transformOrigin: 'center'
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile & Tablet: Vertical stacked */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-md mx-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ease-out text-center transform ${
                      selectedCategory === category.id
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                    style={{
                      transform: selectedCategory === category.id ? 'scale(1.15)' : 'scale(1)',
                      transformOrigin: 'center'
                    }}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                    <div className="h-3 bg-gray-200 rounded w-24 mx-auto"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
