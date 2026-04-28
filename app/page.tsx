'use client';

import { useState } from "react";
import { LetterType } from "@/types";
import JobForm from "@/components/job-form";
import TypeSelector from "@/components/type-selector";
import StreamOutput from "@/components/stream-output";
import CopyButton from "@/components/copy-button";

export default function Home(){
  const [letterType, setLetterType] = useState<LetterType>('cover-letter');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(data: { jobDescription: string; resume: string }) {
    setIsLoading(true);
    setOutput('');

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, letterType })
    });

    const reader = res.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setOutput(prev => prev + decoder.decode(value));
    }
    setIsLoading(false);
  }
  return (
    <main className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Генератор профессиональных писем на основе ИИ</h1>
      <TypeSelector value={letterType} onChange={setLetterType} />
      <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
      <StreamOutput text={output} isLoading={isLoading} />
      {output && !isLoading && <CopyButton text={output} />}
    </main>
  );
}