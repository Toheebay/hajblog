
import React from 'react';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, description, url }) => {
  const currentUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);
  const encodedUrl = encodeURIComponent(currentUrl);

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    reddit: `https://reddit.com/submit?title=${encodedTitle}&url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`
  };

  const handleShare = (platform: string) => {
    const link = shareLinks[platform as keyof typeof shareLinks];
    if (link) {
      window.open(link, '_blank', 'width=600,height=400');
      toast.success(`Sharing on ${platform.charAt(0).toUpperCase() + platform.slice(1)}`);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: description,
          url: currentUrl,
        });
        toast.success('Shared successfully!');
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(currentUrl);
      toast.success('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm text-gray-600 mr-2">Share:</span>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('twitter')}
        className="flex items-center gap-1 text-blue-500 border-blue-200 hover:bg-blue-50"
      >
        <Twitter className="w-4 h-4" />
        Twitter
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('facebook')}
        className="flex items-center gap-1 text-blue-600 border-blue-200 hover:bg-blue-50"
      >
        <Facebook className="w-4 h-4" />
        Facebook
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('linkedin')}
        className="flex items-center gap-1 text-blue-700 border-blue-200 hover:bg-blue-50"
      >
        <Linkedin className="w-4 h-4" />
        LinkedIn
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('reddit')}
        className="flex items-center gap-1 text-orange-600 border-orange-200 hover:bg-orange-50"
      >
        <MessageCircle className="w-4 h-4" />
        Reddit
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={() => handleShare('whatsapp')}
        className="flex items-center gap-1 text-green-600 border-green-200 hover:bg-green-50"
      >
        <MessageCircle className="w-4 h-4" />
        WhatsApp
      </Button>
      
      <Button
        variant="outline"
        size="sm"
        onClick={handleNativeShare}
        className="flex items-center gap-1"
      >
        <Share2 className="w-4 h-4" />
        Share
      </Button>
    </div>
  );
};

export default SocialShare;
