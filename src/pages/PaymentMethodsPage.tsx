
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { CreditCard, Plus, Trash2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  cardType: string;
  cardNumber: string;
  expiryDate: string;
  nameOnCard: string;
  isDefault: boolean;
}

const PaymentMethodsPage = () => {
  const { user } = useAuth();
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "card1",
      cardType: "Visa",
      cardNumber: "•••• •••• •••• 4242",
      expiryDate: "12/26",
      nameOnCard: "John Doe",
      isDefault: true,
    },
    {
      id: "card2",
      cardType: "Mastercard",
      cardNumber: "•••• •••• •••• 5555",
      expiryDate: "09/25",
      nameOnCard: "John Doe",
      isDefault: false,
    },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newExpiryDate, setNewExpiryDate] = useState("");
  const [newNameOnCard, setNewNameOnCard] = useState("");
  const [newCvv, setNewCvv] = useState("");

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
    toast({
      title: "Default payment method updated",
      description: "Your default payment method has been updated successfully.",
    });
  };

  const handleDeleteCard = (id: string) => {
    // Don't allow deletion of the default card
    if (paymentMethods.find((method) => method.id === id)?.isDefault) {
      toast({
        variant: "destructive",
        title: "Cannot delete default card",
        description: "Please set another card as default before deleting this one.",
      });
      return;
    }
    
    setPaymentMethods(paymentMethods.filter((method) => method.id !== id));
    toast({
      title: "Card removed",
      description: "The payment method has been removed successfully.",
    });
  };

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!newCardNumber || !newExpiryDate || !newNameOnCard || !newCvv) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all the required fields.",
      });
      return;
    }
    
    // In a real app, you would send this to your payment processor
    // Here we just mock the card addition
    const newCard: PaymentMethod = {
      id: `card${paymentMethods.length + 1}`,
      cardType: newCardNumber.startsWith("4") ? "Visa" : "Mastercard",
      cardNumber: `•••• •••• •••• ${newCardNumber.slice(-4)}`,
      expiryDate: newExpiryDate,
      nameOnCard: newNameOnCard,
      isDefault: paymentMethods.length === 0,
    };
    
    setPaymentMethods([...paymentMethods, newCard]);
    
    // Reset form
    setNewCardNumber("");
    setNewExpiryDate("");
    setNewNameOnCard("");
    setNewCvv("");
    setShowAddForm(false);
    
    toast({
      title: "Card added",
      description: "Your new payment method has been added successfully.",
    });
  };

  return (
    <Layout>
      <div className="container py-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Payment Methods</h1>
          <Button variant="outline" asChild>
            <Link to="/account">Back to Account</Link>
          </Button>
        </div>
        
        <div className="space-y-6">
          {paymentMethods.map((method) => (
            <Card key={method.id}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 flex items-center justify-center rounded-md bg-primary/10">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">
                        {method.cardType} ending in {method.cardNumber.slice(-4)}
                        {method.isDefault && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Expires {method.expiryDate}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {!method.isDefault && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSetDefault(method.id)}
                      >
                        Set as Default
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteCard(method.id)}
                      disabled={method.isDefault}
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
              Add a new payment method
            </Button>
          )}
          
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle>Add a New Card</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCard} className="space-y-4">
                  <div>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      value={newNameOnCard}
                      onChange={(e) => setNewNameOnCard(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value.replace(/\D/g, ''))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={16}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiration Date (MM/YY)</Label>
                      <Input
                        id="expiryDate"
                        value={newExpiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^\d/]/g, '');
                          if (value.length === 2 && !value.includes('/') && newExpiryDate.length !== 3) {
                            value += '/';
                          }
                          if (value.length <= 5) {
                            setNewExpiryDate(value);
                          }
                        }}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        value={newCvv}
                        onChange={(e) => setNewCvv(e.target.value.replace(/\D/g, ''))}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button type="submit" className="flex-1">Add Card</Button>
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
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethodsPage;
