import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: LucideIcon;
  name: string;
  count: number;
  slug: string;
}

const CategoryCard = ({ icon: Icon, name, count, slug }: CategoryCardProps) => {
  return (
    <Link to={`/listings?category=${slug}`}>
      <Card className="p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{count} businesses</p>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CategoryCard;
