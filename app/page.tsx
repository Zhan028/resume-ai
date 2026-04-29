'use client';

import {  useState, useEffect } from "react";
import { HistoryItem, LetterType } from "@/types";
import HistoryPanel from "@/components/history-panel";
import JobForm from "@/components/job-form";
import TypeSelector from "@/components/type-selector";
import StreamOutput from "@/components/stream-output";
import CopyButton from "@/components/copy-button";

export default function Home(){
  const [letterType, setLetterType] = useState<LetterType>('cover-letter');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
 const [history, setHistory] = useState<HistoryItem[]>([]);

useEffect(() => {
  const saved = localStorage.getItem('resume-ai-history');
  if (saved) {
    setHistory(JSON.parse(saved).map((item: HistoryItem) => ({
      ...item,
      createdAt: new Date(item.createdAt),
    })));
  }
}, []);

useEffect(() => {
  localStorage.setItem('resume-ai-history', JSON.stringify(history));
}, [history]);  

  function handleSelectHistory(item: HistoryItem) {
    setOutput(item.output);
  }
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

    let fullText = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value);
      fullText += chunk;
      setOutput(fullText);
    }

  
   
    setHistory(prev => [
      {
        id: crypto.randomUUID(),
        letterType,
        jobDescription: data.jobDescription,
        output: fullText,
        createdAt: new Date()
      },
      ...prev
    ]); 

     setIsLoading(false);
  }
  
  return (
    <main className="max-w-3xl mx-auto p-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-center">Генератор профессиональных писем на основе ИИ</h1>
      <TypeSelector value={letterType} onChange={setLetterType} />
      <HistoryPanel history={history} onSelect={handleSelectHistory} />
      <JobForm onSubmit={handleSubmit} isLoading={isLoading} />
      <StreamOutput text={output} isLoading={isLoading} />
      {output && !isLoading && <CopyButton text={output} />}
    </main>
  );
}