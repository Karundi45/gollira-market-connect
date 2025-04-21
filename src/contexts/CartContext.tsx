
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "@/hooks/use-toast";
import { CartItem, Cart } from "@/types";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface CartContextType {
  cart: Cart;
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isLoading: boolean;
  applyPromoCode: (code: string) => boolean;
}

const initialCart: Cart = {
  items: [],
  subtotal: 0,
  tax: 0,
  shipping: 0,
  total: 0
};

const CartContext = createContext<CartContextType>({
  cart: initialCart,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  isLoading: false,
  applyPromoCode: () => false,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart>(initialCart);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Calculate cart totals when items change
  const calculateTotals = (items: CartItem[]) => {
    const subtotal = items.reduce((sum, item) => {
      const price = item.discountPrice || item.price;
      return sum + (price * item.quantity);
    }, 0);
    
    const tax = subtotal * 0.07; // 7% tax rate
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const total = subtotal + tax + shipping;
    
    return {
      items,
      subtotal,
      tax,
      shipping,
      total
    };
  };

  // Load cart from localStorage on init
  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        setCart(calculateTotals(parsedCart.items));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add item to cart
  const addToCart = (newItem: CartItem) => {
    setCart(prevCart => {
      // Check if item already exists in cart
      const existingItemIndex = prevCart.items.findIndex(
        item => item.productId === newItem.productId
      );
      
      let updatedItems;
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        updatedItems = [...prevCart.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        toast({
          title: "Cart updated",
          description: `Increased quantity of ${newItem.name} in your cart.`
        });
      } else {
        // Add new item
        updatedItems = [...prevCart.items, newItem];
        toast({
          title: "Added to cart",
          description: `${newItem.name} has been added to your cart.`
        });
      }
      
      return calculateTotals(updatedItems);
    });
  };

  // Remove item from cart
  const removeFromCart = (productId: string) => {
    setCart(prevCart => {
      const updatedItems = prevCart.items.filter(item => item.productId !== productId);
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart."
      });
      return calculateTotals(updatedItems);
    });
  };

  // Update item quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      );
      return calculateTotals(updatedItems);
    });
  };

  // Clear cart
  const clearCart = () => {
    setCart(initialCart);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart."
    });
  };

  // Apply promo code
  const applyPromoCode = (code: string): boolean => {
    const validPromos = {
      'DISCOUNT10': 0.1,
      'WELCOME20': 0.2,
      'SUMMER15': 0.15
    };
    
    const promoKey = code.toUpperCase() as keyof typeof validPromos;
    
    if (validPromos[promoKey]) {
      setCart(prevCart => {
        const discount = prevCart.subtotal * validPromos[promoKey];
        return {
          ...prevCart,
          discount,
          total: prevCart.subtotal - discount + prevCart.tax + prevCart.shipping
        };
      });
      
      toast({
        title: "Promo code applied",
        description: `Discount of ${validPromos[promoKey] * 100}% has been applied to your order.`
      });
      
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Invalid promo code",
      description: "The promo code you entered is not valid."
    });
    
    return false;
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isLoading,
      applyPromoCode,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
