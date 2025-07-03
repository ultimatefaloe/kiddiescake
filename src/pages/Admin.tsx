
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

const Admin = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([
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

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    description: ""
  });

  const categories = ["Cakes", "Cookies", "Brownies"];

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      price: "",
      image: "",
      description: ""
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.category || !formData.price || !formData.description) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const productData = {
      ...formData,
      price: parseFloat(formData.price),
      image: formData.image || "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
    };

    if (editingProduct) {
      setProducts(products.map(p => 
        p.id === editingProduct.id 
          ? { ...productData, id: editingProduct.id }
          : p
      ));
      toast({
        title: "Success",
        description: "Product updated successfully!",
      });
    } else {
      const newProduct = {
        ...productData,
        id: Date.now()
      };
      setProducts([...products, newProduct]);
      toast({
        title: "Success",
        description: "Product added successfully!",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      category: product.category,
      price: product.price.toString(),
      image: product.image,
      description: product.description
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProducts(products.filter(p => p.id !== id));
    toast({
      title: "Success",
      description: "Product deleted successfully!",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <Navigation />
      
      <div className="pt-20 pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Admin Dashboard
              </h1>
              <p className="text-xl text-gray-700">Manage your delicious products</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full px-6 py-3 shadow-lg"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="mr-2 h-5 w-5" />
                  Add New Product
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="name">Product Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter product name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      placeholder="0.00"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Image URL</Label>
                    <Input
                      id="image"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your product..."
                      required
                    />
                  </div>
                  
                  <div className="flex gap-2 pt-4">
                    <Button type="submit" className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                      {editingProduct ? "Update" : "Add"} Product
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      className="border-purple-300 text-purple-600 hover:bg-purple-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-pink-100 to-pink-200 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-pink-800">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-pink-600">{products.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-100 to-purple-200 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-purple-800">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-purple-600">{categories.length}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-indigo-100 to-indigo-200 border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-indigo-800">Avg. Price</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-indigo-600">
                  ${products.length > 0 ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2) : "0.00"}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={true}
              />
            ))}
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">No products added yet.</p>
              <p className="text-gray-500">Click "Add New Product" to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
