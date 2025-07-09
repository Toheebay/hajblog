
import React, { useState, useEffect } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const EventCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Dynamic event images from around the world
  const eventImages = [
    {
      url: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=500&fit=crop",
      title: "Hajj Pilgrimage - Makkah",
      location: "Saudi Arabia",
      color: "from-emerald-600 to-teal-600"
    },
    {
      url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=800&h=500&fit=crop",
      title: "Islamic Architecture",
      location: "Istanbul, Turkey",
      color: "from-blue-600 to-indigo-600"
    },
    {
      url: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=800&h=500&fit=crop",
      title: "Beautiful Mosque",
      location: "Dubai, UAE",
      color: "from-purple-600 to-pink-600"
    },
    {
      url: "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=800&h=500&fit=crop",
      title: "Grand Mosque",
      location: "Malaysia",
      color: "from-orange-600 to-red-600"
    },
    {
      url: "https://images.unsplash.com/photo-1574282893019-1aa73378b2dd?w=800&h=500&fit=crop",
      title: "Islamic Art & Design",
      location: "Morocco",
      color: "from-green-600 to-emerald-600"
    },
    {
      url: "https://images.unsplash.com/photo-1544765503-6877a1b7dea2?w=800&h=500&fit=crop",
      title: "Sacred Interior",
      location: "Egypt",
      color: "from-yellow-600 to-orange-600"
    }
  ];

  // Auto rotate images every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % eventImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [eventImages.length]);

  return (
    <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-xl shadow-lg">
      <Carousel className="w-full h-full">
        <CarouselContent className="h-full">
          {eventImages.map((event, index) => (
            <CarouselItem key={index} className="relative h-full">
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src={event.url}
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${event.color} opacity-60`}></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{event.title}</h3>
                  <p className="text-sm md:text-base opacity-90">{event.location}</p>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4 bg-white/20 border-white/30 text-white hover:bg-white/40" />
        <CarouselNext className="right-4 bg-white/20 border-white/30 text-white hover:bg-white/40" />
      </Carousel>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {eventImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default EventCarousel;
