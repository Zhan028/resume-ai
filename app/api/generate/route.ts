import Groq from 'groq-sdk';
import { buildPrompt } from '@/lib/prompt';
import { GenerateRequest } from '@/types/index';

const client = new Groq();

export async function POST(request: Request) {
  const body: GenerateRequest = await request.json();
  const { system, user } = buildPrompt(body);

  const stream = await client.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
    stream: true,
  });

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content ?? '';
        if (text) controller.enqueue(encoder.encode(text));
      }
      controller.close();
    },
  });

  return new Response(readable, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
