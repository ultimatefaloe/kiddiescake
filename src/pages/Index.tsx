
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([
    {
      id: 1,
      name: "Rainbow Birthday Cake",
      category: "Cakes",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      description: "Colorful layered cake perfect for birthday celebrations"
    },
    {
      id: 2,
      name: "Chocolate Chip Cookies",
      category: "Cookies",
      price: 12.99,
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
      description: "Freshly baked cookies with premium chocolate chips"
    },
    {
      id: 3,
      name: "Fudge Brownies",
      category: "Brownies",
      price: 18.99,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      description: "Rich, decadent brownies with a perfect fudgy texture"
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-4 rounded-full">
              <Cake className="h-16 w-16 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
            Kiddie's Cake
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Delightful cakes, cookies, and brownies made with love for every special occasion
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/products">
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Browse Products
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg rounded-full border-2 border-purple-300 hover:bg-purple-50 transition-all duration-300">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Featured Treats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Sweet Memories, Made Fresh Daily
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            At Kiddie's Cake, we believe every celebration deserves something special. Our talented bakers create 
            delicious cakes, cookies, and brownies using the finest ingredients, ensuring every bite brings joy 
            to your special moments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🎂</div>
                <h3 className="text-xl font-semibold mb-2 text-pink-800">Custom Cakes</h3>
                <p className="text-pink-700">Personalized cakes for birthdays, weddings, and special occasions</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🍪</div>
                <h3 className="text-xl font-semibold mb-2 text-purple-800">Fresh Cookies</h3>
                <p className="text-purple-700">Daily baked cookies with premium ingredients and love</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-indigo-100 to-indigo-200 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🍫</div>
                <h3 className="text-xl font-semibold mb-2 text-indigo-800">Rich Brownies</h3>
                <p className="text-indigo-700">Decadent brownies that melt in your mouth</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
