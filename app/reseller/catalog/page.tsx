"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Search, Filter, ShoppingCart, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import MainLayout from "@/components/layout/main-layout";
import { LoadingSpinnerFullScreen } from "@/components/ui/loading-spinner";
import { useLoading } from "@/lib/use-loading";

export default function ResellerCatalogPage() {
  const { data: session, status } = useSession();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { startLoading, stopLoading } = useLoading();

  if (status === "loading") {
    return (
      <LoadingSpinnerFullScreen 
        text="Loading catalog..."
        color="orange"
      />
    );
  }

  if (status === "unauthenticated") {
    redirect("/auth/login");
  }

  const user = session?.user;

  if (!user || user.role !== "RESELLER_CUSTOMER") {
    redirect("/dashboard");
  }

  // Mock product data
  const mockProducts = [
    {
      id: "1",
      name: "Wireless Bluetooth Headphones",
      category: "Electronics",
      price: 29.99,
      resellerPrice: 24.99,
      retailPrice: 39.99,
      stock: 150,
      minOrder: 10,
      image: "/placeholder-product.jpg",
      rating: 4.5,
      reviews: 128,
      isNew: true,
      discount: 15
    },
    {
      id: "2",
      name: "Smartphone Case - Premium Quality",
      category: "Accessories",
      price: 8.99,
      resellerPrice: 6.99,
      retailPrice: 12.99,
      stock: 300,
      minOrder: 20,
      image: "/placeholder-product.jpg",
      rating: 4.3,
      reviews: 89,
      isNew: false,
      discount: 20
    },
    {
      id: "3",
      name: "USB-C Fast Charging Cable",
      category: "Electronics",
      price: 12.99,
      resellerPrice: 9.99,
      retailPrice: 18.99,
      stock: 200,
      minOrder: 15,
      image: "/placeholder-product.jpg",
      rating: 4.7,
      reviews: 156,
      isNew: false,
      discount: 25
    },
    {
      id: "4",
      name: "Portable Power Bank 10000mAh",
      category: "Electronics",
      price: 19.99,
      resellerPrice: 15.99,
      retailPrice: 29.99,
      stock: 80,
      minOrder: 5,
      image: "/placeholder-product.jpg",
      rating: 4.6,
      reviews: 203,
      isNew: true,
      discount: 30
    },
    {
      id: "5",
      name: "Gaming Mouse with RGB",
      category: "Gaming",
      price: 34.99,
      resellerPrice: 27.99,
      retailPrice: 49.99,
      stock: 120,
      minOrder: 8,
      image: "/placeholder-product.jpg",
      rating: 4.4,
      reviews: 167,
      isNew: false,
      discount: 22
    },
    {
      id: "6",
      name: "Mechanical Keyboard",
      category: "Gaming",
      price: 89.99,
      resellerPrice: 69.99,
      retailPrice: 129.99,
      stock: 45,
      minOrder: 3,
      image: "/placeholder-product.jpg",
      rating: 4.8,
      reviews: 89,
      isNew: true,
      discount: 35
    }
  ];

  const categories = [
    { id: "all", name: "All Categories", count: mockProducts.length },
    { id: "electronics", name: "Electronics", count: 3 },
    { id: "accessories", name: "Accessories", count: 1 },
    { id: "gaming", name: "Gaming", count: 2 }
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           product.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();
    
    try {
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 800));
      // Search functionality will be implemented here
      console.log("Searching for:", searchQuery);
    } finally {
      stopLoading();
    }
  };

  const handleAddToCart = async (productId: string) => {
    startLoading();
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Add to cart functionality will be implemented here
      console.log("Added to cart:", productId);
    } finally {
      stopLoading();
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-50">
        {/* Hero Section with Search */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-2">Reseller Product Catalog</h1>
              <p className="text-xl opacity-90">Discover wholesale products with exclusive reseller pricing</p>
            </div>
            
            {/* Main Search Bar */}
            <div className="max-w-3xl mx-auto">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search for products, brands, or categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-20 py-4 text-lg border-0 rounded-full shadow-lg focus:ring-2 focus:ring-white focus:ring-opacity-50"
                  />
                                     <Button
                     type="submit"
                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-full"
                   >
                     Search
                   </Button>
                </div>
              </form>
            </div>

            {/* Search Suggestions */}
            <div className="mt-4 text-center">
              <p className="text-sm opacity-80 mb-2">Popular searches:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Wireless Headphones", "Smartphone Cases", "USB Cables", "Power Banks", "Gaming Accessories"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-full text-sm transition-all"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Categories and Filters */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? "bg-orange-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>

            {/* Filter Button */}
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {mockProducts.length} products
            </p>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden">
                {/* Product Image */}
                <div className="relative">
                  <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">Product Image</span>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.isNew && (
                      <Badge className="bg-green-500 text-white text-xs">NEW</Badge>
                    )}
                    {product.discount > 0 && (
                      <Badge className="bg-red-500 text-white text-xs">-{product.discount}%</Badge>
                    )}
                  </div>
                  
                  {/* Wishlist Button */}
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-50">
                    <Heart className="h-4 w-4 text-gray-600" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-2">
                    <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">{product.category}</p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({product.reviews})
                    </span>
                  </div>

                  {/* Pricing */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg font-bold text-orange-600">
                        ${product.resellerPrice}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        ${product.retailPrice}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Reseller Price • Min Order: {product.minOrder}
                    </p>
                  </div>

                  {/* Stock and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Stock: {product.stock}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                                             <Button 
                         size="sm" 
                         className="bg-orange-500 hover:bg-orange-600"
                         onClick={() => handleAddToCart(product.id)}
                       >
                         <ShoppingCart className="h-4 w-4 mr-1" />
                         Add to Cart
                       </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {filteredProducts.length > 0 && (
            <div className="text-center mt-8">
              <Button variant="outline" size="lg">
                Load More Products
              </Button>
            </div>
          )}

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or browse all categories
              </p>
              <Button onClick={() => setSearchQuery("")}>
                Browse All Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
