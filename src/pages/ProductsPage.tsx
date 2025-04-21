import React, { useState } from "react";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import ProductFilters from "@/components/products/ProductFilters";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Product } from "@/types";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Professional Wireless Headphones",
    description: "High-quality noise cancelling headphones with premium sound quality.",
    price: 299.99,
    discountPrice: 249.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"],
    quantity: 50,
    category: "headphones",
    sellerId: "seller1",
    sellerName: "TechGear Pro",
    sellerVerified: true,
    rating: 4.8,
    reviews: 254,
    tags: ["headphones", "audio", "wireless"],
    createdAt: "2023-01-15T00:00:00Z",
    updatedAt: "2023-04-10T00:00:00Z"
  },
  {
    id: "2",
    name: "Premium Office Chair",
    description: "Ergonomic design for maximum comfort during long work hours.",
    price: 399.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1503602642458-232111445657?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D"],
    quantity: 35,
    category: "office-chairs",
    sellerId: "seller2",
    sellerName: "Comfort Living",
    sellerVerified: true,
    rating: 4.5,
    reviews: 128,
    tags: ["chair", "office", "ergonomic"],
    createdAt: "2023-02-20T00:00:00Z",
    updatedAt: "2023-03-30T00:00:00Z"
  },
  {
    id: "3",
    name: "Designer Wristwatch",
    description: "Elegant design with precision timekeeping and water resistance.",
    price: 599.99,
    discountPrice: 499.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"],
    quantity: 25,
    category: "watches",
    sellerId: "seller3",
    sellerName: "LuxTime",
    sellerVerified: false,
    rating: 4.7,
    reviews: 89,
    tags: ["watch", "luxury", "accessory"],
    createdAt: "2023-01-05T00:00:00Z",
    updatedAt: "2023-02-15T00:00:00Z"
  },
  {
    id: "4",
    name: "Smart Home Security Camera",
    description: "HD quality with motion detection and smartphone connectivity.",
    price: 149.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1585155770447-2f66e2a397b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHByb2R1Y3R8ZW58MHx8MHx8fDA%3D"],
    quantity: 100,
    category: "security-cameras",
    sellerId: "seller1",
    sellerName: "TechGear Pro",
    sellerVerified: true,
    rating: 4.2,
    reviews: 314,
    tags: ["security", "camera", "smart home"],
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-04-05T00:00:00Z"
  },
  {
    id: "5",
    name: "Professional Tool Set",
    description: "Complete set of high-quality tools for home and professional use.",
    price: 199.99,
    discountPrice: 179.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRvb2xzfGVufDB8fDB8fHww"],
    quantity: 75,
    category: "tools",
    sellerId: "seller4",
    sellerName: "ToolMaster",
    sellerVerified: false,
    rating: 4.6,
    reviews: 173,
    tags: ["tools", "hardware", "professional"],
    createdAt: "2023-02-01T00:00:00Z",
    updatedAt: "2023-03-20T00:00:00Z"
  },
  {
    id: "6",
    name: "Leather Office Notebook",
    description: "Premium leather-bound notebook with high-quality paper.",
    price: 49.99,
    currency: "USD",
    images: ["https://images.unsplash.com/photo-1544247341-88c7f00d0c17?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bm90ZWJvb2t8ZW58MHx8MHx8fDA%3D"],
    quantity: 150,
    category: "notebooks",
    sellerId: "seller5",
    sellerName: "Office Essentials",
    sellerVerified: true,
    rating: 4.3,
    reviews: 92,
    tags: ["notebook", "stationery", "leather"],
    createdAt: "2023-01-25T00:00:00Z",
    updatedAt: "2023-02-28T00:00:00Z"
  }
];

interface FilterState {
  priceRange: [number, number];
  categories: string[];
  verifiedOnly: boolean;
}

const ProductsPage: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [0, 10000],
    categories: [],
    verifiedOnly: false,
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = mockProducts.filter(product => {
    const passesPrice = 
      product.price >= filters.priceRange[0] && 
      product.price <= filters.priceRange[1];
    
    const passesCategory = 
      filters.categories.length === 0 || 
      filters.categories.includes(product.category);
    
    const passesVerified = 
      !filters.verifiedOnly || 
      product.sellerVerified;
    
    return passesPrice && passesCategory && passesVerified;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Products</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <ProductFilters onFilterChange={handleFilterChange} />
          </aside>
          
          <main className="w-full lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
            </div>
            
            {currentProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    image={product.images[0]}
                    price={product.price}
                    discountPrice={product.discountPrice}
                    currency={product.currency}
                    rating={product.rating}
                    sellerName={product.sellerName}
                    sellerVerified={product.sellerVerified}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No products found matching your filters.</p>
                <Button 
                  variant="outline" 
                  onClick={() => handleFilterChange({
                    priceRange: [0, 10000],
                    categories: [],
                    verifiedOnly: false,
                  })}
                  className="mt-4"
                >
                  Clear all filters
                </Button>
              </div>
            )}
            
            {filteredProducts.length > productsPerPage && (
              <Pagination className="mt-8">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => {
                      return (
                        page === 1 || 
                        page === totalPages || 
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      );
                    })
                    .map((page, index, array) => {
                      if (index > 0 && array[index - 1] !== page - 1) {
                        return (
                          <React.Fragment key={`ellipsis-${page}`}>
                            <PaginationItem>
                              <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem key={page}>
                              <PaginationLink 
                                isActive={currentPage === page}
                                onClick={() => setCurrentPage(page)}
                              >
                                {page}
                              </PaginationLink>
                            </PaginationItem>
                          </React.Fragment>
                        );
                      }
                      
                      return (
                        <PaginationItem key={page}>
                          <PaginationLink 
                            isActive={currentPage === page}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      );
                    })}
                  
                  <PaginationItem>
                    <PaginationNext 
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
