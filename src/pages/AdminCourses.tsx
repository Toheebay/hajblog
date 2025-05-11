import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { GraduationCap, PlusCircle, Pencil, Trash2 } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  level: string;
  duration: string;
  image: string;
  category: string;
}

// Mock courses data (in a real app, this would come from an API)
const initialCourses: Course[] = [
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

const AdminCourses = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Course, 'id'>>({
    title: '',
    description: '',
    instructor: '',
    level: 'beginner',
    duration: '',
    image: '',
    category: 'beginner'
  });

  // Check if user is admin, if not redirect
  React.useEffect(() => {
    if (user && !user.isAdmin) {
      navigate('/courses');
    } else if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    // Validate inputs
    if (!formData.title || !formData.description || !formData.instructor || !formData.duration) {
      toast.error('Please fill all required fields');
      return;
    }

    const newCourse: Course = {
      ...formData,
      id: Date.now()
    };

    setCourses([...courses, newCourse]);
    toast.success('Course added successfully');
    setIsAdding(false);
    resetForm();
  };

  const handleUpdateCourse = () => {
    if (isEditing === null) return;

    // Validate inputs
    if (!formData.title || !formData.description || !formData.instructor || !formData.duration) {
      toast.error('Please fill all required fields');
      return;
    }

    const updatedCourses = courses.map(course =>
      course.id === isEditing ? { ...formData, id: course.id } : course
    );

    setCourses(updatedCourses);
    toast.success('Course updated successfully');
    setIsEditing(null);
    resetForm();
  };

  const handleDeleteCourse = (id: number) => {
    const updatedCourses = courses.filter(course => course.id !== id);
    setCourses(updatedCourses);
    toast.success('Course deleted successfully');
  };

  const handleEditClick = (course: Course) => {
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      level: course.level,
      duration: course.duration,
      image: course.image,
      category: course.category
    });
    setIsEditing(course.id);
    setIsAdding(false);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      instructor: '',
      level: 'beginner',
      duration: '',
      image: '',
      category: 'beginner'
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(null);
    resetForm();
  };

  if (!user?.isAdmin) {
    return null; // Will be redirected by useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-12 md:py-24">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <GraduationCap className="h-8 w-8 text-marketplace-primary" />
            <h1 className="text-2xl md:text-3xl font-bold">Manage Courses</h1>
          </div>
          
          {!isAdding && !isEditing && (
            <Button 
              onClick={() => setIsAdding(true)}
              className="bg-marketplace-primary hover:bg-marketplace-primary/90"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Course
            </Button>
          )}
        </div>
        
        {(isAdding || isEditing !== null) && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{isEditing !== null ? 'Edit Course' : 'Add New Course'}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Course Title *</label>
                  <Input 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Course title"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Instructor Name *</label>
                  <Input 
                    name="instructor"
                    value={formData.instructor}
                    onChange={handleInputChange}
                    placeholder="Instructor name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Description *</label>
                <Textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Course description"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Level *</label>
                  <Select 
                    value={formData.level}
                    onValueChange={(value) => handleSelectChange('level', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <Select 
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginners</SelectItem>
                      <SelectItem value="retiree">Retirees</SelectItem>
                      <SelectItem value="youth">Youth</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Duration *</label>
                  <Input 
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 4 hours"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <Input 
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button 
                onClick={isEditing !== null ? handleUpdateCourse : handleAddCourse}
                className="bg-marketplace-primary hover:bg-marketplace-primary/90"
              >
                {isEditing !== null ? 'Update Course' : 'Add Course'}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        <div className="grid grid-cols-1 gap-4">
          {courses.map(course => (
            <Card key={course.id} className="overflow-hidden">
              <div className="flex items-start p-4 md:p-6">
                <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-md overflow-hidden flex-shrink-0">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="ml-4 flex-grow">
                  <h3 className="font-semibold text-lg">{course.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                      {course.level}
                    </span>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                      {course.category}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {course.duration}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Instructor: {course.instructor}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                    {course.description}
                  </p>
                </div>
                
                <div className="flex space-x-2 ml-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleEditClick(course)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => handleDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCourses;
