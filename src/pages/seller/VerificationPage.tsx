
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, Upload, Loader2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const VerificationPage = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Step 1: Business Information
  const [businessName, setBusinessName] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  
  // Step 2: Documents
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [businessDocument, setBusinessDocument] = useState<File | null>(null);
  const [idDocumentUrl, setIdDocumentUrl] = useState("");
  const [businessDocumentUrl, setBusinessDocumentUrl] = useState("");
  
  const handleNextStep = () => {
    if (step === 1) {
      if (!businessName || !businessType || !businessAddress) {
        toast({
          variant: "destructive",
          title: "Missing information",
          description: "Please fill in all required fields",
        });
        return;
      }
      setStep(2);
    }
  };
  
  const handlePrevStep = () => {
    if (step === 2) setStep(1);
  };
  
  const handleFileUpload = async (file: File, type: "id" | "business") => {
    if (!user) return null;
    
    try {
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${type}-${Math.random()}.${fileExt}`;
      
      // Create bucket if it doesn't exist
      const { data: bucketData } = await supabase.storage.getBucket("verification");
      if (!bucketData) {
        await supabase.storage.createBucket("verification", {
          public: false,
        });
      }
      
      // Upload file
      const { error } = await supabase.storage
        .from("verification")
        .upload(filePath, file);
        
      if (error) throw error;
      
      return filePath;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    if (!idDocument || !businessDocument) {
      toast({
        variant: "destructive", 
        title: "Missing documents",
        description: "Please upload all required documents",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // Upload documents
      const idDocPath = await handleFileUpload(idDocument, "id");
      const businessDocPath = await handleFileUpload(businessDocument, "business");
      
      if (!idDocPath || !businessDocPath) {
        throw new Error("Failed to upload documents");
      }
      
      // Update profile with business info
      await updateProfile({
        business_name: businessName,
        business_type: businessType,
        business_address: businessAddress,
        business_description: businessDescription,
        id_document_path: idDocPath,
        business_document_path: businessDocPath,
        verification_status: "pending",
        verification_submitted_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      
      toast({
        title: "Verification submitted",
        description: "Your verification request has been submitted for review.",
      });
      
      // Navigate to success page
      setStep(3);
    } catch (error: any) {
      console.error("Verification error:", error);
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: error.message || "An error occurred during submission.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <div className="container py-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Seller Verification</h1>
          <p className="text-muted-foreground mb-6">
            Complete the verification process to start selling on our platform
          </p>
          
          {step === 3 ? (
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-2xl font-bold">Verification Submitted</h2>
                  <p className="text-muted-foreground mt-2 mb-6 max-w-md">
                    Your verification request has been submitted and is under review. 
                    We'll notify you once your seller account is verified.
                  </p>
                  <Button onClick={() => navigate("/seller/dashboard")}>
                    Return to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>
                  {step === 1 ? "Business Information" : "Upload Documents"}
                </CardTitle>
                <CardDescription>
                  {step === 1 
                    ? "Provide details about your business" 
                    : "Upload the required verification documents"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {step === 1 ? (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name *</Label>
                      <Input 
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="Your business name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessType">Business Type *</Label>
                      <Select
                        value={businessType}
                        onValueChange={setBusinessType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="individual">Individual / Sole Proprietor</SelectItem>
                          <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                          <SelectItem value="corporation">Corporation</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="nonprofit">Nonprofit Organization</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessAddress">Business Address *</Label>
                      <Textarea
                        id="businessAddress"
                        value={businessAddress}
                        onChange={(e) => setBusinessAddress(e.target.value)}
                        placeholder="Full business address"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessDescription">
                        Business Description <span className="text-muted-foreground">(optional)</span>
                      </Label>
                      <Textarea
                        id="businessDescription"
                        value={businessDescription}
                        onChange={(e) => setBusinessDescription(e.target.value)}
                        placeholder="Tell us about your business and what you plan to sell"
                        rows={4}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Alert className="bg-blue-50 border-blue-200">
                      <AlertDescription className="text-blue-800">
                        All documents will be securely stored and used only for verification purposes.
                      </AlertDescription>
                    </Alert>
                    
                    <div className="space-y-2">
                      <Label htmlFor="idDocument">ID Document (Passport, Driver's License) *</Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        {idDocument ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                            <p className="font-medium">{idDocument.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {(idDocument.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setIdDocument(null)}
                              className="mt-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="font-medium">Click to upload ID</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                PNG, JPG or PDF (max 5MB)
                              </p>
                            </div>
                            <input
                              type="file"
                              id="idDocument"
                              className="hidden"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setIdDocument(e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="businessDocument">
                        Business Document (Registration, License) *
                      </Label>
                      <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        {businessDocument ? (
                          <div className="flex flex-col items-center">
                            <CheckCircle2 className="h-8 w-8 text-green-500 mb-2" />
                            <p className="font-medium">{businessDocument.name}</p>
                            <p className="text-sm text-muted-foreground mt-1">
                              {(businessDocument.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setBusinessDocument(null)}
                              className="mt-2"
                            >
                              Remove
                            </Button>
                          </div>
                        ) : (
                          <label className="cursor-pointer">
                            <div className="flex flex-col items-center">
                              <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                              <p className="font-medium">Click to upload business document</p>
                              <p className="text-sm text-muted-foreground mt-1">
                                PNG, JPG or PDF (max 5MB)
                              </p>
                            </div>
                            <input
                              type="file"
                              id="businessDocument"
                              className="hidden"
                              accept=".pdf,.png,.jpg,.jpeg"
                              onChange={(e) => {
                                if (e.target.files && e.target.files[0]) {
                                  setBusinessDocument(e.target.files[0]);
                                }
                              }}
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                {step === 1 ? (
                  <div className="flex w-full justify-end">
                    <Button onClick={handleNextStep}>Next</Button>
                  </div>
                ) : (
                  <div className="flex w-full justify-between">
                    <Button variant="outline" onClick={handlePrevStep}>
                      Previous
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!idDocument || !businessDocument || isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        "Submit Verification"
                      )}
                    </Button>
                  </div>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default VerificationPage;
