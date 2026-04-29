import { AnswerData, AnswerKey } from './Answer'

type StepConfig = {
	id: number
	label: string
	required: AnswerKey[] | ((data: AnswerData) => AnswerKey[])
}

export { StepConfig }
