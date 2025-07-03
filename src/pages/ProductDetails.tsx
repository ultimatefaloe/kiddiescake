import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
  description: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Sample products data - in a real app, this would come from an API or state management
  const products: Product[] = [
    {
      id: 1,
      name: "Rainbow Birthday Cake",
      category: "Cakes",
      price: 4599,
      image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1587668178277-295251f900ce?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=600&fit=crop"
      ],
      description: "Colorful layered cake perfect for birthday celebrations. Made with premium ingredients and decorated with vibrant frosting layers that bring joy to any special occasion."
    },
    {
      id: 2,
      name: "Chocolate Chip Cookies",
      category: "Cookies",
      price: 1299,
      image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=600&fit=crop"
      ],
      description: "Freshly baked cookies with premium chocolate chips. Crispy on the outside, soft and chewy on the inside, made with real butter and the finest chocolate."
    },
    {
      id: 3,
      name: "Fudge Brownies",
      category: "Brownies",
      price: 1899,
      image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop"
      ],
      description: "Rich, decadent brownies with a perfect fudgy texture. Made with high-quality cocoa and dark chocolate for an intensely chocolatey experience."
    }
  ];

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(p => p.id === parseInt(id));
      setProduct(foundProduct || null);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: "Added to Cart",
        description: `${product.name} has been added to your cart!`,
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-orange-50">
        <Navigation />
        <div className="pt-20 pb-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h1>
            <Link to="/products">
              <Button className="bg-primary hover:bg-primary/90">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const displayImages = product.images || [product.image];

  return (
    <div className="min-h-screen bg-orange-50">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <Link to="/products" className="inline-flex items-center text-primary hover:underline mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <img
                    src={displayImages[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-96 object-cover"
                  />
                </CardContent>
              </Card>
              
              {displayImages.length > 1 && (
                <div className="grid grid-cols-4 gap-2">
                  {displayImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                        selectedImageIndex === index
                          ? "border-primary"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {product.category}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  {product.name}
                </h1>
                <div className="text-3xl font-bold text-primary mb-6">
                  ₦{product.price}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-4">
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                  size="lg"
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <strong className="text-gray-800">Fresh Daily</strong>
                    <p>Made fresh every morning</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <strong className="text-gray-800">Premium Quality</strong>
                    <p>Only the finest ingredients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 3)
                .map((relatedProduct) => (
                  <Card key={relatedProduct.id} className="group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedProduct.images?.[0] || relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Link to={`/product/${relatedProduct.id}`}>
                        <h3 className="font-semibold text-gray-800 hover:text-primary transition-colors cursor-pointer">
                          {relatedProduct.name}
                        </h3>
                      </Link>
                      <div className="text-lg font-bold text-primary mt-2">
                        ₦{relatedProduct.price}
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
