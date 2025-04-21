
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock seller data
const mockSellers = [
  {
    id: "1",
    name: "TechGlobal Solutions",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3603?w=300&h=300&fit=crop",
    category: "Electronics",
    location: "San Francisco, USA",
    rating: 4.8,
    reviewCount: 243,
    verified: true,
    productCount: 128,
    description: "Leading provider of cutting-edge electronic components and devices for businesses worldwide."
  },
  {
    id: "2",
    name: "EcoFriendly Materials",
    logo: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=300&h=300&fit=crop",
    category: "Home & Garden",
    location: "Amsterdam, Netherlands",
    rating: 4.6,
    reviewCount: 187,
    verified: true,
    productCount: 96,
    description: "Sustainable materials and eco-friendly products for environmentally conscious businesses."
  },
  {
    id: "3",
    name: "Fashion Forward Inc.",
    logo: "https://images.unsplash.com/photo-1606836576983-8b458e75221d?w=300&h=300&fit=crop",
    category: "Apparel",
    location: "Milan, Italy",
    rating: 4.9,
    reviewCount: 312,
    verified: true,
    productCount: 215,
    description: "Trendsetting apparel manufacturer specializing in high-quality clothing for retail chains."
  },
  {
    id: "4",
    name: "Industrial Machinery Co.",
    logo: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?w=300&h=300&fit=crop",
    category: "Industrial",
    location: "Chicago, USA",
    rating: 4.7,
    reviewCount: 156,
    verified: true,
    productCount: 74,
    description: "Heavy machinery and industrial equipment for manufacturing and construction sectors."
  },
  {
    id: "5",
    name: "Global Foods Ltd.",
    logo: "https://images.unsplash.com/photo-1542744173-8659462747b9?w=300&h=300&fit=crop",
    category: "Food & Beverage",
    location: "Singapore",
    rating: 4.5,
    reviewCount: 203,
    verified: true,
    productCount: 189,
    description: "International supplier of premium food products and ingredients for restaurants and retailers."
  },
  {
    id: "6",
    name: "Medical Supplies Pro",
    logo: "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?w=300&h=300&fit=crop",
    category: "Healthcare",
    location: "Toronto, Canada",
    rating: 4.9,
    reviewCount: 276,
    verified: true,
    productCount: 112,
    description: "High-quality medical supplies and equipment for healthcare facilities and practitioners."
  }
];

// Category filter options
const categories = [
  "All Categories",
  "Electronics",
  "Home & Garden",
  "Apparel",
  "Industrial",
  "Food & Beverage",
  "Healthcare"
];

const SellersPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  // Filter sellers based on search query and selected category
  const filteredSellers = mockSellers.filter(seller => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         seller.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || seller.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-6">Verified Sellers</h1>
        <p className="text-gray-600 mb-8 max-w-3xl">
          Discover our network of trusted and verified sellers providing quality products across various industries.
          All sellers on Gollira Market undergo thorough verification to ensure reliable business transactions.
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 mb-10">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search sellers by name or description"
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {filteredSellers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSellers.map((seller) => (
              <Card key={seller.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex p-4 border-b">
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={seller.logo} 
                        alt={seller.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-lg">{seller.name}</h3>
                        {seller.verified && (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-600">
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{seller.category}</p>
                      <p className="text-sm text-muted-foreground">{seller.location}</p>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <p className="text-sm text-gray-600">{seller.description}</p>
                    <div className="flex flex-wrap gap-2 justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">
                          ★ {seller.rating.toFixed(1)}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          ({seller.reviewCount} reviews)
                        </span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {seller.productCount} products
                      </span>
                    </div>
                    <Button className="w-full">View Profile</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No sellers found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SellersPage;
