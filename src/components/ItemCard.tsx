
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Item } from '@/data/items';
import { formatDistanceToNow } from 'date-fns';
import { MessageCircle } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  const timeAgo = formatDistanceToNow(new Date(item.createdAt), { addSuffix: true });
  const { formatPrice } = useCurrency();

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <Link to={`/item/${item.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={item.image} 
            alt={item.title}
            className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 right-0 m-2 bg-marketplace-accent text-white px-2 py-1 rounded-md text-sm font-medium">
            {item.price === 0 ? "FREE" : formatPrice(item.price)}
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{item.title}</h3>
          <p className="text-sm text-gray-500">{item.location} • {timeAgo}</p>
          <p className="mt-2 text-sm line-clamp-2 text-gray-700">{item.description}</p>
        </CardContent>
      </Link>
      
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={item.seller.avatar} alt={item.seller.name} />
            <AvatarFallback>{item.seller.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <span className="text-xs text-gray-600">{item.seller.name}</span>
        </div>
        
        <Link 
          to={`/chat/${item.seller.id}?itemId=${item.id}`}
          className="flex items-center text-marketplace-primary hover:text-marketplace-dark"
        >
          <MessageCircle className="h-4 w-4 mr-1" />
          <span className="text-xs">Chat</span>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ItemCard;
