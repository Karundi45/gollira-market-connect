
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const TermsPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">1. Introduction</h2>
            <p className="mb-4">
              Welcome to our marketplace. These Terms and Conditions govern your use of our website and services.
              By accessing or using our services, you agree to be bound by these Terms.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">2. User Accounts</h2>
            <p className="mb-4">
              When you create an account with us, you must provide accurate and complete information. 
              You are responsible for safeguarding your account and for all activities that occur under your account.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">3. Purchasing Products</h2>
            <p className="mb-4">
              Products displayed on our marketplace are subject to availability. We reserve the right to limit 
              quantities of purchases and to refuse service to anyone at any time.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">4. Payment and Billing</h2>
            <p className="mb-4">
              By providing payment information, you represent that you are authorized to use the payment method.
              We reserve the right to refuse or cancel orders if fraud is suspected.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">5. Shipping and Delivery</h2>
            <p className="mb-4">
              Shipping times are estimates and not guaranteed. Risk of loss and title for items purchased pass 
              to you upon delivery of the items to the carrier.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">6. Returns and Refunds</h2>
            <p className="mb-4">
              Our return policy allows for returns within 30 days of receipt. Items must be in original condition 
              with all original packaging and accessories.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">7. Changes to Terms</h2>
            <p className="mb-4">
              We reserve the right to modify these Terms at any time. Your continued use of our services following 
              any changes indicates your acceptance of the new Terms.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">8. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about these Terms, please contact us.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TermsPage;
