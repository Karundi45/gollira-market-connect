
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  discountPrice?: number;
  currency?: string;
  rating?: number;
  sellerName: string;
  sellerVerified: boolean;
  className?: string;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  discountPrice,
  currency = "USD",
  rating = 0,
  sellerName,
  sellerVerified,
  className,
}: ProductCardProps) => {
  const currencySymbol = currency === "USD" ? "$" : currency;
  const isDiscounted = !!discountPrice && discountPrice < price;
  const displayPrice = isDiscounted ? discountPrice : price;
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  const handleAddToCart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault(); // Prevent Link navigation when button clicked
    setAdding(true);
    addToCart({
      productId: id,
      name,
      price,
      discountPrice,
      quantity: 1,
      image,
      sellerId: "",
      sellerName,
    });
    setTimeout(() => setAdding(false), 600); // fake loading for better UX, real API would use a promise
  };

  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <Link to={`/products/${id}`} className="block">
        <div className="aspect-square relative overflow-hidden">
          <img
            src={image}
            alt={name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
          {isDiscounted && (
            <Badge className="absolute top-2 right-2 bg-red-500 hover:bg-red-600">
              {Math.round(((price - discountPrice) / price) * 100)}% OFF
            </Badge>
          )}
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-lg line-clamp-2">{name}</h3>
            {rating > 0 && (
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn("font-bold text-lg", isDiscounted ? "text-red-600" : "")}>
              {currencySymbol}{formatPrice(displayPrice)}
            </span>
            {isDiscounted && (
              <span className="text-muted-foreground line-through text-sm">
                {currencySymbol}{formatPrice(price)}
              </span>
            )}
          </div>
          <div className="mt-2 flex items-center">
            <p className="text-sm text-muted-foreground">Sold by: {sellerName}</p>
            {sellerVerified && (
              <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-600 hover:bg-blue-200 hover:text-blue-700">
                Verified
              </Badge>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <Button 
          variant="outline" 
          className="w-full gap-2" 
          onClick={handleAddToCart}
          disabled={adding}
        >
          <ShoppingCart className="h-4 w-4" />
          {adding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

