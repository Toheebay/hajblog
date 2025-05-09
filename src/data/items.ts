
export interface Item {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  seller: {
    id: string;
    name: string;
    avatar: string;
  };
  location: string;
  createdAt: string;
}

export const items: Item[] = [
  {
    id: "1",
    title: "Vintage Wooden Coffee Table",
    price: 120,
    description: "Beautiful handcrafted wooden coffee table in excellent condition. Slight signs of use but overall great quality.",
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Furniture",
    seller: {
      id: "101",
      name: "Emma Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    location: "Brooklyn, NY",
    createdAt: "2023-04-12T10:30:00Z",
  },
  {
    id: "2",
    title: "Modern Sofa with Cushions",
    price: 450,
    description: "Comfortable modern sofa in gray fabric. Includes 3 matching cushions. Only used for 6 months, like new condition.",
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Furniture",
    seller: {
      id: "102",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    location: "Austin, TX",
    createdAt: "2023-05-03T14:15:00Z",
  },
  {
    id: "3",
    title: "Tabby Cat - Needs New Home",
    price: 0,
    description: "Sweet 2-year-old tabby cat looking for a loving home. Vaccinated and neutered. Very friendly with children.",
    image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Pets",
    seller: {
      id: "103",
      name: "Sarah Williams",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    location: "Portland, OR",
    createdAt: "2023-05-15T09:45:00Z",
  },
  {
    id: "4",
    title: "Mountain Bike - Good Condition",
    price: 280,
    description: "Trek mountain bike, 3 years old but well maintained. 21 gears, front suspension, new tires installed last month.",
    image: "https://images.unsplash.com/photo-1493962853295-0fd70327578a?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Sports",
    seller: {
      id: "104",
      name: "James Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    location: "Denver, CO",
    createdAt: "2023-06-02T16:20:00Z",
  },
  {
    id: "5",
    title: "iPhone 12 - Mint Condition",
    price: 399,
    description: "iPhone 12 64GB in perfect condition. Includes original box, charger, and new screen protector. Battery health at 92%.",
    image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Electronics",
    seller: {
      id: "105",
      name: "Alex Thompson",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    location: "Miami, FL",
    createdAt: "2023-06-10T11:05:00Z",
  },
  {
    id: "6",
    title: "Vintage Leather Jacket",
    price: 85,
    description: "Classic brown leather jacket, size M. Real leather with minimal wear. Great for fall weather.",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    category: "Clothing",
    seller: {
      id: "106",
      name: "Olivia Martinez",
      avatar: "https://i.pravatar.cc/150?img=6",
    },
    location: "Chicago, IL",
    createdAt: "2023-06-18T13:40:00Z",
  }
];

export const categories = [
  "All",
  "Furniture",
  "Electronics",
  "Clothing",
  "Sports",
  "Pets",
  "Books",
  "Toys",
  "Vehicles",
  "Jewelry"
];
