
import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Cake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import { useCart } from "@/contexts/CartContext";

const Index = () => {
  const { addToCart } = useCart();
  const [featuredProducts] = useState([
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
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 relative overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <div className="bg-primary p-4 rounded-full">
                  <Cake className="h-16 w-16 text-white" />
                </div>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
                Kiddie's Cake
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl">
                Delightful cakes, cookies, and brownies made with love for every special occasion. 
                Creating sweet memories one bite at a time.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
                <Link to="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Browse Products
                  </Button>
                </Link>
                <Link to="/cart">
                  <Button variant="outline" size="lg" className="px-8 py-3 text-lg rounded-lg border-2 border-primary hover:bg-accent transition-all duration-300">
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop"
                  alt="People enjoying delicious cake"
                  className="w-full h-96 object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 bg-accent/20 rounded-full p-4 shadow-lg">
                <div className="text-3xl">🎂</div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent/20 rounded-full p-4 shadow-lg">
                <div className="text-3xl">🍰</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
            Featured Treats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-primary">
            Sweet Memories, Made Fresh Daily
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            At Kiddie's Cake, we believe every celebration deserves something special. Our talented bakers create 
            delicious cakes, cookies, and brownies using the finest ingredients, ensuring every bite brings joy 
            to your special moments.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <Card className="bg-accent/10 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🎂</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Custom Cakes</h3>
                <p className="text-foreground/80">Personalized cakes for birthdays, weddings, and special occasions</p>
              </CardContent>
            </Card>
            <Card className="bg-accent/10 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🍪</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Fresh Cookies</h3>
                <p className="text-foreground/80">Daily baked cookies with premium ingredients and love</p>
              </CardContent>
            </Card>
            <Card className="bg-accent/10 border-0 shadow-lg">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-4">🍫</div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Rich Brownies</h3>
                <p className="text-foreground/80">Decadent brownies that melt in your mouth</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
