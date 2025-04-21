
import Layout from "@/components/layout/Layout";

const AboutPage = () => {
  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-4xl font-bold mb-8">About Gollira Market</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Gollira Market is dedicated to connecting verified sellers with business buyers worldwide, 
              creating a trustworthy B2B marketplace that empowers businesses of all sizes.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p className="text-gray-600 mb-6">
              We envision a world where businesses can easily discover reliable partners and products,
              facilitating seamless global trade and fostering economic growth across markets.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="list-disc pl-6 text-gray-600 mb-6">
              <li className="mb-2">Trustworthiness - We verify all sellers to ensure a reliable marketplace.</li>
              <li className="mb-2">Innovation - We constantly improve our platform to better serve our users.</li>
              <li className="mb-2">Inclusivity - We welcome businesses of all sizes from around the world.</li>
              <li className="mb-2">Sustainability - We promote responsible business practices.</li>
              <li>Community - We build connections that transcend transactions.</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Company Overview</h2>
            <p className="text-gray-600 mb-6">
              Founded in 2023, Gollira Market has rapidly grown to become a leading B2B marketplace platform.
              Our team of dedicated professionals works tirelessly to create seamless connections between
              buyers and verified sellers across numerous industries.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Our Team</h2>
            <p className="text-gray-600 mb-6">
              Our diverse team brings together expertise in e-commerce, marketplace development, 
              supply chain management, and customer experience design. With backgrounds spanning 
              technology, retail, manufacturing, and logistics, our team understands the complex 
              needs of B2B transactions.
            </p>
            
            <h2 className="text-2xl font-semibold mb-4">Join Our Journey</h2>
            <p className="text-gray-600">
              Whether you're a buyer seeking reliable suppliers or a seller looking to expand your 
              business reach, we invite you to join our growing marketplace community. Together, 
              we're reshaping how businesses connect and trade globally.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
