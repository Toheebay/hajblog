
export interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string; // Primary image for display
  images: string[]; // Additional images
  location: string; // Added location field
  createdAt: string; // Added createdAt field
  seller: {
    id: string;
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    location: string;
    email: string;
    whatsapp: string;
    phone: string;
    website: string;
  };
  features: string[];
  duration: string;
  groupSize: string;
  includes: string[];
  excludes: string[];
  dates: string[];
}

export const items: Item[] = [
  {
    id: "1",
    title: "Premium Hajj Package 2024",
    description: "Complete Hajj pilgrimage package with 5-star accommodation in Makkah and Madinah. Includes guided tours, transportation, and all religious ceremonies.",
    price: 8500,
    currency: "USD",
    category: "Hajj Packages",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=600&h=400&fit=crop"
    ],
    location: "Makkah, Saudi Arabia",
    createdAt: "2024-01-15T10:30:00Z",
    seller: {
      id: "seller1",
      name: "Ahmed Al-Rashid",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 4.9,
      reviews: 156,
      location: "Riyadh, Saudi Arabia",
      email: "ahmed@hajjservices.com",
      whatsapp: "+966501234567",
      phone: "+966501234567",
      website: "https://hajjservices.com"
    },
    features: [
      "5-star accommodation",
      "Private transportation",
      "English-speaking guide",
      "Group prayers coordination",
      "24/7 support"
    ],
    duration: "15 days",
    groupSize: "20-30 people",
    includes: [
      "Round-trip flights",
      "Visa processing",
      "Hotel accommodation",
      "All meals",
      "Transportation",
      "Guided tours"
    ],
    excludes: [
      "Personal expenses",
      "Shopping",
      "Optional tours",
      "Travel insurance"
    ],
    dates: [
      "2024-06-10 to 2024-06-25",
      "2024-06-15 to 2024-06-30"
    ]
  },
  {
    id: "2",
    title: "Umrah Express Package",
    description: "Quick 7-day Umrah package perfect for busy professionals. Comfortable 4-star hotels with convenient locations.",
    price: 2800,
    currency: "USD",
    category: "Umrah Packages",
    image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=600&h=400&fit=crop"
    ],
    location: "Jeddah, Saudi Arabia",
    createdAt: "2024-02-01T14:20:00Z",
    seller: {
      id: "seller2",
      name: "Fatima Al-Zahra",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 4.8,
      reviews: 89,
      location: "Jeddah, Saudi Arabia",
      email: "fatima@umrahexpress.com",
      whatsapp: "+966502345678",
      phone: "+966502345678",
      website: "https://umrahexpress.com"
    },
    features: [
      "4-star accommodation",
      "Airport transfers",
      "Group coordination",
      "Flexible schedule"
    ],
    duration: "7 days",
    groupSize: "15-25 people",
    includes: [
      "Round-trip flights",
      "Visa processing",
      "Hotel accommodation",
      "Breakfast & dinner",
      "Airport transfers"
    ],
    excludes: [
      "Lunch",
      "Personal expenses",
      "Shopping",
      "Travel insurance"
    ],
    dates: [
      "2024-03-15 to 2024-03-22",
      "2024-04-01 to 2024-04-08",
      "2024-04-15 to 2024-04-22"
    ]
  },
  {
    id: "3",
    title: "Family Hajj Package",
    description: "Special family-oriented Hajj package with spacious family rooms and child-friendly services.",
    price: 12000,
    currency: "USD",
    category: "Hajj Packages",
    image: "https://images.unsplash.com/photo-1544765503-6877a1b7dea2?w=600&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544765503-6877a1b7dea2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1574282893019-1aa73378b2dd?w=600&h=400&fit=crop"
    ],
    location: "Makkah, Saudi Arabia",
    createdAt: "2024-01-20T09:15:00Z",
    seller: {
      id: "seller3",
      name: "Omar Hassan",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 4.7,
      reviews: 124,
      location: "Makkah, Saudi Arabia",
      email: "omar@familyhajj.com",
      whatsapp: "+966503456789",
      phone: "+966503456789",
      website: "https://familyhajj.com"
    },
    features: [
      "Family rooms",
      "Child care services",
      "Educational programs",
      "Family-friendly schedule"
    ],
    duration: "18 days",
    groupSize: "10-15 families",
    includes: [
      "Round-trip flights",
      "Visa processing",
      "Family accommodation",
      "All meals",
      "Child care",
      "Educational tours"
    ],
    excludes: [
      "Personal expenses",
      "Medical expenses",
      "Shopping",
      "Additional activities"
    ],
    dates: [
      "2024-06-20 to 2024-07-08",
      "2024-07-01 to 2024-07-19"
    ]
  }
];
