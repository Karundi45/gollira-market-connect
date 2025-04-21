
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";

// Mock data for demonstration
const featuredProducts = [
  {
    id: "1",
    name: "Professional Office Chair",
    image: "https://placehold.co/600x600/e9ecef/495057?text=Office+Chair",
    price: 299.99,
    discountPrice: 249.99,
    rating: 4.5,
    sellerName: "Office Essentials Inc.",
    sellerVerified: true,
  },
  {
    id: "2",
    name: "Industrial Laser Cutter",
    image: "https://placehold.co/600x600/e9ecef/495057?text=Laser+Cutter",
    price: 3499.99,
    rating: 4.8,
    sellerName: "ProMachinery Ltd.",
    sellerVerified: true,
  },
  {
    id: "3",
    name: "Bulk Packaging Materials",
    image: "https://placehold.co/600x600/e9ecef/495057?text=Packaging",
    price: 127.50,
    discountPrice: 99.99,
    rating: 4.2,
    sellerName: "Package Solutions",
    sellerVerified: false,
  },
  {
    id: "4",
    name: "Commercial Coffee Machine",
    image: "https://placehold.co/600x600/e9ecef/495057?text=Coffee+Machine",
    price: 899.99,
    rating: 4.7,
    sellerName: "Hospitality Supplies Co.",
    sellerVerified: true,
  }
];

const categories = [
  { id: "electronics", name: "Electronics", icon: "🖥️" },
  { id: "office", name: "Office Supplies", icon: "📎" },
  { id: "furniture", name: "Furniture", icon: "🪑" },
  { id: "industrial", name: "Industrial", icon: "⚙️" },
  { id: "automotive", name: "Automotive", icon: "🚗" },
  { id: "medical", name: "Medical", icon: "🩺" }
];

const HomePage = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-brand-light to-brand py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="font-bold text-4xl md:text-5xl mb-6 text-brand-dark">
              Connect with Verified B2B Suppliers Worldwide
            </h1>
            <p className="text-lg mb-8 text-gray-700">
              Gollira Market connects businesses with trusted suppliers for seamless 
              wholesale purchasing, secure transactions, and verified quality products.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-brand-secondary hover:bg-brand-tertiary">
                <Link to="/products">Browse Products</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/register">Become a Seller</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                to={`/products?category=${category.id}`} 
                key={category.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center"
              >
                <span className="text-4xl mb-3">{category.icon}</span>
                <h3 className="font-medium">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
            <Button asChild variant="outline">
              <Link to="/products">View All</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                price={product.price}
                discountPrice={product.discountPrice}
                rating={product.rating}
                sellerName={product.sellerName}
                sellerVerified={product.sellerVerified}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">Why Choose Gollira Market</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Verified Sellers</h3>
              <p className="text-gray-600">
                Every seller undergoes a thorough verification process to ensure quality and reliability.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Secure Payments</h3>
              <p className="text-gray-600">
                Multiple international payment options with advanced security measures.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow text-center">
              <div className="w-16 h-16 bg-brand-light rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-brand-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">B2B Focused</h3>
              <p className="text-gray-600">
                Platform built specifically for business-to-business transactions and relationships.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-brand-secondary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to grow your business?</h2>
          <p className="text-lg mb-8 text-white/80 max-w-2xl mx-auto">
            Join thousands of businesses who use Gollira Market to find reliable suppliers and quality products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-brand-secondary hover:bg-gray-100">
              <Link to="/register">Create Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
