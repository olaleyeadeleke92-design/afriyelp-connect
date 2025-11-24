import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import BusinessCard from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/categories";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";

// Mock business data for each category - will be replaced with Laravel API
const mockBusinesses = [
  {
    id: "1",
    name: "TechHub Solutions",
    category: "Technology & Digital Services",
    description: "Complete IT services and digital transformation solutions for businesses.",
    address: "45 Herbert Macaulay Way, Yaba, Lagos",
    phone: "+2348087654321",
    whatsapp: "+2348087654321",
    website: "https://techhub.ng",
    rating: 4.9,
  },
  {
    id: "2",
    name: "CodeCraft Studios",
    category: "Technology & Digital Services",
    description: "Custom software development and mobile app solutions.",
    address: "12 Allen Avenue, Ikeja, Lagos",
    phone: "+2348098765432",
    whatsapp: "+2348098765432",
    website: "https://codecraft.ng",
    rating: 4.7,
  },
  {
    id: "3",
    name: "Digital Marketing Pro",
    category: "Technology & Digital Services",
    description: "SEO, social media marketing, and digital advertising services.",
    address: "78 Victoria Island, Lagos",
    phone: "+2348076543210",
    whatsapp: "+2348076543210",
    rating: 4.6,
  },
];

const CategoryDetailPage = () => {
  const { slug } = useParams();
  
  // Find the category from the data
  const category = categories.find(cat => cat.slug === slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground mb-4">Category Not Found</h1>
            <Link to="/categories">
              <Button>Back to Categories</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const Icon = category.icon;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link to="/categories">
          <Button variant="ghost" className="mb-6">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
        </Link>

        {/* Category Header */}
        <div className="mb-12 text-center">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Icon className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Discover {category.count} businesses in this category
          </p>
          
          {/* Subcategories */}
          {category.subcategories && (
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              {category.subcategories.map((sub) => (
                <Badge key={sub} variant="outline" className="text-sm">
                  {sub}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Businesses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockBusinesses.map((business) => (
            <BusinessCard key={business.id} {...business} />
          ))}
        </div>

        {/* Empty State if no businesses */}
        {mockBusinesses.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg mb-6">
              No businesses found in this category yet.
            </p>
            <Link to="/add-business">
              <Button>Be the First to List Your Business</Button>
            </Link>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 px-4 mt-16">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl font-bold">A</span>
            </div>
            <span className="text-2xl font-bold">Afriyelp</span>
          </div>
          <p className="text-white/80 mb-4">
            Connecting African businesses with customers since 2025
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Contact</a>
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CategoryDetailPage;
