'use client';

import { useState } from 'react';
import { EmojiGenerator } from '../components/ui/EmojiGenerator';
import { EmojiGrid } from '../components/ui/EmojiGrid';

interface Emoji {
  id: number;
  image_url: string;
  prompt: string;
  likes_count: number;
  creator_user_id: string;
  created_at: string;
}

export default function Home() {
  const [generatedEmojis, setGeneratedEmojis] = useState<Emoji[]>([]);

  const handleEmojiGenerated = (emoji: Emoji) => {
    console.log('New emoji generated:', emoji);
    setGeneratedEmojis((prev) => [emoji, ...prev]);
  };

  const handleLike = (index: number) => {
    // ... existing like handling code ...
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Emoji Maker</h1>
      <EmojiGenerator onEmojiGenerated={handleEmojiGenerated} />
      <EmojiGrid emojis={generatedEmojis} onLike={handleLike} />
    </main>
  );
}
