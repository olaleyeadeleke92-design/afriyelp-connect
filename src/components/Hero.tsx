import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-marketplace.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/listings?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-primary/80" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover Trusted African Businesses Near You
        </h1>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Connect with the best local services across Nigeria and beyond
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for businesses, services, or categories..."
                className="pl-12 h-14 text-lg bg-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <Button size="lg" className="h-14 px-8" onClick={handleSearch}>
              Search
            </Button>
          </div>

          <Button
            variant="secondary"
            size="lg"
            className="w-full md:w-auto"
            onClick={() => navigate('/chat')}
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Try AI-Powered Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
