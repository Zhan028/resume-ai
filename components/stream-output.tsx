interface StreamOutputProps {
    text: string;
    isLoading: boolean;
}

export default function StreamOutput({ text, isLoading }: StreamOutputProps) {
    return (
        <div className="border p-4 rounded min-h-[200px] whitespace-pre-wrap">
           {text || (isLoading ? 'Генерация...' : 'Здесь появится сгенерированный текст')}
        </div>
    );
}