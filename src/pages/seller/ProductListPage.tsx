
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

// Minimal product type
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  quantity: number;
  images?: string[];
}

const ProductListPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProducts = async () => {
      setLoading(true);
      if (!user) { setLoading(false); return; }
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });
      if (!error && data) setProducts(data);
      setLoading(false);
    };
    fetchSellerProducts();
  }, [user]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Your Products</h1>
          <Button asChild>
            <Link to="/seller/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Product List</CardTitle>
            <CardDescription>Manage your products</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading products...</p>
            ) : products.length ? (
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-gray-100 rounded">
                        {product.images && product.images[0] && (
                          <img src={product.images[0]} alt={product.name} className="h-full w-full object-cover rounded" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-xs text-muted-foreground">${product.price.toFixed(2)} · {product.quantity} in stock</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" asChild><Link to={`/seller/products/${product.id}/edit`}><Edit /></Link></Button>
                      <Button variant="outline" size="icon" disabled><Trash2 /></Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No products yet.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ProductListPage;
