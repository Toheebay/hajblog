
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { GraduationCap, Play, BookOpen, Star } from 'lucide-react';

// Islamic and Hajj courses data
const courses = [
  {
    id: 1,
    title: "Complete Hajj Guide for First-Time Pilgrims",
    description: "Essential step-by-step guide covering all rituals, preparations, and spiritual aspects of Hajj.",
    instructor: "Sheikh Abdullah Al-Hariri",
    level: "beginner",
    duration: "6 hours",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    category: "hajj",
    rating: 4.9,
    students: 2341
  },
  {
    id: 2,
    title: "Umrah: The Lesser Pilgrimage",
    description: "Complete guide to performing Umrah with proper etiquette and spiritual preparation.",
    instructor: "Dr. Fatima Al-Zahra",
    level: "beginner",
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    category: "hajj",
    rating: 4.8,
    students: 1876
  },
  {
    id: 3,
    title: "History of Makkah and Madinah",
    description: "Journey through the sacred history of Islam's holiest cities and their significance.",
    instructor: "Prof. Muhammad Al-Ansari",
    level: "intermediate",
    duration: "8 hours",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    category: "history",
    rating: 4.9,
    students: 3245
  },
  {
    id: 4,
    title: "The Life of Prophet Muhammad (PBUH)",
    description: "Comprehensive study of the Prophet's life, teachings, and their relevance today.",
    instructor: "Sheikh Omar Ibn Khattab",
    level: "all",
    duration: "12 hours",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    category: "history",
    rating: 5.0,
    students: 5432
  },
  {
    id: 5,
    title: "Islamic Jurisprudence for Pilgrims",
    description: "Understanding Islamic law as it applies to pilgrimage and daily worship.",
    instructor: "Dr. Ahmad Al-Fiqhi",
    level: "intermediate",
    duration: "10 hours",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    category: "fiqh",
    rating: 4.7,
    students: 1654
  },
  {
    id: 6,
    title: "Arabic for Hajj Pilgrims",
    description: "Essential Arabic phrases and prayers every pilgrim should know for Hajj.",
    instructor: "Ustadha Aisha Al-Qurashi",
    level: "beginner",
    duration: "5 hours",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    category: "language",
    rating: 4.6,
    students: 2987
  },
  {
    id: 7,
    title: "The Golden Age of Islam",
    description: "Explore the scientific, cultural, and intellectual achievements of Islamic civilization.",
    instructor: "Dr. Hassan Al-Baghdadi",
    level: "intermediate",
    duration: "9 hours",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    category: "history",
    rating: 4.8,
    students: 2156
  },
  {
    id: 8,
    title: "Spiritual Preparation for Hajj",
    description: "Mental and spiritual readiness for the transformative journey of Hajj.",
    instructor: "Sheikh Yusuf Al-Qaradawi",
    level: "all",
    duration: "4 hours",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    category: "hajj",
    rating: 4.9,
    students: 4321
  },
  {
    id: 9,
    title: "Islamic Architecture and Sacred Spaces",
    description: "Understanding the design and significance of Islamic architecture, including the Kaaba.",
    instructor: "Arch. Layla Al-Andalusi",
    level: "intermediate",
    duration: "7 hours",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    category: "culture",
    rating: 4.7,
    students: 1432
  },
  {
    id: 10,
    title: "Health and Safety During Hajj",
    description: "Medical advice and safety tips for a healthy pilgrimage experience.",
    instructor: "Dr. Khalid Al-Tabib",
    level: "beginner",
    duration: "3 hours",
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    category: "hajj",
    rating: 4.8,
    students: 3654
  },
  {
    id: 11,
    title: "The Companions of the Prophet",
    description: "Stories and lessons from the lives of the Prophet's companions (Sahabah).",
    instructor: "Sheikh Abdullah Al-Sahabi",
    level: "all",
    duration: "11 hours",
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    category: "history",
    rating: 4.9,
    students: 2876
  },
  {
    id: 12,
    title: "Quranic Studies for Beginners",
    description: "Introduction to understanding and reflecting on the Holy Quran.",
    instructor: "Qari Mahmoud Al-Hafez",
    level: "beginner",
    duration: "8 hours",
    image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=800&auto=format&fit=crop",
    category: "quran",
    rating: 4.8,
    students: 4567
  }
];

const CourseCard = ({ course }: { course: typeof courses[0] }) => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 bg-white/90 backdrop-blur-sm border-emerald-200">
      <div className="h-48 overflow-hidden rounded-t-lg">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-gray-800 line-clamp-2">{course.title}</CardTitle>
        <div className="text-sm text-gray-600">
          Instructor: {course.instructor}
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full text-xs font-medium">
              {course.level}
            </span>
            <span className="text-gray-500">{course.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-gray-600">{course.rating}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <p className="text-gray-600 text-sm line-clamp-3">
          {course.description}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {course.students.toLocaleString()} students enrolled
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          <Play className="h-4 w-4" />
          Start Learning
        </Button>
      </CardFooter>
    </Card>
  );
};

const Courses = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16">
        <div className="marketplace-container text-center">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-4xl font-bold mb-4">Islamic Learning Center</h1>
          <p className="text-xl text-emerald-100 max-w-2xl mx-auto">
            Free courses on Hajj, Islamic history, and spiritual development for all pilgrims
          </p>
        </div>
      </div>
      
      <div className="marketplace-container py-12 md:py-16">        
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-8 flex flex-wrap justify-center bg-white/70 backdrop-blur-sm p-1 rounded-lg">
            <TabsTrigger value="all" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">All Courses</TabsTrigger>
            <TabsTrigger value="hajj" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Hajj & Umrah</TabsTrigger>
            <TabsTrigger value="history" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Islamic History</TabsTrigger>
            <TabsTrigger value="quran" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Quran Studies</TabsTrigger>
            <TabsTrigger value="fiqh" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Islamic Law</TabsTrigger>
            <TabsTrigger value="language" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Arabic</TabsTrigger>
            <TabsTrigger value="culture" className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white">Culture</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {courses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </TabsContent>
          
          {["hajj", "history", "quran", "fiqh", "language", "culture"].map(category => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {courses
                  .filter(course => course.category === category)
                  .map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
              </div>
              {courses.filter(course => course.category === category).length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">More courses coming soon in this category!</p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default Courses;
