
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// Dummy certification data
const certifications = [
  {
    id: 1,
    title: "Financial Market Specialist",
    description: "Demonstrate expertise in financial markets analysis and trading",
    progress: 65,
    modules: [
      { name: "Market Fundamentals", completed: true },
      { name: "Technical Analysis", completed: true },
      { name: "Risk Management", completed: true },
      { name: "Portfolio Construction", completed: false },
      { name: "Final Assessment", completed: false },
    ]
  },
  {
    id: 2,
    title: "Retirement Planning Advisor",
    description: "Specialized knowledge in retirement planning strategies and execution",
    progress: 30,
    modules: [
      { name: "Retirement Basics", completed: true },
      { name: "Investment Strategies", completed: true },
      { name: "Tax Planning", completed: false },
      { name: "Estate Planning", completed: false },
      { name: "Social Security Optimization", completed: false },
    ]
  },
  {
    id: 3,
    title: "Youth Financial Literacy",
    description: "Core financial knowledge for young people entering the financial world",
    progress: 85,
    modules: [
      { name: "Banking Fundamentals", completed: true },
      { name: "Budgeting", completed: true },
      { name: "Saving Strategies", completed: true },
      { name: "Introduction to Investing", completed: true },
      { name: "Credit and Loans", completed: false },
    ]
  }
];

const Certifications = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container py-12 md:py-24">
        <div className="flex items-center gap-3 mb-8">
          <Award className="h-8 w-8 text-marketplace-primary" />
          <h1 className="text-2xl md:text-3xl font-bold">Certification Tracker</h1>
        </div>
        
        {!user ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-medium mb-2">Login to Track Your Certifications</h2>
              <p className="text-gray-500 mb-4">
                Sign in to view and track your progress on various certification paths.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications.map(cert => (
              <Card key={cert.id} className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl mb-2">{cert.title}</CardTitle>
                      <p className="text-sm text-gray-600">{cert.description}</p>
                    </div>
                    <div className="bg-white rounded-full p-2 shadow-sm">
                      <Award className={`h-8 w-8 ${cert.progress === 100 ? 'text-yellow-500' : 'text-gray-400'}`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-5">
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Progress</span>
                      <span className="font-medium">{cert.progress}%</span>
                    </div>
                    <Progress value={cert.progress} className="h-2" />
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Modules:</h4>
                    {cert.modules.map((module, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className={`w-5 h-5 mr-3 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-500' : 'bg-gray-200'}`}>
                          {module.completed && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                          )}
                        </div>
                        <span className={`text-sm ${module.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {module.name}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full mt-6">
                    {cert.progress === 100 ? 'Download Certificate' : 'Continue Learning'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Certifications;
