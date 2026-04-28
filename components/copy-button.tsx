'use client';

import { useState } from "react";

interface CopyButtonProps {
    text: string;
    onCopy?: () => void;
}

export default function CopyButton({ text, onCopy }: CopyButtonProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        onCopy?.();
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button onClick={handleCopy} className="bg-gray-200 text-gray-800 px-4 py-2 rounded">
            {copied ? 'Скопировано!' : 'Копировать'}
        </button>
    );
}