import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  MessageCircle,
  Globe,
  MapPin,
  Star,
  Clock,
  Share2,
} from "lucide-react";

// Mock data - will be replaced with database data
const mockBusiness = {
  id: "1",
  name: "Lagos Grill House",
  category: "Restaurant",
  description:
    "Welcome to Lagos Grill House, where authentic Nigerian cuisine meets modern culinary excellence. Our expert chefs prepare traditional dishes using the finest local ingredients, creating an unforgettable dining experience. From our famous jollof rice to succulent suya and pepper soup, every dish tells a story of Nigerian heritage and flavor.",
  address: "15 Admiralty Way, Lekki Phase 1, Lagos",
  phone: "+2348012345678",
  whatsapp: "+2348012345678",
  website: "https://lagosgrill.com",
  rating: 4.8,
  reviewCount: 127,
  hours: "Mon-Sun: 10:00 AM - 10:00 PM",
  views: 1247,
  posts: [
    {
      id: 1,
      title: "New Weekend Special!",
      content: "Join us this weekend for our special BBQ menu featuring grilled fish and chicken with our signature pepper sauce.",
      date: "2 days ago",
    },
    {
      id: 2,
      title: "Now Offering Delivery",
      content: "We're excited to announce that we now offer delivery services within Lekki and Victoria Island. Order your favorites today!",
      date: "1 week ago",
    },
  ],
};

const BusinessProfilePage = () => {
  const { id } = useParams();

  const handleCall = () => window.location.href = `tel:${mockBusiness.phone}`;
  const handleWhatsApp = () =>
    window.open(`https://wa.me/${mockBusiness.whatsapp.replace(/\D/g, "")}`, "_blank");
  const handleWebsite = () => window.open(mockBusiness.website, "_blank");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Logo */}
            <div className="flex-shrink-0">
              <div className="w-32 h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center">
                <span className="text-6xl font-bold text-primary">
                  {mockBusiness.name.charAt(0)}
                </span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-bold text-foreground mb-2">
                    {mockBusiness.name}
                  </h1>
                  <Badge variant="secondary" className="mb-3">
                    {mockBusiness.category}
                  </Badge>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(mockBusiness.rating)
                              ? "fill-primary text-primary"
                              : "text-muted"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{mockBusiness.rating}</span>
                    <span className="text-muted-foreground">
                      ({mockBusiness.reviewCount} reviews)
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-2 text-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>{mockBusiness.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>{mockBusiness.hours}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCall} size="lg">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
                <Button onClick={handleWhatsApp} variant="secondary" size="lg">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  WhatsApp
                </Button>
                {mockBusiness.website && (
                  <Button onClick={handleWebsite} variant="outline" size="lg">
                    <Globe className="mr-2 h-5 w-5" />
                    Visit Website
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-4">About</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {mockBusiness.description}
                </p>
              </CardContent>
            </Card>

            {/* Posts/Updates */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-foreground mb-6">
                  Recent Updates
                </h2>
                <div className="space-y-6">
                  {mockBusiness.posts.map((post) => (
                    <div key={post.id} className="border-b border-border last:border-0 pb-6 last:pb-0">
                      <h3 className="font-semibold text-lg text-foreground mb-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-2">{post.content}</p>
                      <span className="text-sm text-muted-foreground">{post.date}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Profile Views</span>
                    <span className="font-semibold">{mockBusiness.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reviews</span>
                    <span className="font-semibold">{mockBusiness.reviewCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Rating</span>
                    <span className="font-semibold">{mockBusiness.rating} ⭐</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Phone</p>
                    <p className="font-medium">{mockBusiness.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">WhatsApp</p>
                    <p className="font-medium">{mockBusiness.whatsapp}</p>
                  </div>
                  {mockBusiness.website && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Website</p>
                      <a
                        href={mockBusiness.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessProfilePage;
