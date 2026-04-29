export type LetterType = 'cover-letter' | 'reference-letter' | 'other';

export interface GenerateRequest {
    jobDescription: string;
    resume: string;
    letterType: LetterType;
}

export interface HistoryItem {
    id: string;
    letterType: LetterType;
    jobDescription: string;
    output : string;
    createdAt: Date;
}