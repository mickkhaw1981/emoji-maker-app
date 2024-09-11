'use client';

import { useState } from 'react';
import { EmojiGenerator } from '../components/ui/EmojiGenerator';
import { EmojiGrid } from '../components/ui/EmojiGrid';

export default function Home() {
  const [generatedEmojis, setGeneratedEmojis] = useState<Array<{ url: string, likes: number, isLiked: boolean }>>([]);

  const handleEmojiGenerated = (url: string) => {
    setGeneratedEmojis((prev) => [{ url, likes: 0, isLiked: false }, ...prev]);
  };

  const handleLike = (index: number) => {
    console.log(`handleLike called for index ${index}`);
    setGeneratedEmojis((prev) => {
      const newEmojis = [...prev];
      newEmojis[index] = {
        ...newEmojis[index],
        likes: newEmojis[index].isLiked ? newEmojis[index].likes - 1 : newEmojis[index].likes + 1,
        isLiked: !newEmojis[index].isLiked,
      };
      console.log('Updated emojis:', newEmojis);
      return newEmojis;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Emoji Maker</h1>
      <EmojiGenerator onEmojiGenerated={handleEmojiGenerated} />
      <EmojiGrid emojis={generatedEmojis} onLike={handleLike} />
    </main>
  );
}
