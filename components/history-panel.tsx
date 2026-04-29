'use client';

import { HistoryItem } from "@/types";

interface HistoryPanelProps {
    history: HistoryItem[];
    onSelect: (item: HistoryItem) => void;
}

export default function HistoryPanel({ history, onSelect }: HistoryPanelProps) {
    if(history.length === 0) {return null;}

    return (
        <div className="flex flex-col gap-4">
            <h2 className="font-semibold">История</h2>
            {history.map((item) => (
                <button 
                    key={item.id} 
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    onClick={() => onSelect(item)}
                >
                    <div className="font-medium">{item.letterType}</div>
  <div className="text-sm">{item.jobDescription.slice(0, 60)}...</div>
  <div className="text-xs text-gray-400">{item.createdAt.toLocaleString()}</div>
                    </button>
            ))}
        </div>
    );
}