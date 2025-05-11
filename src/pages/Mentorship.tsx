
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { UserRound } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Dummy data for mentors and mentees
const mentors = [
  {
    id: 1,
    name: "Robert Johnson",
    age: 65,
    expertise: "Retirement Planning",
    bio: "35 years experience in financial services. Helped hundreds plan their retirement.",
    avatar: "https://i.pravatar.cc/150?img=52"
  },
  {
    id: 2,
    name: "Margaret Wilson",
    age: 58,
    expertise: "Stock Market Investment",
    bio: "Former Wall Street analyst with deep knowledge of market trends and investment strategies.",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    id: 3,
    name: "Thomas Garcia",
    age: 70,
    expertise: "Small Business Finance",
    bio: "Owned and operated multiple successful small businesses. Eager to share knowledge.",
    avatar: "https://i.pravatar.cc/150?img=68"
  },
  {
    id: 4,
    name: "Susan Miller",
    age: 62,
    expertise: "Tax Planning",
    bio: "Former CPA with expertise in tax optimization strategies for individuals and families.",
    avatar: "https://i.pravatar.cc/150?img=32"
  }
];

const mentees = [
  {
    id: 1,
    name: "Michael Chen",
    age: 24,
    interests: "Stock Investing",
    bio: "Recent graduate looking to build investment knowledge and start my financial journey.",
    avatar: "https://i.pravatar.cc/150?img=8"
  },
  {
    id: 2,
    name: "Jessica Wong",
    age: 19,
    interests: "Financial Literacy",
    bio: "College student wanting to learn how to manage money and build good financial habits.",
    avatar: "https://i.pravatar.cc/150?img=5"
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    age: 28,
    interests: "Retirement Planning",
    bio: "Young professional wanting to start planning early for a comfortable retirement.",
    avatar: "https://i.pravatar.cc/150?img=12"
  },
  {
    id: 4,
    name: "Samantha Lee",
    age: 22,
    interests: "Entrepreneurship",
    bio: "Aspiring entrepreneur seeking guidance on business finance and startup funding.",
    avatar: "https://i.pravatar.cc/150?img=9"
  }
];

const MentorCard = ({ mentor }: { mentor: typeof mentors[0] }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={mentor.avatar} alt={mentor.name} />
          <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{mentor.name}</CardTitle>
          <div className="text-sm text-gray-500">
            {mentor.age} years old • {mentor.expertise}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-1 flex flex-col">
        <p className="text-gray-600 text-sm mb-4 flex-1">{mentor.bio}</p>
        <Button className="w-full mt-auto">Request Mentorship</Button>
      </CardContent>
    </Card>
  );
};

const MenteeCard = ({ mentee }: { mentee: typeof mentees[0] }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={mentee.avatar} alt={mentee.name} />
          <AvatarFallback>{mentee.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-lg">{mentee.name}</CardTitle>
          <div className="text-sm text-gray-500">
            {mentee.age} years old • Interested in {mentee.interests}
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-4 flex-1 flex flex-col">
        <p className="text-gray-600 text-sm mb-4 flex-1">{mentee.bio}</p>
        <Button className="w-full mt-auto">Offer Mentorship</Button>
      </CardContent>
    </Card>
  );
};

const Mentorship = () => {
  const { user } = useAuth();
  const [expertiseFilter, setExpertiseFilter] = useState("all");
  
  const filteredMentors = expertiseFilter === "all" 
    ? mentors 
    : mentors.filter(m => m.expertise.toLowerCase().includes(expertiseFilter.toLowerCase()));
    
  const filteredMentees = expertiseFilter === "all"
    ? mentees
    : mentees.filter(m => m.interests.toLowerCase().includes(expertiseFilter.toLowerCase()));
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-12 md:py-24">
        <div className="flex items-center gap-3 mb-8">
          <UserRound className="h-8 w-8 text-marketplace-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Mentorship Matching</h1>
        </div>
        
        {!user ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <UserRound className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">Login to Access Mentorship</h2>
              <p className="text-gray-500 mb-4">
                Sign in to connect with mentors or offer your expertise as a mentor.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <p className="text-gray-600">
                Connect with experienced mentors or offer your knowledge to others seeking guidance.
              </p>
              <div className="w-full sm:w-auto">
                <Select value={expertiseFilter} onValueChange={setExpertiseFilter}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Filter by expertise" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    <SelectItem value="retirement">Retirement Planning</SelectItem>
                    <SelectItem value="stock">Stock Market</SelectItem>
                    <SelectItem value="business">Small Business</SelectItem>
                    <SelectItem value="tax">Tax Planning</SelectItem>
                    <SelectItem value="literacy">Financial Literacy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Tabs defaultValue="find-mentor" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="find-mentor">Find a Mentor</TabsTrigger>
                <TabsTrigger value="be-mentor">Be a Mentor</TabsTrigger>
              </TabsList>
              
              <TabsContent value="find-mentor" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMentors.map(mentor => (
                    <MentorCard key={mentor.id} mentor={mentor} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="be-mentor" className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredMentees.map(mentee => (
                    <MenteeCard key={mentee.id} mentee={mentee} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </div>
  );
};

export default Mentorship;
