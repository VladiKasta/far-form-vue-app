type AnswerData = {
	answer: string
	comment?: string
	message?: string
	files?: unknown[]
	brands?: string
}

type AnswerKey = keyof AnswerData

export { AnswerData, AnswerKey }
