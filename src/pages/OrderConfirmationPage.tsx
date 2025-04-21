
import { useEffect } from "react";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";
import { useLocation, Link, Navigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface OrderDetails {
  orderId: string;
  orderDate: string;
  total: number;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  paymentMethod: string;
}

const OrderConfirmationPage = () => {
  const location = useLocation();
  const orderDetails: OrderDetails | undefined = location.state?.orderDetails;
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  // If no order details are present, redirect to home page
  if (!orderDetails) {
    return <Navigate to="/" replace />;
  }
  
  const formattedDate = new Date(orderDetails.orderDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold">Order Confirmed!</h1>
            <p className="text-gray-600 mt-2">
              Thank you for your order. We've received your purchase and will process it right away.
            </p>
          </div>
          
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Order #{orderDetails.orderId}</h2>
                <p className="text-muted-foreground">Placed on {formattedDate}</p>
              </div>
              
              <Separator className="mb-4" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Shipping Address</h3>
                  <p className="text-muted-foreground">
                    {orderDetails.shippingAddress.fullName}<br />
                    {orderDetails.shippingAddress.street}<br />
                    {orderDetails.shippingAddress.city}, {orderDetails.shippingAddress.state} {orderDetails.shippingAddress.postalCode}<br />
                    {orderDetails.shippingAddress.country}<br />
                    Phone: {orderDetails.shippingAddress.phone}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Payment Method</h3>
                  <p className="text-muted-foreground">{orderDetails.paymentMethod}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Order Total</h3>
                  <p className="text-xl font-semibold">${orderDetails.total.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
              <Link to="/">
                <Button variant="default">
                  Continue Shopping
                </Button>
              </Link>
              
              <Link to="/account">
                <Button variant="outline">
                  View Order History
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <ShoppingBag className="h-4 w-4" />
                <span>An order confirmation email will be sent shortly.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderConfirmationPage;
