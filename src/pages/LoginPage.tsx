
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/types";
import { PasswordInput } from "@/components/ui/password-input";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, isLoading: authLoading } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState<UserRole>("buyer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const from = (location.state as any)?.from || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    try {
      setIsLoading(true);
      await signIn(email, password);
      
      // Navigate to the page the user was trying to access, or home if none
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error("Login error:", error);
      // Display specific error message from the API if available
      if (error.message) {
        setError(error.message);
      } else {
        setError("Login failed. Please check your credentials and try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
          <p className="mt-2 text-gray-600">
            Sign in to your account to continue
          </p>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <Tabs defaultValue="buyer" className="w-full" onValueChange={(value) => setUserRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="buyer">Buyer</TabsTrigger>
              <TabsTrigger value="seller">Seller</TabsTrigger>
            </TabsList>
            
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleLogin}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="email"
                    disabled={isLoading}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <PasswordInput
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    disabled={isLoading}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading || authLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </div>
            </form>
            
            <TabsContent value="buyer">
              <p className="mt-4 text-center text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  to="/register?role=buyer" 
                  className="font-medium text-primary hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </TabsContent>
            
            <TabsContent value="seller">
              <p className="mt-4 text-center text-sm text-gray-600">
                Want to sell on our platform?{" "}
                <Link 
                  to="/register?role=seller" 
                  className="font-medium text-primary hover:underline"
                >
                  Create a seller account
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Demo credentials for testing */}
        <div className="text-center text-sm text-gray-500">
          <p>For demonstration purposes:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo1234</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
