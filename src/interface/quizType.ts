import { QuizFormData } from './FormData'

export type AnswerData = {
	answer?: string | number
	comment?: string
	message?: string
	brands?: string
	files?: File[]
}

export type StepIndex = 1 | 2 | 3 | 4 | 5

export type QuizState = {
	answers: Partial<Record<StepIndex, AnswerData>>
	formData: QuizFormData
}

export type QuizStateGlobal = {
	answers: AnswerData
	formData: FormData
}
