import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { AnswerData } from '../interface/Answer'
import { QuizFormData } from '../interface/FormData'

const useQuizStore = defineStore('quiz', () => {
	// ответы по шагам
	const answers = reactive<Record<number, AnswerData>>({})

	// основная форма
	const formData = reactive<QuizFormData>({
		fio: '',
		city: '',
		portfolioLink: '',
		phone: '',
		email: '',
		site: '',
		policy1: false,
		policy2: false,
	})

	const step = ref(1)
	const setStep = (value: number) => {
		step.value = value
	}

	const setAnswer = (step: number, data: AnswerData) => {
		answers[step] = data
	}

	const reset = () => {
		Object.keys(answers).forEach(key => {
			delete answers[Number(key)]
		})

		Object.assign(formData, {
			fio: '',
			city: '',
			portfolioLink: '',
			phone: '',
			email: '',
			site: '',
			policy1: false,
			policy2: false,
		})
	}

	return {
		answers,
		formData,
		step,
		setStep,
		setAnswer,
		reset,
	}
})

export { useQuizStore }
