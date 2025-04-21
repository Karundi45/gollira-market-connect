
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const NewProductPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    setError("");
    const { name, price, quantity, description } = form;
    const { error: supaError } = await supabase.from("products").insert([{
      name,
      price: Number(price),
      quantity: Number(quantity),
      description,
      seller_id: user.id,
    }]);
    setLoading(false);
    if (!supaError) {
      navigate("/seller/products");
    } else {
      setError(supaError.message || "Failed to create product.");
    }
  };

  return (
    <Layout>
      <div className="container py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block font-medium mb-1">Product Name</label>
                <Input name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Price</label>
                <Input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Quantity</label>
                <Input name="quantity" type="number" value={form.quantity} onChange={handleChange} required />
              </div>
              <div>
                <label className="block font-medium mb-1">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded min-h-[60px]" />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Add Product"}</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default NewProductPage;
