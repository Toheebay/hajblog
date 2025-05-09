
import React from 'react';
import { Message } from '@/data/messages';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  const messageTime = format(new Date(message.timestamp), 'h:mm a');

  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
      {!isCurrentUser && (
        <Avatar className="h-8 w-8 mr-2 mt-1">
          <AvatarImage src={`https://i.pravatar.cc/150?img=${message.senderId}`} alt="Sender" />
          <AvatarFallback>{message.senderId.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
      )}
      
      <div>
        <div className={`chat-message-bubble ${isCurrentUser ? 'chat-message-sender' : 'chat-message-receiver'}`}>
          {message.text}
        </div>
        <div className={`text-xs text-gray-500 ${isCurrentUser ? 'text-right' : 'text-left'}`}>
          {messageTime}
        </div>
      </div>
      
      {isCurrentUser && (
        <Avatar className="h-8 w-8 ml-2 mt-1">
          <AvatarImage src="https://i.pravatar.cc/150?img=12" alt="You" />
          <AvatarFallback>Y</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default ChatMessage;
