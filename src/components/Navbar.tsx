import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate("/")}
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HealthAI
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate("/")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => navigate("/dashboard")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/chatbot")}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              AI Assistant
            </button>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={() => navigate("/auth")}
              className="hover-lift"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate("/auth")}
              className="gradient-primary text-primary-foreground hover-lift"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-fade-in-up">
            <button 
              onClick={() => { navigate("/"); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { navigate("/dashboard"); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
            >
              Dashboard
            </button>
            <button 
              onClick={() => { navigate("/chatbot"); setIsMenuOpen(false); }}
              className="block w-full text-left px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-accent rounded-lg transition-colors"
            >
              AI Assistant
            </button>
            <div className="flex flex-col gap-2 pt-2">
              <Button 
                variant="outline"
                onClick={() => { navigate("/auth"); setIsMenuOpen(false); }}
                className="w-full"
              >
                Login
              </Button>
              <Button 
                onClick={() => { navigate("/auth"); setIsMenuOpen(false); }}
                className="w-full gradient-primary text-primary-foreground"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
