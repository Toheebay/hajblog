
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Send, Globe, Mail, MessageCircle, Phone, Star, MapPin } from 'lucide-react';
import ChatMessage from '@/components/ChatMessage';
import { messages as allMessages, Message } from '@/data/messages';
import { items } from '@/data/items';
import Navbar from '@/components/Navbar';
import UserAvatar from '@/components/UserAvatar';

const Chat = () => {
  const { userId } = useParams<{ userId: string }>();
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('itemId');
  const currentUserId = "user1"; // Hardcoded for demo
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  // Get item being discussed (if applicable)
  const item = itemId ? items.find(item => item.id === itemId) : undefined;
  
  // Get seller info
  const seller = item?.seller || items.find(item => item.seller.id === userId)?.seller;
  
  // Set up messages for this chat
  useEffect(() => {
    if (userId) {
      const relevantMessages = allMessages.filter(
        m => (m.senderId === userId && m.receiverId === currentUserId) || 
             (m.senderId === currentUserId && m.receiverId === userId)
      );
      
      // Sort by timestamp
      const sortedMessages = relevantMessages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      
      setMessages(sortedMessages);
    }
  }, [userId, currentUserId]);
  
  // Scroll to bottom on new messages
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !userId) return;
    
    const now = new Date();
    const newMessageObj: Message = {
      id: `m${Date.now()}`,
      senderId: currentUserId,
      receiverId: userId,
      text: newMessage,
      timestamp: now.toISOString(),
      itemId
    };
    
    setMessages([...messages, newMessageObj]);
    setNewMessage('');

    // Simulate agent reply after 2 seconds
    setTimeout(() => {
      const agentReply: Message = {
        id: `m${Date.now() + 1}`,
        senderId: userId,
        receiverId: currentUserId,
        text: getAgentReply(newMessage),
        timestamp: new Date().toISOString(),
        itemId
      };
      setMessages(prev => [...prev, agentReply]);
    }, 2000);
  };

  const getAgentReply = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
      return "Thank you for your inquiry! I'd be happy to discuss pricing with you. Our packages are competitively priced and include comprehensive services. Let me know your specific requirements so I can provide you with the best quote.";
    } else if (lowerMessage.includes('available') || lowerMessage.includes('dates')) {
      return "We have several dates available for both Hajj and Umrah packages. I can check our current availability and send you a detailed schedule. When would you prefer to travel?";
    } else if (lowerMessage.includes('booking') || lowerMessage.includes('reserve')) {
      return "I can help you with the booking process right away! To secure your spot, I'll need some basic information from you. Would you like to proceed with the reservation?";
    } else {
      return "Thank you for reaching out! I'm here to help you with any questions about our Hajj and Umrah services. Feel free to ask about packages, pricing, dates, or anything else you'd like to know.";
    }
  };
  
  if (!seller) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">User Not Found</h2>
          <Link to="/">
            <Button>Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-120px)]">
          {/* Agent Information Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3">
                  <UserAvatar 
                    src={seller.avatar}
                    name={seller.name}
                    size="lg"
                  />
                  <div className="flex-1">
                    <h2 className="font-bold text-lg">{seller.name}</h2>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{seller.rating} • {seller.reviews} reviews</span>
                    </div>
                    <Badge variant="secondary" className="mt-1">
                      Verified Agent
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Location */}
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{seller.location}</span>
                </div>

                {/* Contact Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm text-gray-800">Contact Information</h3>
                  
                  {/* Email */}
                  <a 
                    href={`mailto:${seller.email || 'contact@hajjagent.com'}`}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Email</div>
                      <div className="text-xs text-gray-500">{seller.email || 'contact@hajjagent.com'}</div>
                    </div>
                  </a>

                  {/* WhatsApp */}
                  <a 
                    href={`https://wa.me/${seller.whatsapp || '+1234567890'}?text=Hi, I'm interested in your Hajj services`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">WhatsApp</div>
                      <div className="text-xs text-gray-500">{seller.whatsapp || '+1 (234) 567-890'}</div>
                    </div>
                  </a>

                  {/* Phone */}
                  <a 
                    href={`tel:${seller.phone || '+1234567890'}`}
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Phone className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Phone</div>
                      <div className="text-xs text-gray-500">{seller.phone || '+1 (234) 567-890'}</div>
                    </div>
                  </a>

                  {/* Website */}
                  <a 
                    href={seller.website || 'https://hajjagency.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                      <Globe className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Website</div>
                      <div className="text-xs text-gray-500">{seller.website || 'hajjagency.com'}</div>
                    </div>
                  </a>
                </div>

                {/* Experience */}
                <div className="pt-3 border-t">
                  <div className="text-xs text-gray-500 mb-1">Experience</div>
                  <div className="text-sm font-medium">15+ Years in Hajj Services</div>
                </div>

                {/* Specialization */}
                <div className="pt-2">
                  <div className="text-xs text-gray-500 mb-2">Specialization</div>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Hajj Packages</Badge>
                    <Badge variant="outline" className="text-xs">Umrah Tours</Badge>
                    <Badge variant="outline" className="text-xs">Group Travel</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full flex flex-col">
              <div className="flex items-center space-x-3 p-4 border-b bg-gray-50">
                <Link to={`/profile/${seller.id}`}>
                  <UserAvatar 
                    src={seller.avatar}
                    name={seller.name}
                    size="md"
                  />
                </Link>
                <div className="flex-1">
                  <h1 className="font-semibold">{seller.name}</h1>
                  {item && (
                    <div className="text-sm text-gray-600">
                      <Link to={`/item/${item.id}`} className="hover:underline">
                        Discussing: {item.title}
                      </Link>
                    </div>
                  )}
                  <div className="flex items-center space-x-1 mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs text-green-600">Online</span>
                  </div>
                </div>
              </div>
              
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-10 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg font-medium mb-2">Start a conversation</p>
                      <p className="text-sm">Send a message to {seller.name} about their Hajj services</p>
                    </div>
                  ) : (
                    messages.map((message) => (
                      <ChatMessage 
                        key={message.id} 
                        message={message} 
                        isCurrentUser={message.senderId === currentUserId}
                      />
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              <div className="border-t p-4 bg-gray-50">
                <form onSubmit={handleSendMessage} className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1 bg-white"
                  />
                  <Button 
                    type="submit" 
                    className="bg-marketplace-primary hover:bg-marketplace-dark"
                    disabled={!newMessage.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
                <div className="text-xs text-gray-400 mt-2 text-center">
                  Messages are responded to automatically for demo purposes
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
