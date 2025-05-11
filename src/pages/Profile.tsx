
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { facebook, instagram, twitter, linkedin } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const { currency, setCurrency } = useCurrency();
  const [avatarUrl, setAvatarUrl] = useState<string>(`https://i.pravatar.cc/150?u=${user?.username || 'default'}`);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarInput, setAvatarInput] = useState('');
  
  // Social media states
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });
  const [isEditingSocial, setIsEditingSocial] = useState(false);
  const [socialInputs, setSocialInputs] = useState({
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: ''
  });

  if (!user) {
    return <Navigate to="/" />;
  }

  const handleAvatarChange = () => {
    if (avatarInput) {
      setAvatarUrl(avatarInput);
      setIsEditingAvatar(false);
      toast.success("Profile picture updated successfully!");
    } else {
      toast.error("Please enter a valid image URL");
    }
  };

  const handleSocialChange = () => {
    setSocialLinks(socialInputs);
    setIsEditingSocial(false);
    toast.success("Social media links updated successfully!");
  };

  const SocialIcon = ({ platform }: { platform: keyof typeof socialLinks }) => {
    const icons = {
      facebook: <facebook className="h-5 w-5" />,
      twitter: <twitter className="h-5 w-5" />,
      instagram: <instagram className="h-5 w-5" />,
      linkedin: <linkedin className="h-5 w-5" />
    };
    
    return icons[platform];
  };

  return (
    <div className="marketplace-container py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader className="flex flex-col md:flex-row items-center gap-4">
              <div className="relative group">
                <Avatar className="h-16 w-16 md:h-24 md:w-24">
                  <AvatarImage src={avatarUrl} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2 absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                  onClick={() => setIsEditingAvatar(!isEditingAvatar)}
                >
                  ✏️
                </Button>
              </div>
              <div>
                <CardTitle className="text-2xl">{user.username}</CardTitle>
                <p className="text-sm text-gray-500">Member since {new Date().toLocaleDateString()}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {isEditingAvatar && (
                <div className="space-y-2">
                  <Input 
                    type="text" 
                    placeholder="Enter image URL" 
                    value={avatarInput}
                    onChange={(e) => setAvatarInput(e.target.value)}
                  />
                  <div className="flex space-x-2">
                    <Button size="sm" onClick={handleAvatarChange}>
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => setIsEditingAvatar(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-medium mb-1">User ID</h3>
                <p className="text-gray-600">{user.id}</p>
              </div>
              
              <Button variant="outline" className="w-full" onClick={logout}>
                Log Out
              </Button>
            </CardContent>
          </Card>
          
          {/* Social Media Links Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Social Media Links</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {!isEditingSocial ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(socialLinks).map(([platform, link]) => (
                      <div key={platform} className="flex items-center gap-2">
                        <SocialIcon platform={platform as keyof typeof socialLinks} />
                        {link ? (
                          <a 
                            href={link.startsWith('http') ? link : `https://${link}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline truncate"
                          >
                            {link}
                          </a>
                        ) : (
                          <span className="text-gray-400 italic">Not connected</span>
                        )}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      setSocialInputs(socialLinks);
                      setIsEditingSocial(true);
                    }}
                  >
                    Edit Social Links
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    {Object.entries(socialInputs).map(([platform, link]) => (
                      <div key={platform} className="flex items-center gap-2">
                        <SocialIcon platform={platform as keyof typeof socialLinks} />
                        <Input 
                          value={link} 
                          placeholder={`Enter your ${platform} profile URL`}
                          onChange={(e) => 
                            setSocialInputs(prev => ({ ...prev, [platform]: e.target.value }))
                          }
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleSocialChange}>Save Links</Button>
                    <Button variant="outline" onClick={() => setIsEditingSocial(false)}>Cancel</Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Settings Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Preferred Currency</h3>
              <Select
                value={currency}
                onValueChange={(value) => setCurrency(value as any)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                  <SelectItem value="JPY">JPY (¥)</SelectItem>
                  <SelectItem value="CNY">CNY (¥)</SelectItem>
                  <SelectItem value="NGN">NGN (₦)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {user.isAdmin && (
              <div>
                <h3 className="font-medium mb-1">Admin Controls</h3>
                <Button 
                  onClick={() => window.location.href = '/admin/courses'}
                  className="w-full mt-2"
                >
                  Manage Courses
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
