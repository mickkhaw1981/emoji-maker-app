// Import the NextResponse object from Next.js server components
import { NextResponse } from 'next/server';

// Import the generateEmoji function from our custom replicate library
import { generateEmoji } from '@/lib/replicate';

// Define an asynchronous POST function to handle incoming requests
export async function POST(request: Request) {
  try {
    // Extract the 'prompt' from the request body
    const { prompt } = await request.json();

    // Generate an emoji URL using the provided prompt
    const emojiUrl = await generateEmoji(prompt);

    // Return a JSON response with the generated emoji URL
    return NextResponse.json({ url: emojiUrl });
  } catch (error) {
    // If an error occurs, log it to the console
    console.error('Error generating emoji:', error);

    // Return a JSON response with an error message and a 500 status code
    return NextResponse.json({ error: 'Failed to generate emoji' }, { status: 500 });
  }
}