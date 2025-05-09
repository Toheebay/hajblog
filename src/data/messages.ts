
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: string;
  itemId?: string;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message;
  itemId: string;
}

export const messages: Message[] = [
  {
    id: "m1",
    senderId: "user1", // Current user
    receiverId: "101", // Emma Johnson
    text: "Hi, is the coffee table still available?",
    timestamp: "2023-06-20T14:22:00Z",
    itemId: "1"
  },
  {
    id: "m2",
    senderId: "101", // Emma Johnson
    receiverId: "user1", // Current user
    text: "Yes, it's still available! Are you interested in seeing it?",
    timestamp: "2023-06-20T14:25:00Z",
    itemId: "1"
  },
  {
    id: "m3",
    senderId: "user1", // Current user
    receiverId: "101", // Emma Johnson
    text: "Great! Could I get more pictures of the table legs?",
    timestamp: "2023-06-20T14:28:00Z",
    itemId: "1"
  },
  {
    id: "m4",
    senderId: "101", // Emma Johnson
    receiverId: "user1", // Current user
    text: "Of course! I'll send them shortly. The legs are solid oak with no damage.",
    timestamp: "2023-06-20T14:30:00Z",
    itemId: "1"
  },
  {
    id: "m5",
    senderId: "user1", // Current user
    receiverId: "101", // Emma Johnson
    text: "Perfect! Would you consider $100 for it?",
    timestamp: "2023-06-20T14:33:00Z",
    itemId: "1"
  },
  {
    id: "m6",
    senderId: "101", // Emma Johnson
    receiverId: "user1", // Current user
    text: "I can do $110, and I can deliver it if you're in Brooklyn.",
    timestamp: "2023-06-20T14:36:00Z",
    itemId: "1"
  },
  {
    id: "m7",
    senderId: "user1", // Current user
    receiverId: "102", // Michael Chen
    text: "Hi there! Is your sofa still for sale?",
    timestamp: "2023-06-19T10:05:00Z",
    itemId: "2"
  },
  {
    id: "m8",
    senderId: "102", // Michael Chen
    receiverId: "user1", // Current user
    text: "Hello! Yes, it's still available. When would you like to see it?",
    timestamp: "2023-06-19T10:15:00Z",
    itemId: "2"
  }
];

export const conversations: Conversation[] = [
  {
    id: "c1",
    participants: ["user1", "101"],
    lastMessage: messages[5],
    itemId: "1"
  },
  {
    id: "c2",
    participants: ["user1", "102"],
    lastMessage: messages[7],
    itemId: "2"
  }
];
