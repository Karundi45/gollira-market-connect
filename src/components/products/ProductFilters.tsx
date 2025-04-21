
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  verifiedOnly: boolean;
}

// Updated precise categories with specific names (matching mock data & user-friendly)
const categories = [
  { id: "headphones", label: "Headphones & Audio" },
  { id: "office-chairs", label: "Office Chairs" },
  { id: "watches", label: "Watches" },
  { id: "security-cameras", label: "Security Cameras" },
  { id: "tools", label: "Tools & Equipment" },
  { id: "notebooks", label: "Notebooks & Stationery" },
  { id: "furniture", label: "Furniture" },
  { id: "electronics", label: "Electronics" },
  { id: "office-supplies", label: "Office Supplies" },
  { id: "industrial", label: "Industrial" },
  { id: "automotive", label: "Automotive" },
  { id: "medical", label: "Medical" }
];

const ProductFilters = ({ onFilterChange }: FilterProps) => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    categories: [],
    verifiedOnly: false,
  });

  const handlePriceChange = (value: number[]) => {
    // Ensure we always have two values
    const newPriceRange: [number, number] = [
      value[0] || 0,
      value[1] || 10000
    ];
    
    const newFilters = {
      ...filters,
      priceRange: newPriceRange,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);
    
    const newFilters = {
      ...filters,
      categories: newCategories,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleVerifiedChange = (checked: boolean) => {
    const newFilters = {
      ...filters,
      verifiedOnly: checked,
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 10000],
      categories: [],
      verifiedOnly: false,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearFilters}
          className="h-8 text-xs"
        >
          Clear all
        </Button>
      </div>
      {(filters.categories.length > 0 || filters.verifiedOnly) && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Active filters:</p>
          <div className="flex flex-wrap gap-2">
            {filters.categories.map((category) => (
              <Badge 
                key={category} 
                variant="secondary"
                className="flex items-center gap-1"
              >
                {categories.find(c => c.id === category)?.label || category}
                <button 
                  className="ml-1 hover:bg-muted rounded-full"
                  onClick={() => handleCategoryChange(category, false)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove {category} filter</span>
                </button>
              </Badge>
            ))}
            {filters.verifiedOnly && (
              <Badge 
                variant="secondary"
                className="flex items-center gap-1"
              >
                Verified Sellers
                <button 
                  className="ml-1 hover:bg-muted rounded-full"
                  onClick={() => handleVerifiedChange(false)}
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove verified filter</span>
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}
      <Accordion type="multiple" defaultValue={["price", "category", "seller"]} className="w-full">
        {/* Price Range */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider 
                defaultValue={[filters.priceRange[0], filters.priceRange[1]]} 
                max={10000} 
                step={100} 
                onValueChange={handlePriceChange} 
              />
              <div className="flex justify-between">
                <span className="text-sm">${filters.priceRange[0]}</span>
                <span className="text-sm">${filters.priceRange[1]}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Categories */}
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={filters.categories.includes(category.id)}
                    onCheckedChange={(checked) => 
                      handleCategoryChange(category.id, checked as boolean)
                    }
                  />
                  <label 
                    htmlFor={`category-${category.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category.label}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        {/* Seller Verification */}
        <AccordionItem value="seller">
          <AccordionTrigger>Seller</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="verified-sellers" 
                checked={filters.verifiedOnly}
                onCheckedChange={(checked) => handleVerifiedChange(checked as boolean)}
              />
              <label 
                htmlFor="verified-sellers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Verified sellers only
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;

