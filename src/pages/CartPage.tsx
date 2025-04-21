
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Minus, Plus, ArrowRight, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, applyPromoCode } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");

  const handleApplyPromo = () => {
    if (promoCode) {
      applyPromoCode(promoCode);
    }
  };
  
  const handleCheckout = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to proceed to checkout.",
        variant: "destructive"
      });
      navigate("/login", { state: { redirect: "/checkout" } });
    } else {
      navigate("/checkout");
    }
  };
  
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <div className="mb-6 flex justify-center">
              <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
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
                  {cart.items.map((item) => (
                    <div key={item.productId} className="p-4">
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
                              <p className="text-sm text-muted-foreground">Sold by: {item.sellerName}</p>
                              <p className="text-sm font-medium">
                                {item.discountPrice ? (
                                  <>
                                    <span className="text-gray-700">${item.discountPrice.toFixed(2)}</span>
                                    {' '}
                                    <span className="text-gray-400 line-through">${item.price.toFixed(2)}</span>
                                  </>
                                ) : (
                                  <span>${item.price.toFixed(2)}</span>
                                )}
                              </p>
                              <button 
                                className="text-sm text-red-600 hover:underline mt-1 flex items-center"
                                onClick={() => removeFromCart(item.productId)}
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
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                        
                        <div className="col-span-3 text-right font-medium">
                          ${((item.discountPrice || item.price) * item.quantity).toFixed(2)}
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
                    <span>${cart.subtotal.toFixed(2)}</span>
                  </div>
                  
                  {cart.discount && cart.discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-${cart.discount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${cart.tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{cart.shipping > 0 ? `$${cart.shipping.toFixed(2)}` : 'Free'}</span>
                  </div>
                  
                  <div className="border-t pt-3 mt-3 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button 
                    className="w-full" 
                    onClick={handleCheckout}
                    disabled={cart.items.length === 0}
                  >
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
                  />
                  <Button 
                    variant="outline" 
                    onClick={handleApplyPromo}
                    disabled={!promoCode}
                  >
                    Apply
                  </Button>
                </div>
                {cart.discount && cart.discount > 0 && (
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
