import { GenerateRequest } from '../types/index';

export function buildPrompt(data: GenerateRequest): {
    system: string;
    user: string;
} {
    const typeLabel = {
        'cover-letter' : 'сопроводительное письмо',
        'reference-letter' : 'рекомендательное письмо',
        'other' : 'профессиональный документ'
    }[data.letterType];
    const system = `Ты эксперт по карьере и написанию профессиональных документов.
Твоя задача — помогать кандидатам адаптировать резюме и писать сопроводительные письма под конкретную вакансию.
Пиши профессионально, конкретно, без воды. Используй язык из описания вакансии.`;
    const user = `Напиши ${typeLabel} на основе следующих данных.
    Описание вакансии:${data.jobDescription}
    Моё резюме:${data.resume}. Адаптируй текст под эту вакансию, выдели релевантный опыт.`;

    return { system, user };
}