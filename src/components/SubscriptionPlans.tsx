
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useSupabaseAuth } from '@/contexts/SupabaseAuthContext';
import { Check, Star, Crown, Zap } from 'lucide-react';
import FlutterwavePayment from './FlutterwavePayment';
import { toast } from 'sonner';

const SubscriptionPlans: React.FC = () => {
  const { user } = useSupabaseAuth();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      maxAds: 20,
      icon: <Zap className="h-6 w-6" />,
      features: [
        '20 Free Ads',
        'Basic Listing Features',
        'Community Access',
        'Standard Support'
      ],
      color: 'from-gray-400 to-gray-600',
      textColor: 'text-gray-600',
      popular: false
    },
    {
      id: 'basic',
      name: 'Basic',
      price: 15000, // ₦15,000
      maxAds: 100,
      icon: <Check className="h-6 w-6" />,
      features: [
        '100 Ads per Month',
        'Featured Listings',
        'Priority Support',
        'Analytics Dashboard',
        'Social Media Integration'
      ],
      color: 'from-blue-400 to-blue-600',
      textColor: 'text-blue-600',
      popular: false
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 30000, // ₦30,000
      maxAds: 500,
      icon: <Star className="h-6 w-6" />,
      features: [
        '500 Ads per Month',
        'Premium Featured Listings',
        'Advanced Analytics',
        'Priority Customer Support',
        'Custom Branding',
        'API Access'
      ],
      color: 'from-amber-400 to-orange-600',
      textColor: 'text-amber-600',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 60000, // ₦60,000
      maxAds: -1,
      icon: <Crown className="h-6 w-6" />,
      features: [
        'Unlimited Ads',
        'White-label Solution',
        'Dedicated Account Manager',
        '24/7 Premium Support',
        'Custom Integrations',
        'Advanced Reporting',
        'Multi-location Management'
      ],
      color: 'from-purple-400 to-purple-600',
      textColor: 'text-purple-600',
      popular: false
    }
  ];

  const handleSubscriptionSuccess = (planId: string, paymentData: any) => {
    console.log(`Subscription to ${planId} successful:`, paymentData);
    toast.success(`Successfully subscribed to ${planId} plan!`);
    // Here you would typically update the user's subscription in your backend
  };

  return (
    <div className="py-16 px-4">
      <div className="marketplace-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-emerald-600">Hajj Business</span> Plan
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Expand your reach and serve more pilgrims with our flexible subscription plans
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id} 
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.popular ? 'ring-2 ring-amber-400 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}

              <CardHeader className={`text-center ${plan.popular ? 'pt-12' : 'pt-6'}`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
                  {plan.icon}
                </div>
                <CardTitle className={`text-2xl font-bold ${plan.textColor}`}>
                  {plan.name}
                </CardTitle>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ₦{plan.price.toLocaleString()}
                  {plan.price > 0 && <span className="text-lg text-gray-500">/month</span>}
                </div>
                <p className="text-gray-600">
                  {plan.maxAds === -1 ? 'Unlimited ads' : `${plan.maxAds} ads/month`}
                </p>
              </CardHeader>

              <CardContent className="px-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="px-6 pb-6">
                {plan.id === 'free' ? (
                  <Button
                    className="w-full bg-gray-300 text-gray-600"
                    disabled
                  >
                    Current Plan
                  </Button>
                ) : user ? (
                  <FlutterwavePayment
                    amount={plan.price}
                    customerEmail={user.email || ''}
                    customerName={user.username || 'User'}
                    title={`${plan.name} Plan Subscription`}
                    description={`Monthly subscription for ${plan.name} plan`}
                    onSuccess={(data) => handleSubscriptionSuccess(plan.id, data)}
                    className={`w-full ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700' 
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    } text-white`}
                  >
                    Subscribe Now
                  </FlutterwavePayment>
                ) : (
                  <Button
                    className="w-full bg-gray-400 text-white"
                    disabled
                  >
                    Login to Subscribe
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include secure payments, mobile app access, and our Hajj expertise guarantee
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>🔒 Secure & Encrypted</span>
            <span>•</span>
            <span>📱 Mobile Optimized</span>
            <span>•</span>
            <span>🕋 Hajj Certified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
