"use client";

import { useState } from 'react';
import { Card } from './card';
import { Button } from './button';
import { Download, Heart } from 'lucide-react'; // Import icons

interface EmojiGridProps {
  emojis: string[];
}

export function EmojiGrid({ emojis }: EmojiGridProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  const handleLike = (index: number) => {
    // TODO: Implement like functionality
    console.log(`Liked emoji at index ${index}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
      {emojis.map((emoji, index) => (
        <Card
          key={index}
          className="relative overflow-hidden group"
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <img src={emoji} alt={`Generated Emoji ${index + 1}`} className="w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={() => handleDownload(emoji)} 
              className="mr-2 bg-white text-black hover:bg-gray-200 transition-colors"
              size="sm"
            >
              <Download className="mr-1 h-4 w-4" /> Download
            </Button>
            <Button 
              onClick={() => handleLike(index)}
              className="bg-red-500 text-white hover:bg-red-600 transition-colors"
              size="sm"
            >
              <Heart className="mr-1 h-4 w-4" /> Like
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}