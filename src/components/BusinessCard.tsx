import { Phone, MessageCircle, Globe, MapPin, Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

interface BusinessCardProps {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string;
  website?: string;
  logo?: string;
  rating?: number;
}

const BusinessCard = ({
  id,
  name,
  category,
  description,
  address,
  phone,
  whatsapp,
  website,
  logo,
  rating = 4.5,
}: BusinessCardProps) => {
  const handleCall = () => window.location.href = `tel:${phone}`;
  const handleWhatsApp = () => window.open(`https://wa.me/${whatsapp.replace(/\D/g, '')}`, '_blank');
  const handleWebsite = () => website && window.open(website, '_blank');

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300">
      <CardHeader className="p-0">
        <Link to={`/business/${id}`}>
          <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/30 flex items-center justify-center">
            {logo ? (
              <img src={logo} alt={name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-6xl font-bold text-primary/40">{name.charAt(0)}</span>
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <Link to={`/business/${id}`}>
                <h3 className="font-bold text-xl text-foreground hover:text-primary transition-colors">
                  {name}
                </h3>
              </Link>
              <Badge variant="secondary">{category}</Badge>
            </div>
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(rating) ? 'fill-primary text-primary' : 'text-muted'
                  }`}
                />
              ))}
              <span className="text-sm text-muted-foreground ml-1">({rating})</span>
            </div>
            <p className="text-muted-foreground text-sm line-clamp-2">{description}</p>
            <div className="flex items-center gap-1 mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{address}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <Button
              onClick={handleCall}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
            <Button
              onClick={handleWhatsApp}
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              Chat
            </Button>
            {website && (
              <Button
                onClick={handleWebsite}
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
              >
                <Globe className="h-4 w-4" />
                Visit
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BusinessCard;
