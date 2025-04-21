
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">1. Information We Collect</h2>
            <p className="mb-4">
              We collect information that you provide directly to us, such as when you create an account,
              make a purchase, or contact customer service. This may include your name, email address,
              postal address, phone number, and payment information.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">
              We use the information we collect to provide, maintain, and improve our services,
              process transactions, send you technical notices and support messages, and respond to your comments and questions.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">3. Information Sharing</h2>
            <p className="mb-4">
              We may share your information with third-party vendors and service providers who need access to your
              information to provide services to us, such as payment processing and shipping.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">4. Data Security</h2>
            <p className="mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse,
              unauthorized access, disclosure, alteration, and destruction.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">5. Cookies and Tracking Technologies</h2>
            <p className="mb-4">
              We and our third-party providers use cookies, web beacons, and other tracking technologies to
              analyze website traffic, improve our services, and understand how you use our services.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">6. Your Choices</h2>
            <p className="mb-4">
              You may update, correct, or delete your account information at any time by logging into your account.
              You may also opt out of receiving promotional communications from us by following the instructions in those messages.
            </p>
            
            <h2 className="text-xl font-semibold mb-4">7. Contact Us</h2>
            <p className="mb-4">
              If you have any questions about our Privacy Policy, please contact us.
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
