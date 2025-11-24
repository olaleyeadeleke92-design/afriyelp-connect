import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/data/categories";

const CategoriesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Browse All Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore businesses across {categories.length} different categories and find exactly what you need
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} {...category} />
          ))}
        </div>
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

export default CategoriesPage;
