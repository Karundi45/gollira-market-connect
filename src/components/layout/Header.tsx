
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  LogIn,
  User,
  Package,
  LogOut,
  Settings,
  ShoppingBag
} from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Header = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, userRole, signOut } = useAuth();
  
  const getUserInitials = () => {
    if (!user?.email) return "U";
    return user.email.charAt(0).toUpperCase();
  };
  
  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Sign out error:", error);
      toast({
        variant: "destructive",
        title: "Error signing out",
        description: "An error occurred while signing out. Please try again.",
      });
    }
  };
  
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
                  
                  {user && (
                    <>
                      <div className="h-px bg-border my-2"></div>
                      {userRole === "seller" && (
                        <SheetClose asChild>
                          <Link to="/seller/dashboard" className="block px-2 py-1 text-lg font-medium">
                            Seller Dashboard
                          </Link>
                        </SheetClose>
                      )}
                      <SheetClose asChild>
                        <Link to={userRole === "seller" ? "/seller/account" : "/account"} className="block px-2 py-1 text-lg font-medium">
                          Account
                        </Link>
                      </SheetClose>
                      <button 
                        onClick={handleSignOut}
                        className="flex items-center px-2 py-1 text-lg font-medium text-red-600 hover:bg-red-50 rounded-md"
                      >
                        <LogOut className="mr-2 h-5 w-5" />
                        Sign Out
                      </button>
                    </>
                  )}
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
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" />
                        <AvatarFallback>{getUserInitials()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link to="/account" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/orders" className="cursor-pointer">
                          <ShoppingBag className="mr-2 h-4 w-4" />
                          <span>Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="cursor-pointer">
                          <Settings className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    
                    {userRole === "seller" && (
                      <>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem asChild>
                            <Link to="/seller/dashboard" className="cursor-pointer">
                              <Package className="mr-2 h-4 w-4" />
                              <span>Seller Dashboard</span>
                            </Link>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </>
                    )}
                    
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
