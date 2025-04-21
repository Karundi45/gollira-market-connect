
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Lock, ShieldCheck, HelpCircle } from "lucide-react";

const PoliciesPage = () => {
  const policies = [
    {
      title: "Terms and Conditions",
      description: "Our terms of service and user agreement",
      icon: <FileText className="h-6 w-6 text-primary" />,
      link: "/policies/terms",
    },
    {
      title: "Privacy Policy",
      description: "How we collect, use, and protect your data",
      icon: <Lock className="h-6 w-6 text-primary" />,
      link: "/policies/privacy",
    },
    {
      title: "Return Policy",
      description: "Our policy for returns and refunds",
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      link: "#",
    },
    {
      title: "FAQ",
      description: "Frequently asked questions about our marketplace",
      icon: <HelpCircle className="h-6 w-6 text-primary" />,
      link: "#",
    },
  ];

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-6">Policies & Legal Information</h1>
        <p className="text-gray-600 mb-8 max-w-2xl">
          We are committed to transparency and providing clear information about our policies.
          Please review the following documents to understand your rights and our responsibilities.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {policies.map((policy, index) => (
            <Card key={index} className="transition-all hover:shadow-md">
              <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  {policy.icon}
                </div>
                <CardTitle>{policy.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{policy.description}</p>
                <Button variant="outline" asChild>
                  <Link to={policy.link}>View Policy</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Have Questions?</h2>
          <p className="mb-4">
            If you have any questions about our policies or need further clarification,
            please don't hesitate to contact our support team.
          </p>
          <Button asChild>
            <Link to="/contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default PoliciesPage;
