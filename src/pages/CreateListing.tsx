
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/contexts/AuthContext';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import Navbar from '@/components/Navbar';
import { ImagePlus, X, Plus, VideoIcon, AlertCircle, Star } from 'lucide-react';
import SubscriptionPlans from '@/components/SubscriptionPlans';

// Hajj-specific categories
const hajjCategories = [
  'Accommodation', 'Transportation', 'Tour Guides', 'Visa Services', 
  'Travel Insurance', 'Religious Items', 'Halal Food', 'Medical Services',
  'Money Exchange', 'Communication Services', 'Luggage Services', 'Emergency Services'
];

const itemSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  price: z.coerce.number().min(0, { message: "Price cannot be negative" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  location: z.string().min(3, { message: "Location must be at least 3 characters" }),
});

type ItemFormValues = z.infer<typeof itemSchema>;

interface MediaItem {
  type: 'image' | 'video';
  url: string;
}

const CreateListing: React.FC = () => {
  const { user, canCreateAd, incrementAdCount } = useAuth();
  const navigate = useNavigate();
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video'>('image');
  const [showSubscriptionPlans, setShowSubscriptionPlans] = useState(false);

  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      category: "",
      location: "",
    },
  });

  const onSubmit = (values: ItemFormValues) => {
    if (!user) {
      toast.error("You must be logged in to create a listing");
      return;
    }

    if (!canCreateAd()) {
      toast.error("You've reached your ad limit. Please upgrade your plan to continue.");
      setShowSubscriptionPlans(true);
      return;
    }

    if (media.length === 0) {
      toast.error("Please add at least one image or video");
      return;
    }

    // Increment ad counter
    incrementAdCount();

    // For now, we'll just simulate adding the item
    toast.success("Hajj service listing created successfully!");
    console.log("New Hajj listing:", {
      ...values,
      id: String(Date.now()),
      seller: {
        id: user.id,
        name: user.username,
        avatar: `https://i.pravatar.cc/150?u=${user.username}`,
      },
      createdAt: new Date().toISOString(),
      media: media,
      image: media.find(m => m.type === 'image')?.url || '',
    });
    
    navigate('/');
  };

  const handleAddMedia = () => {
    if (!newMediaUrl) {
      toast.error("Please enter a valid URL");
      return;
    }

    setMedia([...media, { type: newMediaType, url: newMediaUrl }]);
    setNewMediaUrl('');
    setNewMediaType('image');
  };

  const handleRemoveMedia = (index: number) => {
    const newMedia = [...media];
    newMedia.splice(index, 1);
    setMedia(newMedia);
  };

  if (!user) {
    navigate('/');
    return null;
  }

  if (showSubscriptionPlans) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navbar />
        <div className="pt-24">
          <div className="text-center mb-8">
            <AlertCircle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Upgrade Required</h1>
            <p className="text-gray-600">You've reached your ad limit. Choose a plan to continue growing your Hajj business.</p>
          </div>
          <SubscriptionPlans />
        </div>
      </div>
    );
  }

  const adsRemaining = user.subscriptionTier === 'enterprise' 
    ? 'Unlimited' 
    : (user.maxAds || 0) - (user.adsUsed || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      <div className="marketplace-container py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Create Your Hajj Service Listing</h1>
            <div className="flex items-center justify-center gap-4 text-sm">
              <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                Plan: <span className="font-semibold capitalize">{user.subscriptionTier}</span>
              </div>
              <div className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full">
                Ads Remaining: <span className="font-semibold">{adsRemaining}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main form */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-t-lg">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    Service Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Premium Hajj Accommodation in Makkah" {...field} />
                            </FormControl>
                            <FormDescription>
                              Create a clear, descriptive title for your Hajj service
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="price"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Price (USD)</FormLabel>
                            <FormControl>
                              <Input type="number" min="0" step="0.01" {...field} />
                            </FormControl>
                            <FormDescription>
                              Set to 0 if offering free consultation
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Describe your Hajj service in detail. Include what's included, duration, special features, certifications, etc." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Category</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a Hajj service category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {hajjCategories.map((category) => (
                                  <SelectItem key={category} value={category}>
                                    {category}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Service Location</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Makkah, Madinah, Jeddah, or Online" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {/* Media upload section */}
                      <div>
                        <FormLabel className="block mb-2">Service Images & Videos</FormLabel>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex gap-2">
                            <Select 
                              value={newMediaType}
                              onValueChange={(value) => setNewMediaType(value as 'image' | 'video')}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="image">Image</SelectItem>
                                <SelectItem value="video">Video</SelectItem>
                              </SelectContent>
                            </Select>
                            
                            <Input 
                              placeholder={`Enter ${newMediaType} URL`}
                              value={newMediaUrl}
                              onChange={(e) => setNewMediaUrl(e.target.value)}
                              className="flex-1"
                            />
                            
                            <Button type="button" onClick={handleAddMedia} size="icon">
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <FormDescription>
                            Add photos and videos showcasing your Hajj service
                          </FormDescription>
                        </div>
                        
                        {media.length > 0 && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                            {media.map((item, index) => (
                              <div key={index} className="relative group border rounded-md overflow-hidden aspect-square">
                                {item.type === 'image' ? (
                                  <img 
                                    src={item.url} 
                                    alt={`Media ${index}`}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                    <VideoIcon className="h-10 w-10 text-gray-400" />
                                  </div>
                                )}
                                <Button
                                  type="button"
                                  size="icon"
                                  variant="destructive"
                                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6"
                                  onClick={() => handleRemoveMedia(index)}
                                >
                                  <X className="h-3 w-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                        disabled={!canCreateAd()}
                      >
                        {canCreateAd() ? 'Create Hajj Service Listing' : 'Upgrade Plan to Continue'}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar with tips */}
            <div className="space-y-6">
              <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
                <CardHeader>
                  <CardTitle className="text-emerald-700 flex items-center gap-2">
                    🕋 Hajj Service Tips
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-3">
                  <div>
                    <h4 className="font-semibold text-emerald-700">Be Detailed</h4>
                    <p className="text-emerald-600">Include all service details, certifications, and what's included.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700">High-Quality Images</h4>
                    <p className="text-emerald-600">Show your facilities, accommodations, or service team.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700">Competitive Pricing</h4>
                    <p className="text-emerald-600">Research market rates for similar Hajj services.</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-700">Quick Response</h4>
                    <p className="text-emerald-600">Respond to inquiries within 24 hours for better rankings.</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-amber-700">Your Plan Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Current Plan:</span>
                      <span className="font-semibold capitalize">{user.subscriptionTier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ads Used:</span>
                      <span className="font-semibold">{user.adsUsed || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ads Remaining:</span>
                      <span className="font-semibold text-emerald-600">{adsRemaining}</span>
                    </div>
                  </div>
                  {user.subscriptionTier === 'free' && (user.adsUsed || 0) > 15 && (
                    <div className="mt-4 p-3 bg-amber-100 rounded-lg">
                      <p className="text-xs text-amber-700 mb-2">Running low on free ads!</p>
                      <Button 
                        size="sm" 
                        onClick={() => setShowSubscriptionPlans(true)}
                        className="w-full bg-amber-600 hover:bg-amber-700"
                      >
                        Upgrade Now
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateListing;
