
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState("terms");

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">Policies & Terms</h1>
        
        <div className="bg-white rounded-lg border p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full mb-6 grid grid-cols-1 md:grid-cols-4 gap-2">
              <TabsTrigger value="terms">Terms & Conditions</TabsTrigger>
              <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
              <TabsTrigger value="community">Community Standards</TabsTrigger>
              <TabsTrigger value="returns">Returns & Refunds</TabsTrigger>
            </TabsList>
            
            <TabsContent value="terms" className="space-y-6">
              <h2 className="text-2xl font-semibold">Terms & Conditions</h2>
              <p className="text-gray-600">
                Last updated: April 21, 2025
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">1. Introduction</h3>
                <p>
                  Welcome to Gollira Market. These Terms & Conditions govern your use of our platform and the services we offer.
                  By accessing or using our services, you agree to be bound by these Terms.
                </p>
                
                <h3 className="text-xl font-medium">2. Account Registration</h3>
                <p>
                  Users must register an account to access certain features of our platform. You are responsible for maintaining
                  the confidentiality of your account information and for all activities that occur under your account.
                </p>
                
                <h3 className="text-xl font-medium">3. User Conduct</h3>
                <p>
                  When using our platform, you agree not to engage in any activity that could harm the platform, other users,
                  or interfere with the proper functioning of our services. This includes not uploading malicious content or
                  attempting to gain unauthorized access to any part of the system.
                </p>
                
                <h3 className="text-xl font-medium">4. Transactions</h3>
                <p>
                  Gollira Market facilitates connections between buyers and sellers but is not a party to any transaction between
                  users. We are not responsible for the quality, safety, lawfulness, or availability of products offered through our platform.
                </p>
                
                <h3 className="text-xl font-medium">5. Intellectual Property</h3>
                <p>
                  All content on our platform, including but not limited to text, graphics, logos, and software, is the property
                  of Gollira Market or our licensors and is protected by intellectual property laws.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="privacy" className="space-y-6">
              <h2 className="text-2xl font-semibold">Privacy Policy</h2>
              <p className="text-gray-600">
                Last updated: April 21, 2025
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">1. Information We Collect</h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account, update your profile,
                  use interactive features, make a purchase, or communicate with us. We also collect certain information automatically
                  when you use our platform.
                </p>
                
                <h3 className="text-xl font-medium">2. How We Use Your Information</h3>
                <p>
                  We use the information we collect to provide, maintain, and improve our services, process transactions,
                  send communications, protect our platform and users, and comply with legal obligations.
                </p>
                
                <h3 className="text-xl font-medium">3. Information Sharing</h3>
                <p>
                  We may share your information with service providers, business partners, and in response to legal requests.
                  We do not sell your personal information to third parties.
                </p>
                
                <h3 className="text-xl font-medium">4. Security</h3>
                <p>
                  We take reasonable measures to protect your personal information from loss, theft, misuse, and unauthorized
                  access, disclosure, alteration, and destruction.
                </p>
                
                <h3 className="text-xl font-medium">5. Your Choices</h3>
                <p>
                  You have certain rights regarding your personal information, including the right to access, correct, delete,
                  or restrict the processing of your information.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="community" className="space-y-6">
              <h2 className="text-2xl font-semibold">Community Standards</h2>
              <p className="text-gray-600">
                Last updated: April 21, 2025
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">1. Respectful Interactions</h3>
                <p>
                  All users must interact respectfully with each other. We do not tolerate harassment, discrimination, bullying,
                  or harmful behavior directed at other users.
                </p>
                
                <h3 className="text-xl font-medium">2. Honest Representation</h3>
                <p>
                  Sellers must accurately represent their products and services. Misrepresentation of products, including quality,
                  origin, or specifications, is not permitted.
                </p>
                
                <h3 className="text-xl font-medium">3. Fair Pricing</h3>
                <p>
                  Sellers should maintain fair and transparent pricing practices. Price gouging, coordinated price fixing, or
                  misleading pricing tactics are not allowed on our platform.
                </p>
                
                <h3 className="text-xl font-medium">4. Content Guidelines</h3>
                <p>
                  All content posted on our platform, including product descriptions, reviews, and messages, must not contain
                  offensive, harmful, or illegal material.
                </p>
                
                <h3 className="text-xl font-medium">5. Prohibited Products</h3>
                <p>
                  Certain products and services are prohibited from being sold on our platform, including illegal items,
                  dangerous goods, and counterfeit products.
                </p>
              </div>
            </TabsContent>
            
            <TabsContent value="returns" className="space-y-6">
              <h2 className="text-2xl font-semibold">Returns & Refunds</h2>
              <p className="text-gray-600">
                Last updated: April 21, 2025
              </p>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">1. Return Eligibility</h3>
                <p>
                  Products may be eligible for return within 30 days of receipt if they are defective, damaged, or not as described.
                  Individual sellers may have their own return policies, which will be displayed on their product listings.
                </p>
                
                <h3 className="text-xl font-medium">2. Return Process</h3>
                <p>
                  To initiate a return, contact the seller through our platform's messaging system or submit a return request through
                  your account dashboard. All returns must be approved before shipping the item back.
                </p>
                
                <h3 className="text-xl font-medium">3. Refund Timing</h3>
                <p>
                  Refunds will be processed within 14 business days after the seller receives the returned item. The refund will be
                  issued to the original payment method used for the purchase.
                </p>
                
                <h3 className="text-xl font-medium">4. Shipping Costs</h3>
                <p>
                  If a product is defective, damaged, or not as described, the seller will cover the return shipping costs.
                  For other returns, the buyer may be responsible for return shipping costs.
                </p>
                
                <h3 className="text-xl font-medium">5. Non-Returnable Items</h3>
                <p>
                  Certain items cannot be returned due to health and safety regulations or the nature of the products. These include
                  perishable goods, customized products, and digital downloads.
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default PoliciesPage;
