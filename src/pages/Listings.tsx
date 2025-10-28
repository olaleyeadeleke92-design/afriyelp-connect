import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BusinessCard from "@/components/BusinessCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSearchParams } from "react-router-dom";

const mockBusinesses = [
  {
    id: "1",
    name: "Lagos Grill House",
    category: "Restaurant",
    description: "Authentic Nigerian cuisine with a modern twist. Experience the best jollof rice in Lagos!",
    address: "15 Admiralty Way, Lekki Phase 1, Lagos",
    phone: "+2348012345678",
    whatsapp: "+2348012345678",
    website: "https://lagosgrill.com",
    rating: 4.8,
  },
  {
    id: "2",
    name: "Style Republic Boutique",
    category: "Fashion",
    description: "Premium African fashion and contemporary designs for the modern professional.",
    address: "23 Opebi Road, Ikeja, Lagos",
    phone: "+2348098765432",
    whatsapp: "+2348098765432",
    rating: 4.6,
  },
  {
    id: "3",
    name: "TechHub Solutions",
    category: "Technology",
    description: "Complete IT services and digital transformation solutions for businesses.",
    address: "45 Herbert Macaulay Way, Yaba, Lagos",
    phone: "+2348087654321",
    whatsapp: "+2348087654321",
    website: "https://techhub.ng",
    rating: 4.9,
  },
  {
    id: "4",
    name: "Wellness Spa & Beauty",
    category: "Beauty",
    description: "Full-service spa offering relaxation and beauty treatments in a serene environment.",
    address: "12 Victoria Island, Lagos",
    phone: "+2348076543210",
    whatsapp: "+2348076543210",
    rating: 4.7,
  },
  {
    id: "5",
    name: "AutoCare Nigeria",
    category: "Automotive",
    description: "Professional car maintenance and repair services with certified technicians.",
    address: "34 Apapa Road, Lagos",
    phone: "+2348065432109",
    whatsapp: "+2348065432109",
    website: "https://autocare.ng",
    rating: 4.5,
  },
  {
    id: "6",
    name: "Prime Real Estate",
    category: "Real Estate",
    description: "Your trusted partner for property sales, rentals, and real estate investment.",
    address: "56 Ahmadu Bello Way, Victoria Island, Lagos",
    phone: "+2348054321098",
    whatsapp: "+2348054321098",
    website: "https://primerealestate.ng",
    rating: 4.8,
  },
];

const ListingsPage = () => {
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');
  const [filteredBusinesses, setFilteredBusinesses] = useState(mockBusinesses);

  useEffect(() => {
    let filtered = mockBusinesses;

    if (searchQuery) {
      filtered = filtered.filter(
        (business) =>
          business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          business.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(
        (business) => business.category.toLowerCase() === category.toLowerCase()
      );
    }

    setFilteredBusinesses(filtered);
  }, [searchQuery, category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-card rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search businesses..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="restaurant">Restaurant</SelectItem>
                <SelectItem value="fashion">Fashion</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="beauty">Beauty</SelectItem>
                <SelectItem value="automotive">Automotive</SelectItem>
                <SelectItem value="real estate">Real Estate</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="md:w-auto">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {searchQuery ? `Results for "${searchQuery}"` : 'All Businesses'}
          </h1>
          <p className="text-muted-foreground">
            Showing {filteredBusinesses.length} businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No businesses found</p>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingsPage;
