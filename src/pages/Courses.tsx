
import React from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GraduationCap, Play } from 'lucide-react';
import { AuthProvider } from '@/contexts/AuthContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';

// Dummy data for courses
const courses = [
  {
    id: 1,
    title: "Introduction to Financial Markets",
    description: "Learn the basics of financial markets and how they work.",
    instructor: "Jane Smith",
    level: "beginner",
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop",
    category: "beginner"
  },
  {
    id: 2,
    title: "Retirement Planning Essentials",
    description: "Everything you need to know about planning for a secure retirement.",
    instructor: "Robert Johnson",
    level: "intermediate",
    duration: "6 hours",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop",
    category: "retiree"
  },
  {
    id: 3,
    title: "Advanced Trading Strategies",
    description: "Explore complex trading strategies for experienced investors.",
    instructor: "Michael Wong",
    level: "advanced",
    duration: "8 hours",
    image: "https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=800&auto=format&fit=crop",
    category: "advanced"
  },
  {
    id: 4,
    title: "Investing 101 for Teens",
    description: "Simple investing concepts explained for young investors.",
    instructor: "Sarah Johnson",
    level: "beginner",
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop",
    category: "youth"
  },
  {
    id: 5,
    title: "Social Security Benefits Guide",
    description: "Understanding and maximizing your social security benefits.",
    instructor: "David Miller",
    level: "intermediate",
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=800&auto=format&fit=crop",
    category: "retiree"
  },
  {
    id: 6,
    title: "Financial Literacy for Beginners",
    description: "Essential financial concepts everyone should understand.",
    instructor: "Lisa Chen",
    level: "beginner",
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=800&auto=format&fit=crop",
    category: "beginner"
  }
];

const CourseCard = ({ course }: { course: typeof courses[0] }) => {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <div className="h-48 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{course.title}</CardTitle>
        <div className="text-sm text-gray-500">
          Instructor: {course.instructor}
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {course.level}
          </span>
          <span>{course.duration}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <p className="text-gray-600 text-sm">
          {course.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button className="w-full flex items-center justify-center gap-2 bg-marketplace-primary hover:bg-marketplace-primary/80">
          <Play className="h-4 w-4" />
          Start Course
        </Button>
      </CardFooter>
    </Card>
  );
};

const Courses = () => {
  return (
    <div className="min-h-screen soft-main-gradient">
      <AuthProvider>
        <CurrencyProvider>
          <Navbar />
        </CurrencyProvider>
      </AuthProvider>
      
      <div className="marketplace-container py-12 md:py-24">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="h-8 w-8 text-marketplace-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Video Courses</h1>
        </div>
        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6 flex flex-wrap">
            <TabsTrigger value="all">All Courses</TabsTrigger>
            <TabsTrigger value="beginner">Beginners</TabsTrigger>
            <TabsTrigger value="retiree">Retirees</TabsTrigger>
            <TabsTrigger value="youth">Youth</TabsTrigger>
            <TabsTrigger value="advanced">Advanced</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          {["beginner", "retiree", "youth", "advanced"].map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses
                  .filter(course => course.category === category)
                  .map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
