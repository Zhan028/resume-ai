'use client';

import { useState } from "react";

interface JobFormProps {
    onSubmit: (data: { jobDescription: string; resume: string }) => void;
    isLoading: boolean;
}

export default function JobForm({onSubmit, isLoading}: JobFormProps) {
    const [jobDescription, setJobDescription] = useState('');
    const [resume, setResume] = useState('');

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit({ jobDescription, resume });
    }   

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
                <label className="font-semibold">Описание вакансии</label>  
                <textarea
                        
                    value={jobDescription}
                    onChange={e => setJobDescription(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Введите описание вакансии"
                    disabled={isLoading}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label className="font-semibold">Резюме</label>
                <textarea
                    rows={6}
                    value={resume}
                    onChange={e => setResume(e.target.value)}
                    className="border p-2 rounded"
                    placeholder="Введите ваше резюме"
                    disabled={isLoading}
                />
            </div>
            <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded">
                {isLoading ? 'Генерация...' : 'Сгенерировать'}
            </button>
        </form>
    );
}