export type LetterType = 'cover-letter' | 'reference-letter' | 'other';

export interface GenerateRequest {
    jobDescription: string;
    resume: string;
    letterType: LetterType;
}