"use client";

import { useState } from 'react';
import { Card } from './card';
import { Button } from './button';
import { Download, Heart } from 'lucide-react'; // Import icons

interface EmojiGridProps {
  emojis: Array<{
    url: string;
    likes: number;
    isLiked: boolean;
  }>;
  onLike: (index: number) => void;
}

export function EmojiGrid({ emojis, onLike }: EmojiGridProps) {
  const handleDownload = async (url: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'emoji.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading emoji:', error);
    }
  };

  const handleLikeClick = (index: number) => {
    console.log(`Like button clicked for emoji at index ${index}`);
    onLike(index);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-8">
      {emojis.map((emoji, index) => (
        <Card
          key={index}
          className="relative overflow-hidden group"
        >
          <img src={emoji.url} alt={`Generated Emoji ${index + 1}`} className="w-full h-auto" />
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              onClick={() => handleDownload(emoji.url)} 
              className="mr-2 bg-white text-black hover:bg-gray-200 transition-colors"
              size="sm"
            >
              <Download className="mr-1 h-4 w-4" /> Download
            </Button>
            <Button 
              onClick={() => handleLikeClick(index)}
              className={`${
                emoji.isLiked ? 'bg-red-500' : 'bg-white'
              } text-black hover:bg-red-600 hover:text-white transition-colors`}
              size="sm"
            >
              <Heart className="mr-1 h-4 w-4" fill={emoji.isLiked ? 'white' : 'none'} /> {emoji.likes}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}