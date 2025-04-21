
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";

import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";

const profileFormSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  full_name: z.string().min(2, "Full name is required"),
  avatar_url: z.string().optional(),
  bio: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const AccountPage = () => {
  const { user, userRole, isVerified, updateProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState<any>(null);
  const navigate = useNavigate();
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      username: "",
      full_name: "",
      avatar_url: "",
      bio: "",
    },
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          throw error;
        }

        setProfileData(data);
        
        form.reset({
          username: data.username || "",
          full_name: data.full_name || "",
          avatar_url: data.avatar_url || "",
          bio: data.bio || "",
        });
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  async function onSubmit(values: ProfileFormValues) {
    if (!user) return;

    try {
      await updateProfile(values);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  if (isLoading) {
    return (
      <Layout>
        <div className="flex min-h-screen items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const getInitials = () => {
    if (profileData?.full_name) {
      return profileData.full_name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    }
    return user.email?.substring(0, 2).toUpperCase() || "U";
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
          <aside className="md:w-1/4">
            <Card>
              <CardHeader>
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profileData?.avatar_url || ""} />
                    <AvatarFallback className="text-xl">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-medium">{profileData?.full_name || user.email}</h3>
                  <p className="text-sm text-muted-foreground">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    {userRole === "seller" && (
                      isVerified ? (
                        <span className="ml-2 inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          Verified
                        </span>
                      ) : (
                        <span className="ml-2 inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                          Unverified
                        </span>
                      )
                    )}
                  </p>
                </div>
                {userRole === "seller" && !isVerified && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/seller/verification">Complete Verification</Link>
                    </Button>
                  </div>
                )}
                {userRole === "seller" && (
                  <div className="mt-4 text-center">
                    <Button variant="outline" size="sm" asChild>
                      <Link to="/seller/dashboard">Seller Dashboard</Link>
                    </Button>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <nav className="flex flex-col space-y-1">
                  <Button variant="ghost" className="justify-start">
                    Profile Settings
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Order History
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Payment Methods
                  </Button>
                  <Button variant="ghost" className="justify-start">
                    Address Book
                  </Button>
                  <Button variant="ghost" className="justify-start text-red-600 hover:text-red-600 hover:bg-red-50">
                    Sign Out
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </aside>
          
          <main className="flex-1">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="profile">Profile</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your account profile information.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid gap-4">
                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="full_name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name="avatar_url"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Avatar URL</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="https://example.com/avatar.png" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="bio"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell us a little about yourself"
                                    className="min-h-32"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Separator />
                          
                          <div className="flex justify-end">
                            <Button type="submit">Update Profile</Button>
                          </div>
                        </div>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="preferences" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Preferences</CardTitle>
                    <CardDescription>
                      Manage your account preferences and settings.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Email Notifications</h3>
                        <p className="text-muted-foreground">
                          Configure which emails you want to receive.
                        </p>
                      </div>
                      {/* Email preference toggles would go here */}
                      
                      <Separator />
                      
                      <div>
                        <h3 className="mb-2 text-lg font-medium">Delete Account</h3>
                        <p className="text-muted-foreground">
                          Permanently delete your account and all of your data.
                        </p>
                        <Button variant="destructive" className="mt-2">
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </Layout>
  );
};

export default AccountPage;
