import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CategoryCard from "@/components/CategoryCard";
import BusinessCard from "@/components/BusinessCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useBusinessCheck } from "@/hooks/useBusinessCheck";
import { categories } from "@/data/categories";

const featuredBusinesses = [
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
];

const HomePage = () => {
  useBusinessCheck();
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find exactly what you're looking for
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categories.slice(0, 8).map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/listings">
              <Button variant="outline" size="lg">View All Categories</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Businesses */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Featured Businesses
            </h2>
            <p className="text-lg text-muted-foreground">
              Discover top-rated businesses in your area
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} {...business} />
            ))}
          </div>
          <div className="text-center">
            <Link to="/listings">
              <Button size="lg">View All Businesses</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-3xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Grow Your Business with Afriyelp
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of businesses reaching new customers every day
            </p>
            <Link to="/add-business">
              <Button size="lg" variant="secondary" className="font-semibold">
                List Your Business for Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-white py-12 px-4">
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

export default HomePage;
