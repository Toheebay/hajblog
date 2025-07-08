import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { createDonation } from '@/services/donationService';
import { Heart } from 'lucide-react';

const donationSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  amount: z.coerce.number().min(1, { message: "Donation amount must be at least 1" }),
  message: z.string().optional()
});

type DonationFormValues = z.infer<typeof donationSchema>;

declare global {
  interface Window {
    FlutterwaveCheckout: (options: any) => void;
  }
}

const Donate: React.FC = () => {
  const { user } = useSupabaseAuth();

  const getUserDisplayName = () => {
    if (!user) return '';
    return user.user_metadata?.username || user.email?.split('@')[0] || '';
  };

  const form = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      name: user ? getUserDisplayName() : "",
      email: user ? user.email || "" : "",
      amount: 10,
      message: ""
    },
  });

  const mutation = useMutation({
    mutationFn: createDonation,
    onSuccess: () => {
      toast.success("Thank you for your donation!");
      form.reset({ ...form.getValues(), message: "" });
    },
    onError: () => {
      toast.error("Failed to process donation. Please try again.");
    }
  });

  const onSubmit = (values: DonationFormValues) => {
    // Use Flutterwave for payment processing
    if (window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout({
        public_key: "FLWPUBK-3d0e062fa50b5b538affc64535245178-X",
        tx_ref: "tx_" + Date.now(),
        amount: values.amount,
        currency: "NGN",
        payment_options: "card,banktransfer,ussd",
        customer: {
          email: values.email,
          phone_number: "",
          name: values.name,
        },
        callback: function (data: any) {
          console.log("Payment complete", data);
          if (data.status === "successful") {
            mutation.mutate({
              donor: {
                name: values.name,
                email: values.email,
                userId: user?.id
              },
              amount: values.amount,
              message: values.message
            });
          }
        },
        customizations: {
          title: "HajjAmbassador Donation",
          description: "Support our community platform",
          logo: "https://your-logo-url.com/logo.png"
        },
      });
    } else {
      toast.error("Payment system not loaded. Please refresh and try again.");
    }
  };

  React.useEffect(() => {
    // Load Flutterwave script
    const script = document.createElement('script');
    script.src = 'https://checkout.flutterwave.com/v3.js';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <Heart className="mx-auto h-12 w-12 text-marketplace-accent" />
            <h1 className="text-3xl font-bold mt-4 mb-2">Support Our Community</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Your donation helps us maintain and improve our platform. Every contribution makes a difference, no matter how big or small.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
                <CardDescription>
                  Your support helps us grow our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (₦)</FormLabel>
                          <FormControl>
                            <Input type="number" min="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message (Optional)</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Leave a message of support" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your message may be featured on our supporters page
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-marketplace-accent hover:bg-marketplace-dark"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Processing..." : "Donate with Flutterwave"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Why Donate?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-marketplace-primary/10 text-marketplace-primary rounded-full p-1 mr-2">✓</span>
                      <span>Help us improve the platform with new features</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-marketplace-primary/10 text-marketplace-primary rounded-full p-1 mr-2">✓</span>
                      <span>Support our growing community of users and sellers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-marketplace-primary/10 text-marketplace-primary rounded-full p-1 mr-2">✓</span>
                      <span>Keep our marketplace accessible for everyone</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-marketplace-primary/10 text-marketplace-primary rounded-full p-1 mr-2">✓</span>
                      <span>Fund educational content and resources</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Secure Payment</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    We use Flutterwave's secure payment gateway to process donations safely.
                  </p>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">Powered by</span>
                    <span className="font-semibold text-orange-600">Flutterwave</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;
