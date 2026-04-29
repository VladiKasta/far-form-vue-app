type AnswerData = {
	answer: string
	comment?: string
	files?: unknown[]
	brands?: string[]
}

type AnswerKey = keyof AnswerData

export { AnswerData, AnswerKey }
