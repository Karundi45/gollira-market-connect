
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Order } from "@/types";
import { format } from "date-fns";

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        // For demonstration purposes, we'll use mock data
        // In a real application, you would fetch this from your database
        const mockOrders: Order[] = [
          {
            id: "ord-1234",
            userId: user.id,
            items: [
              {
                productId: "prod-1",
                name: "Organic Cotton T-Shirt",
                price: 29.99,
                quantity: 2,
                image: "/placeholder.svg",
                sellerId: "seller-1",
                sellerName: "EcoFashion",
              },
            ],
            subtotal: 59.98,
            tax: 4.80,
            shipping: 5.00,
            total: 69.78,
            status: "delivered",
            paymentMethod: "Credit Card",
            paymentStatus: "paid",
            shippingAddress: {
              fullName: "John Doe",
              street: "123 Main St",
              city: "Anytown",
              state: "CA",
              postalCode: "12345",
              country: "USA",
              phone: "555-123-4567",
            },
            createdAt: "2025-03-15T10:30:00Z",
          },
          {
            id: "ord-5678",
            userId: user.id,
            items: [
              {
                productId: "prod-2",
                name: "Recycled Denim Jeans",
                price: 79.99,
                quantity: 1,
                image: "/placeholder.svg",
                sellerId: "seller-2",
                sellerName: "SustainableDenim",
              },
            ],
            subtotal: 79.99,
            tax: 6.40,
            shipping: 5.00,
            total: 91.39,
            status: "shipped",
            paymentMethod: "PayPal",
            paymentStatus: "paid",
            shippingAddress: {
              fullName: "John Doe",
              street: "123 Main St",
              city: "Anytown",
              state: "CA",
              postalCode: "12345",
              country: "USA",
              phone: "555-123-4567",
            },
            createdAt: "2025-04-02T14:22:00Z",
          },
        ];

        setOrders(mockOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load order history",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "shipped":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-yellow-100 text-yellow-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order History</h1>
          <Button variant="outline" asChild>
            <Link to="/account">Back to Account</Link>
          </Button>
        </div>

        {orders.length === 0 ? (
          <Card>
            <CardContent className="py-10 text-center">
              <div className="mb-4 text-4xl">📦</div>
              <h3 className="text-lg font-medium mb-2">No orders yet</h3>
              <p className="text-muted-foreground mb-4">
                Looks like you haven't placed any orders yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="bg-muted/50">
                  <div className="flex flex-col md:flex-row justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Order Placed: {format(new Date(order.createdAt), "PPP")}
                      </p>
                      <CardTitle className="text-lg">
                        Order #{order.id}
                      </CardTitle>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-sm text-muted-foreground mb-1">
                        Total: ${order.total.toFixed(2)}
                      </p>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusBadgeClass(
                          order.status
                        )}`}
                      >
                        {order.status.charAt(0).toUpperCase() +
                          order.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={item.productId}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded bg-muted/60 flex items-center justify-center">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="h-8 w-8 object-cover"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Seller: {item.sellerName}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.price.toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Shipping Address</h4>
                      <div className="text-sm">
                        <p>{order.shippingAddress.fullName}</p>
                        <p>{order.shippingAddress.street}</p>
                        <p>
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.state}{" "}
                          {order.shippingAddress.postalCode}
                        </p>
                        <p>{order.shippingAddress.country}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Order Summary</h4>
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Shipping:</span>
                          <span>${order.shipping.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Tax:</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <Separator className="my-1" />
                        <div className="flex justify-between font-medium">
                          <span>Total:</span>
                          <span>${order.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistoryPage;
