
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Clock, Users, Star, BookOpen } from 'lucide-react';

// Extended course data with full content
const coursesData = {
  1: {
    title: "Complete Hajj Guide for First-Time Pilgrims",
    instructor: "Sheikh Abdullah Al-Hariri",
    duration: "6 hours",
    rating: 4.9,
    students: 2341,
    image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&auto=format&fit=crop",
    description: "Essential step-by-step guide covering all rituals, preparations, and spiritual aspects of Hajj.",
    fullContent: `
# Complete Hajj Guide for First-Time Pilgrims

## Introduction
The Hajj pilgrimage is one of the five pillars of Islam and a spiritual journey that every Muslim should undertake at least once in their lifetime if they are physically and financially able.

## Chapter 1: Preparation
### Spiritual Preparation
- Sincere intention (Niyyah)
- Repentance and seeking forgiveness
- Learning about the rituals beforehand
- Mental preparation for the physical challenges

### Physical Preparation
- Health checkups and vaccinations
- Physical fitness training
- Packing essentials
- Understanding the climate

## Chapter 2: The Five Days of Hajj
### Day 1: 8th Dhul Hijjah (Yawm al-Tarwiyah)
- Travel to Mina
- Spend the day in prayer and reflection
- Prepare for the main day at Arafat

### Day 2: 9th Dhul Hijjah (Yawm Arafah)
- The most important day of Hajj
- Stand at Arafat from Dhuhr to Maghrib
- Make sincere duas and seek forgiveness
- Travel to Muzdalifah after sunset

### Day 3: 10th Dhul Hijjah (Yawm al-Nahr)
- Collect pebbles at Muzdalifah
- Stone the large Jamarat
- Sacrifice an animal (Qurbani)
- Shave or cut hair
- Perform Tawaf al-Ifadah

### Days 4-5: 11th-12th Dhul Hijjah (Ayyam al-Tashriq)
- Stone all three Jamarat each day
- Stay in Mina for reflection
- Option to leave on 12th or stay until 13th

## Chapter 3: Essential Rituals
### Ihram
- State of ritual purity and dress
- Specific clothing for men and women
- Restrictions while in Ihram state

### Tawaf
- Circumambulation of the Kaaba
- Seven rounds counterclockwise
- Prayers and supplications during Tawaf

### Sa'i
- Walking between Safa and Marwah hills
- Seven trips commemorating Hagar's search for water
- Significance and proper etiquette

## Chapter 4: Common Mistakes to Avoid
- Not maintaining proper Ihram state
- Rushing through rituals
- Not following the proper sequence
- Neglecting personal hygiene and health

## Chapter 5: Spiritual Benefits
- Purification of the soul
- Unity with Muslims worldwide
- Increased devotion and faith
- Life-changing spiritual experience

## Conclusion
The Hajj is a transformative journey that requires both physical and spiritual preparation. May Allah accept the Hajj of all pilgrims and grant them a blessed and safe journey.
    `
  },
  2: {
    title: "Umrah: The Lesser Pilgrimage",
    instructor: "Dr. Fatima Al-Zahra",
    duration: "4 hours",
    rating: 4.8,
    students: 1876,
    image: "https://images.unsplash.com/photo-1492321936769-b49830bc1d1e?w=800&auto=format&fit=crop",
    description: "Complete guide to performing Umrah with proper etiquette and spiritual preparation.",
    fullContent: `
# Umrah: The Lesser Pilgrimage

## Introduction
Umrah, often called the "lesser pilgrimage," is a pilgrimage to Mecca that can be performed at any time of the year, unlike Hajj which has specific dates.

## Chapter 1: Understanding Umrah
### Definition and Significance
- Meaning of Umrah in Arabic
- Spiritual significance and rewards
- Difference between Umrah and Hajj
- Times when Umrah is most recommended

### Types of Umrah
- Umrah al-Mufradah (Independent Umrah)
- Umrah al-Tamattu (Part of Hajj)
- Best times to perform Umrah

## Chapter 2: Preparation for Umrah
### Before Leaving Home
- Intention and spiritual preparation
- Learning the rituals and duas
- Physical and health preparations
- Packing essentials for the journey

### Entering the State of Ihram
- Miqat locations and their significance
- Proper way to enter Ihram
- Ihram clothing and restrictions
- Common mistakes in Ihram state

## Chapter 3: Performing Umrah Rituals
### Arrival at Masjid al-Haram
- First sight of the Kaaba
- Entering the mosque with proper etiquette
- Recommended duas upon seeing the Kaaba

### Tawaf (Circumambulation)
- Seven rounds around the Kaaba
- Starting and ending points
- Istilam (touching/pointing to the Black Stone)
- Duas and supplications during Tawaf
- Tawaf al-Qudum for those performing Hajj

### Prayer at Maqam Ibrahim
- Two units of prayer after Tawaf
- Significance of Maqam Ibrahim
- Recommended recitations

### Sa'i Between Safa and Marwah
- Historical significance of Sa'i
- Seven trips between the hills
- Proper etiquette and supplications
- Areas of increased pace (for men)

### Halq or Taqsir (Hair Cutting)
- Complete shaving (Halq) vs. trimming (Taqsir)
- Recommended practices
- Exit from Ihram state

## Chapter 4: Recommended Acts
### Additional Prayers in Masjid al-Haram
- Praying in different areas of the mosque
- Significance of praying near the Kaaba
- Recommended times for prayer

### Visiting Historical Sites
- Well of Zamzam and its significance
- Hijr Ismail area
- Other significant locations in Makkah

### Duas and Supplications
- Specific duas for each ritual
- Personal supplications and remembrance
- Seeking forgiveness and making requests

## Chapter 5: Etiquette and Guidelines
### Behavior in the Holy Mosque
- Respect for other pilgrims
- Patience during crowded times
- Helping fellow pilgrims
- Maintaining cleanliness

### Common Challenges and Solutions
- Dealing with crowds
- Managing time effectively
- Health and safety considerations
- Language barriers and communication

## Conclusion
Umrah is a beautiful opportunity for spiritual purification and drawing closer to Allah. May every pilgrim find peace, forgiveness, and spiritual fulfillment in this blessed journey.
    `
  }
};

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id || '1');
  const course = coursesData[courseId as keyof typeof coursesData];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
        <Navbar />
        <div className="marketplace-container py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h1>
          <Button onClick={() => navigate('/courses')} className="bg-emerald-600 hover:bg-emerald-700">
            Back to Courses
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50">
      <Navbar />
      
      <div className="marketplace-container py-8">
        <Button 
          onClick={() => navigate('/courses')} 
          className="mb-6 bg-emerald-600 hover:bg-emerald-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Courses
        </Button>

        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200 mb-8">
          <div className="h-64 overflow-hidden rounded-t-lg">
            <img 
              src={course.image} 
              alt={course.title} 
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle className="text-2xl text-gray-800">{course.title}</CardTitle>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mt-2">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {course.duration}
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {course.students.toLocaleString()} students
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-1 text-yellow-500" />
                {course.rating}
              </div>
            </div>
            <p className="text-gray-600 mt-2">Instructor: {course.instructor}</p>
            <p className="text-gray-700 mt-2">{course.description}</p>
          </CardHeader>
        </Card>

        <Card className="bg-white/90 backdrop-blur-sm border-emerald-200">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-gray-800">
              <BookOpen className="h-5 w-5 mr-2" />
              Course Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-emerald max-w-none">
              {course.fullContent.split('\n').map((line, index) => {
                if (line.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-bold text-gray-800 mt-6 mb-4">{line.substring(2)}</h1>;
                } else if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-xl font-semibold text-gray-700 mt-5 mb-3">{line.substring(3)}</h2>;
                } else if (line.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-medium text-gray-600 mt-4 mb-2">{line.substring(4)}</h3>;
                } else if (line.startsWith('- ')) {
                  return <li key={index} className="text-gray-600 ml-4 mb-1">{line.substring(2)}</li>;
                } else if (line.trim() === '') {
                  return <br key={index} />;
                } else {
                  return <p key={index} className="text-gray-600 mb-2">{line}</p>;
                }
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseDetail;
