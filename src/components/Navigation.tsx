
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Cake, Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/admin", label: "Admin" }
  ];

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-primary p-2 rounded-lg">
              <Cake className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">
              Kiddie's Cake
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors duration-200 ${
                  isActive(link.path)
                    ? "text-primary border-b-2 border-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="text-gray-700">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signin">
                <Button variant="outline" size="sm" className="border-primary text-primary hover:bg-accent">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
            <div className="py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-2 font-medium transition-colors duration-200 ${
                    isActive(link.path)
                      ? "text-primary bg-accent"
                      : "text-gray-700 hover:text-primary hover:bg-accent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/cart"
                className="block px-4 py-2 font-medium text-gray-700 hover:text-primary hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
              </Link>
              <Link
                to="/profile"
                className="block px-4 py-2 font-medium text-gray-700 hover:text-primary hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/signin"
                className="block px-4 py-2 font-medium text-gray-700 hover:text-primary hover:bg-accent"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
