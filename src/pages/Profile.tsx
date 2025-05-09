
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Profile: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="marketplace-container py-24">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <Card className="max-w-md mx-auto">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={`https://i.pravatar.cc/150?u=${user.username}`} alt={user.username} />
            <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{user.username}</CardTitle>
            <p className="text-sm text-gray-500">Member since {new Date().toLocaleDateString()}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
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
