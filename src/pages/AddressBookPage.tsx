
import { useState } from "react";
import { Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Plus, Trash2 } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { Address } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";

const addressSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  companyName: z.string().optional(),
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  isDefault: z.boolean().default(false),
});

type AddressFormValues = z.infer<typeof addressSchema>;

const AddressBookPage = () => {
  const { user } = useAuth();
  
  // Mock addresses data for demonstration
  const [addresses, setAddresses] = useState<(Address & { id: string; isDefault: boolean })[]>([
    {
      id: "addr1",
      fullName: "John Doe",
      street: "123 Main St",
      city: "Anytown",
      state: "California",
      postalCode: "12345",
      country: "United States",
      phone: "555-123-4567",
      isDefault: true,
    },
    {
      id: "addr2",
      fullName: "John Doe",
      street: "456 Park Ave",
      city: "Othertown",
      state: "New York",
      postalCode: "67890",
      country: "United States",
      phone: "555-987-6543",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      fullName: "",
      companyName: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      isDefault: false,
    },
  });

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
    
    toast({
      title: "Default address updated",
      description: "Your default shipping address has been updated.",
    });
  };

  const handleDeleteAddress = (id: string) => {
    // Don't allow deletion of the default address
    if (addresses.find((addr) => addr.id === id)?.isDefault) {
      toast({
        variant: "destructive",
        title: "Cannot delete default address",
        description: "Please set another address as default before deleting this one.",
      });
      return;
    }
    
    setAddresses(addresses.filter((address) => address.id !== id));
    
    toast({
      title: "Address removed",
      description: "The address has been removed from your address book.",
    });
  };

  const onSubmit = (values: AddressFormValues) => {
    // For a new address, generate an ID
    const newAddress = {
      id: `addr${addresses.length + 1}`,
      ...values,
    };
    
    // If this is the first address or it's set as default
    if (addresses.length === 0 || values.isDefault) {
      // Set all other addresses to non-default
      const updatedAddresses = addresses.map((addr) => ({
        ...addr,
        isDefault: false,
      }));
      setAddresses([...updatedAddresses, newAddress]);
    } else {
      setAddresses([...addresses, newAddress]);
    }
    
    // Reset form
    form.reset();
    setShowAddForm(false);
    
    toast({
      title: "Address added",
      description: "Your new address has been added to your address book.",
    });
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Address Book</h1>
          <Button variant="outline" asChild>
            <Link to="/account">Back to Account</Link>
          </Button>
        </div>
        
        <div className="space-y-6">
          {addresses.map((address) => (
            <Card key={address.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-md bg-primary/10 mt-1">
                      <Home className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {address.fullName}
                        {address.isDefault && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">{address.street}</p>
                      <p className="text-sm text-muted-foreground">
                        {address.city}, {address.state} {address.postalCode}
                      </p>
                      <p className="text-sm text-muted-foreground">{address.country}</p>
                      <p className="text-sm text-muted-foreground mt-1">{address.phone}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!address.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(address.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteAddress(address.id)}
                      disabled={address.isDefault}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {!showAddForm && (
            <Button
              onClick={() => setShowAddForm(true)}
              className="w-full py-6 border-dashed border-2 bg-transparent hover:bg-muted/50 text-muted-foreground"
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add a new address
            </Button>
          )}
          
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add a New Address</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="John Doe" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name (Optional)</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Company Inc." />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="street"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="123 Main St" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="New York" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="state"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>State/Province</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="NY" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="postalCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="10001" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="United States" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="(555) 123-4567" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isDefault"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Set as default address</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex space-x-2 pt-2">
                      <Button type="submit" className="flex-1">Add Address</Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setShowAddForm(false)}
                        className="flex-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AddressBookPage;
