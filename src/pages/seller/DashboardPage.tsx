
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Package, 
  Truck, 
  DollarSign, 
  Users, 
  ChevronRight, 
  Plus,
  LineChart
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  images?: string[];
}

const DashboardPage = () => {
  const { user, userRole, isVerified } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!user) return;
      
      try {
        setIsLoading(true);
        // For now, let's use a mock array since the products table doesn't exist yet
        // We'll update this once the products table is created
        
        // Mock data for development
        setProducts([
          // Sample products - replace with actual data when table exists
        ]);
        
        /*
        // This code will be uncommented when products table exists
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('seller_id', user.id);
          
        if (error) throw error;
        
        setProducts(data || []);
        */
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProducts();
  }, [user]);
  
  const dashboardStats = [
    {
      title: "Products",
      value: products.length,
      icon: <Package className="h-5 w-5" />,
      colorClass: "bg-blue-50 text-blue-700",
    },
    {
      title: "Orders",
      value: 0,
      icon: <Truck className="h-5 w-5" />,
      colorClass: "bg-green-50 text-green-700",
    },
    {
      title: "Revenue",
      value: "$0.00",
      icon: <DollarSign className="h-5 w-5" />,
      colorClass: "bg-amber-50 text-amber-700",
    },
    {
      title: "Customers",
      value: 0,
      icon: <Users className="h-5 w-5" />,
      colorClass: "bg-purple-50 text-purple-700",
    },
  ];

  return (
    <Layout>
      <div className="container py-10">
        {!isVerified && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="flex-1">
                <h3 className="font-semibold text-amber-800">Seller verification required</h3>
                <p className="text-amber-700 text-sm mt-1">
                  Your account needs to be verified before you can sell products. Complete your profile and submit verification documents.
                </p>
              </div>
              <Button variant="outline" className="text-amber-700 border-amber-300" asChild>
                <Link to="/seller/verification">Get Verified</Link>
              </Button>
            </div>
          </div>
        )}
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <Button asChild>
            <Link to="/seller/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {dashboardStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                  </div>
                  <div className={`p-2 rounded-full ${stat.colorClass}`}>
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Tabs defaultValue="products" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products" className="mt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Your Products</CardTitle>
                    <CardDescription>Manage your product listings</CardDescription>
                  </div>
                  <Button variant="outline" asChild>
                    <Link to="/seller/products">
                      View All
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <p className="text-center py-8">Loading products...</p>
                ) : products.length > 0 ? (
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between border-b pb-4">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded bg-gray-100">
                            {product.images && product.images[0] && (
                              <img 
                                src={product.images[0]} 
                                alt={product.name} 
                                className="h-full w-full object-cover rounded"
                              />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              ${product.price.toFixed(2)} · {product.quantity} in stock
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" asChild>
                          <Link to={`/seller/products/${product.id}`}>Edit</Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">You haven't added any products yet.</p>
                    <Button className="mt-4" asChild>
                      <Link to="/seller/products/new">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Your First Product
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="orders" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Manage your customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No orders yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Orders will appear here once customers start purchasing your products.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="analytics" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
                <CardDescription>View your shop performance metrics</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px] flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="mx-auto h-16 w-16 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 font-medium">No analytics data yet</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Analytics will be available once you start getting sales.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default DashboardPage;
