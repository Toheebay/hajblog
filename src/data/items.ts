
export interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  location: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  createdAt: string;
}

// Hajj-specific categories for the marketplace
export const categories = [
  "All",
  "Accommodation", 
  "Transportation", 
  "Tour Guides", 
  "Visa Services", 
  "Travel Insurance", 
  "Religious Items", 
  "Halal Food", 
  "Medical Services",
  "Money Exchange", 
  "Communication Services", 
  "Luggage Services", 
  "Emergency Services"
];

// Sample Hajj-related items
export const items: Item[] = [
  {
    id: "1",
    title: "Premium Hajj Accommodation Near Haram",
    price: 299,
    description: "5-star hotel accommodation just 200m from Masjid al-Haram with air conditioning, prayer facilities, and halal breakfast included. Perfect for your sacred journey.",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop",
    category: "Accommodation",
    location: "Makkah, Saudi Arabia",
    seller: {
      id: "seller1",
      name: "Ahmed Al-Rashid",
      avatar: "https://i.pravatar.cc/150?u=ahmed"
    },
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    title: "Professional Hajj Guide Services",
    price: 150,
    description: "Experienced Hajj guide with 15+ years of experience. Fluent in Arabic, English, and Urdu. Will assist you through all Hajj rituals with patience and care.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop",
    category: "Tour Guides",
    location: "Makkah & Madinah",
    seller: {
      id: "seller2",
      name: "Fatima Hassan",
      avatar: "https://i.pravatar.cc/150?u=fatima"
    },
    createdAt: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    title: "Hajj Transportation Package",
    price: 89,
    description: "Comfortable air-conditioned transportation between Makkah, Madinah, and holy sites. Includes airport pickup and drop-off with experienced drivers.",
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&auto=format&fit=crop",
    category: "Transportation",
    location: "Saudi Arabia",
    seller: {
      id: "seller3",
      name: "Omar Transportation",
      avatar: "https://i.pravatar.cc/150?u=omar"
    },
    createdAt: "2024-01-13T09:20:00Z"
  },
  {
    id: "4",
    title: "Complete Hajj Visa Processing",
    price: 199,
    description: "Fast and reliable Hajj visa processing service. We handle all documentation and embassy procedures. 99% approval rate with money-back guarantee.",
    image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&auto=format&fit=crop",
    category: "Visa Services",
    location: "Online Service",
    seller: {
      id: "seller4",
      name: "Global Visa Solutions",
      avatar: "https://i.pravatar.cc/150?u=visa"
    },
    createdAt: "2024-01-12T14:10:00Z"
  },
  {
    id: "5",
    title: "Organic Halal Meals for Pilgrims",
    price: 25,
    description: "Fresh, organic halal meals prepared according to Islamic guidelines. Available for delivery to your accommodation in Makkah and Madinah.",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=800&auto=format&fit=crop",
    category: "Halal Food",
    location: "Makkah & Madinah",
    seller: {
      id: "seller5",
      name: "Pure Halal Kitchen",
      avatar: "https://i.pravatar.cc/150?u=kitchen"
    },
    createdAt: "2024-01-11T11:30:00Z"
  },
  {
    id: "6",
    title: "Emergency Medical Services",
    price: 0,
    description: "24/7 emergency medical assistance for pilgrims. Certified medical team with ambulance services available throughout your Hajj journey.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&auto=format&fit=crop",
    category: "Medical Services",
    location: "Makkah & Madinah",
    seller: {
      id: "seller6",
      name: "Hajj Medical Care",
      avatar: "https://i.pravatar.cc/150?u=medical"
    },
    createdAt: "2024-01-10T16:45:00Z"
  }
];
