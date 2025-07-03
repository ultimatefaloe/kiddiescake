
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [products] = useState([
    {
      id: 1,
      name: "Rainbow Birthday Cake",
      category: "Cakes",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"],
      description: "Colorful layered cake perfect for birthday celebrations"
    },
    {
      id: 2,
      name: "Chocolate Chip Cookies",
      category: "Cookies",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop"],
      description: "Freshly baked cookies with premium chocolate chips"
    },
    {
      id: 3,
      name: "Fudge Brownies",
      category: "Brownies",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop"],
      description: "Rich, decadent brownies with a perfect fudgy texture"
    },
    {
      id: 4,
      name: "Vanilla Cupcakes",
      category: "Cakes",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1587668178277-295251f900ce?w=400&h=300&fit=crop"],
      description: "Fluffy vanilla cupcakes with buttercream frosting"
    },
    {
      id: 5,
      name: "Sugar Cookies",
      category: "Cookies",
      price: 15.99,
      image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=400&h=300&fit=crop"],
      description: "Classic sugar cookies with colorful icing decorations"
    },
    {
      id: 6,
      name: "Walnut Brownies",
      category: "Brownies",
      price: 22.99,
      image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop",
      images: ["https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop"],
      description: "Rich brownies loaded with fresh walnuts"
    }
  ]);

  const categories = ["All", "Cakes", "Cookies", "Brownies"];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-orange-50">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Delicious Products
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Discover our amazing selection of cakes, cookies, and brownies, all made with love and the finest ingredients
            </p>
          </div>

          {/* Search and Filter */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-md">
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="rounded-full border-primary/20 focus:border-primary"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={
                      selectedCategory === category
                        ? "bg-primary hover:bg-primary/90 text-white rounded-full"
                        : "border-primary text-primary hover:bg-accent rounded-full"
                    }
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
