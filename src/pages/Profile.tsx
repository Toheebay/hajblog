
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState<string>(`https://i.pravatar.cc/150?u=${user?.username || 'default'}`);
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [avatarInput, setAvatarInput] = useState('');

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

  return (
    <div className="marketplace-container py-12 md:py-24">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Card className="max-w-md mx-auto">
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
    </div>
  );
};

export default Profile;
