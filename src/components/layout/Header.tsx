
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  LogIn,
  User,
  Package
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "../ui/sheet";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";

const Header = () => {
  const isMobile = useIsMobile();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // This would be connected to auth state in production
  const isLoggedIn = false;
  // Explicitly define as UserRole to ensure TypeScript understands the possible values
  const userType: UserRole = "buyer";
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          {/* Mobile Menu */}
          {isMobile && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4 mt-8">
                  <SheetClose asChild>
                    <Link to="/" className="block px-2 py-1 text-lg font-medium">
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/products" className="block px-2 py-1 text-lg font-medium">
                      Products
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/sellers" className="block px-2 py-1 text-lg font-medium">
                      Sellers
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/about" className="block px-2 py-1 text-lg font-medium">
                      About Us
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/contact" className="block px-2 py-1 text-lg font-medium">
                      Contact
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link to="/policies" className="block px-2 py-1 text-lg font-medium">
                      Policies
                    </Link>
                  </SheetClose>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-brand-secondary">Gollira</span>
            <span className="text-xl font-bold ml-1">Market</span>
          </Link>
          
          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden sm:flex items-center ml-8 space-x-4">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Home
              </Link>
              <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
                Products
              </Link>
              <Link to="/sellers" className="text-sm font-medium transition-colors hover:text-primary">
                Sellers
              </Link>
              <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
                About
              </Link>
              <Link to="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                Contact
              </Link>
            </nav>
          )}
        </div>
        
        <div className={cn(
          "flex items-center space-x-1", 
          isSearchOpen && isMobile ? "w-full justify-between" : "justify-end"
        )}>
          {/* Search Bar - Expanded on mobile when active */}
          {isSearchOpen && isMobile ? (
            <>
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full max-w-[300px] h-9"
                autoFocus
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsSearchOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              {isMobile ? (
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              ) : (
                <div className="relative w-full max-w-[300px] mr-2">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full pl-8 h-9"
                  />
                </div>
              )}

              {/* Cart Button */}
              <Link to="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Cart</span>
                </Button>
              </Link>

              {/* Account Button */}
              {isLoggedIn ? (
                <Link to={userType === "seller" as UserRole ? "/seller/dashboard" : "/account"}>
                  <Button variant="ghost" size="icon">
                    {userType === "seller" as UserRole ? (
                      <Package className="h-5 w-5" />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </Link>
              ) : (
                <Link to="/login">
                  <Button variant="default" size="sm" className="hidden sm:flex">
                    <LogIn className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                  <Button variant="ghost" size="icon" className="sm:hidden">
                    <LogIn className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
