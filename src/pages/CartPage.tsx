
import { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ArrowRight } from "lucide-react";

// Mock cart data
const initialCartItems = [
  {
    id: "1",
    name: "Premium Wireless Keyboard",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
    price: 89.99,
    quantity: 1,
    seller: "TechGlobal Solutions"
  },
  {
    id: "2",
    name: "Ergonomic Office Chair",
    image: "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?w=300&h=300&fit=crop",
    price: 249.99,
    quantity: 2,
    seller: "Office Comfort Pro"
  },
  {
    id: "3",
    name: "LED Desk Lamp with Wireless Charging",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop",
    price: 59.99,
    quantity: 1,
    seller: "Home Innovations"
  }
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  const applyPromo = () => {
    if (promoCode.toLowerCase() === "discount10") {
      setPromoApplied(true);
    }
  };
  
  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal - discount + shipping;
  
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added any products to your cart yet.</p>
            <Link to="/products">
              <Button size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border">
                <div className="p-4 border-b bg-gray-50">
                  <div className="grid grid-cols-12 gap-4 text-sm font-medium">
                    <div className="col-span-6 md:col-span-7">Product</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-3 text-right">Total</div>
                  </div>
                </div>
                
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-4">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        <div className="col-span-6 md:col-span-7">
                          <div className="flex items-center">
                            <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="text-sm text-muted-foreground">Sold by: {item.seller}</p>
                              <p className="text-sm font-medium">${item.price.toFixed(2)}</p>
                              <button 
                                className="text-sm text-red-600 hover:underline mt-1 flex items-center"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="col-span-2">
                          <div className="flex items-center justify-center border rounded">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="col-span-3 text-right font-medium">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  
                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="w-full">
                    Proceed to Checkout
                  </Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-4">Promo Code</h2>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Enter code" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    disabled={promoApplied}
                  />
                  <Button 
                    variant="outline" 
                    onClick={applyPromo}
                    disabled={!promoCode || promoApplied}
                  >
                    Apply
                  </Button>
                </div>
                {promoApplied && (
                  <p className="text-sm text-green-600 mt-2">Promo code applied successfully!</p>
                )}
              </div>
              
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-lg font-semibold mb-2">Need Help?</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Our customer support team is available to assist you with any questions.
                </p>
                <Link to="/contact">
                  <Button variant="outline" className="w-full flex items-center justify-center">
                    Contact Support
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
