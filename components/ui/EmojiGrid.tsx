import React from 'react';

interface Emoji {
  id: number;
  image_url: string;
  prompt: string;
  likes_count: number;
  creator_user_id: string;
  created_at: string;
}

interface EmojiGridProps {
  emojis: Emoji[];
  onLike: (id: number) => void;
}

export function EmojiGrid({ emojis, onLike }: EmojiGridProps) {
  console.log('Emojis received in EmojiGrid:', JSON.stringify(emojis, null, 2));

  if (!Array.isArray(emojis) || emojis.length === 0) {
    return <div>No emojis to display</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {emojis.map((emoji, index) => {
        if (!emoji || typeof emoji !== 'object') {
          console.error(`Invalid emoji at index ${index}:`, emoji);
          return null;
        }

        const { id, image_url, prompt, likes_count } = emoji;

        if (!id || !image_url || !prompt) {
          console.error(`Emoji at index ${index} is missing required properties:`, emoji);
          return null;
        }

        return (
          <div key={id} className="relative">
            <img 
              src={image_url} 
              alt={`Generated Emoji: ${prompt}`} 
              className="w-full h-auto" 
              onError={(e) => {
                console.error('Error loading image:', e);
                (e.target as HTMLImageElement).src = '/fallback-image.png';
              }}
            />
            <button
              onClick={() => onLike(id)}
              className="absolute top-2 right-2 text-gray-500"
            >
              ❤️ {likes_count}
            </button>
          </div>
        );
      })}
    </div>
  );
}