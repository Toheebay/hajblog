
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Send } from 'lucide-react';
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
      
      <div className="marketplace-container pt-20 pb-10 h-screen">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[calc(100vh-120px)]">
          <div className="flex items-center space-x-3 p-4 border-b">
            <Link to={`/profile/${seller.id}`}>
              <UserAvatar 
                src={seller.avatar}
                name={seller.name}
                size="md"
              />
            </Link>
            <div>
              <h1 className="font-semibold">{seller.name}</h1>
              {item && (
                <div className="text-sm text-gray-600">
                  <Link to={`/item/${item.id}`} className="hover:underline">
                    Discussing: {item.title}
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          <ScrollArea className="h-[calc(100%-130px)] p-4">
            <div className="space-y-2">
              {messages.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  Start a conversation with {seller.name}!
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
          
          <div className="border-t p-4">
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button 
                type="submit" 
                className="bg-marketplace-primary hover:bg-marketplace-dark"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
