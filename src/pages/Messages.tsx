
import React from 'react';
import { Link } from 'react-router-dom';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { conversations } from '@/data/messages';
import { items } from '@/data/items';
import { format, formatDistanceToNow } from 'date-fns';
import Navbar from '@/components/Navbar';
import UserAvatar from '@/components/UserAvatar';

const Messages = () => {
  const currentUserId = "user1"; // Hardcoded for demo
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="marketplace-container pt-24 pb-10">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h1 className="text-xl font-bold">Messages</h1>
          </div>
          
          <ScrollArea className="h-[calc(100vh-200px)]">
            {conversations.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                No conversations yet
              </div>
            ) : (
              conversations.map((conversation) => {
                // Get the other participant (not current user)
                const otherParticipantId = conversation.participants.find(id => id !== currentUserId);
                if (!otherParticipantId) return null;
                
                // Find the item
                const item = items.find(i => i.id === conversation.itemId);
                if (!item) return null;
                
                // Get the other user details
                const otherUser = item.seller.id === otherParticipantId ? item.seller : null;
                if (!otherUser) return null;
                
                // Format the timestamp
                const messageTime = formatDistanceToNow(new Date(conversation.lastMessage.timestamp), { addSuffix: true });
                
                return (
                  <div key={conversation.id}>
                    <Link 
                      to={`/chat/${otherUser.id}?itemId=${item.id}`}
                      className="block p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <UserAvatar 
                          src={otherUser.avatar}
                          name={otherUser.name}
                          size="md"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-medium truncate">{otherUser.name}</h3>
                            <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{messageTime}</span>
                          </div>
                          <div className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage.text}</div>
                          <div className="text-xs text-gray-500 mt-1 truncate">
                            Item: {item.title}
                          </div>
                        </div>
                      </div>
                    </Link>
                    <Separator />
                  </div>
                );
              })
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Messages;
