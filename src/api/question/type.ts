export type Answer = {
    id: string
    answerContent: string
    isCorrectAnswer: boolean
}

export type Question = {
    id?: string | null
    questionContent: string
    difficulty: string
    answers: Answer[]
    category?: string
    categoryId?: string
    questionType?: string
    questionAnswers?: {
        answerContent: string
        isCorrectAnswer: boolean
    }[]
}

export type Quiz = {
    questions: Question[]
}

export enum TypeQuestion {
    Recognizing = "Recognizing",
    Understanding = "Understanding",
    Applying = "Applying",
    Analyzing = "Analyzing",
}