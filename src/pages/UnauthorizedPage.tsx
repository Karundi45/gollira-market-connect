
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";

const UnauthorizedPage = () => {
  const { userRole } = useAuth();

  return (
    <Layout>
      <div className="container flex flex-col items-center justify-center py-20">
        <div className="text-center space-y-6 max-w-lg">
          <h1 className="text-4xl font-bold">Access Denied</h1>
          <div className="p-6 bg-amber-50 border border-amber-200 rounded-lg">
            <p className="text-amber-800 mb-2">
              You don't have permission to access this page.
            </p>
            <p className="text-amber-700">
              {userRole === "buyer" 
                ? "This area is restricted to sellers. Please register a seller account if you wish to sell products."
                : "This area is restricted to buyers. Please use a buyer account to access this content."}
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button asChild>
              <Link to="/">Go to Home</Link>
            </Button>
            {userRole === "buyer" ? (
              <Button variant="outline" asChild>
                <Link to="/register?role=seller">Register as Seller</Link>
              </Button>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/register?role=buyer">Register as Buyer</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UnauthorizedPage;
