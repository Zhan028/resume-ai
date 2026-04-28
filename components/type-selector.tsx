'use client';

import { LetterType } from "@/types";

interface TypeSelectorProps {
    value: LetterType;
    onChange: (value: LetterType) => void;
}

const OPTIONS: { value: LetterType; label: string }[] = [
    { value: 'cover-letter', label: 'Сопроводительное письмо' },
    { value: 'reference-letter', label: 'Рекомендательное письмо' },
    { value: 'other', label: 'Другой профессиональный документ' },
];

export default function TypeSelector({ value, onChange }: TypeSelectorProps) {
    return (
        <div className="flex flex-col gap-2">
            {OPTIONS.map(opt => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={value === opt.value ? 'bg-black text-white px-4 py-2 rounded' : 'border px-4 py-2 rounded'}    
                    >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}