'use client';

import { useState } from 'react';
import { EmojiGenerator } from '../components/ui/EmojiGenerator';
import { EmojiGrid } from '../components/ui/EmojiGrid';

export default function Home() {
  const [generatedEmojis, setGeneratedEmojis] = useState<string[]>([]);

  const handleEmojiGenerated = (url: string) => {
    setGeneratedEmojis((prev) => [url, ...prev]);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="text-4xl font-bold mb-8">Emoji Maker</h1>
      <EmojiGenerator onEmojiGenerated={handleEmojiGenerated} />
      <EmojiGrid emojis={generatedEmojis} />
    </main>
  );
}
