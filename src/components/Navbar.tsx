import { Button } from "@/components/ui/button";
import { Menu, Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold text-primary-foreground">A</span>
            </div>
            <span className="text-2xl font-bold text-foreground">Afriyelp</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/listings" className="text-foreground hover:text-primary transition-colors">
              Browse Businesses
            </Link>
            <Link to="/add-business" className="text-foreground hover:text-primary transition-colors">
              List Your Business
            </Link>
            <Link to="/chat" className="text-foreground hover:text-primary transition-colors">
              AI Assistant
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2 hidden md:flex" onClick={() => navigate('/profile')}>
              <User className="h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
