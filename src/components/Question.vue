<script setup lang="ts">
import { computed, ref } from 'vue'
import sendQuizData from '../bitrixApi/sendQuizData'
import { steps } from '../composables/questionsData'
import { AnswerData } from '../interface/Answer'
import { BitrixAnswers, BitrixFormData, BitrixPayload } from '../interface/BitrixFormData'
import { QuizFormData } from '../interface/FormData'
import { StepConfig } from '../interface/Step'
import SuccessLayout from '../layouts/SuccessLayout.vue'
import { useQuizStore } from '../stores/aswers'
import Policy from './Policy.vue'
import FifthQuestion from './questions/FifthQuestion.vue'
import FirstQuestion from './questions/FirstQuestion.vue'
import ForthQuestion from './questions/ForthQuestion.vue'
import SecondQuestion from './questions/SecondQuestion.vue'
import ThirdQuestion from './questions/ThirdQuestion.vue'
import TermsPolicy from './TermsPolicy.vue'
import CloseIcon from './UI/CloseIcon.vue'
import LeftArrowIcon from './UI/LeftArrowIcon.vue'

export interface QuizState {
	formData: BitrixFormData
	answers: Record<number, AnswerData>
}

const quizStore = useQuizStore()
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')
const step = ref(1)
const defaultAgreement1 = ref(true)
const showErrors = ref(false)

const props = defineProps<{
	agreement: boolean
}>()

const emit = defineEmits(['open-terms', 'update:agreement'])

const toggleAgreement = () => {
	if (props.agreement) {
		emit('update:agreement', false)
	} else {
		emit('open-terms')
	}
}

const questionsComponents = [
	FirstQuestion,
	SecondQuestion,
	ThirdQuestion,
	ForthQuestion,
	FifthQuestion,
]

// 👉 текущие данные шага (из стора)
const currentData = computed(() => {
	return quizStore.answers[step.value] || {}
})

// 👉 обязательные поля
const getRequiredFields = (stepConfig: StepConfig, data: AnswerData) => {
	if (!stepConfig.required) return []

	return typeof stepConfig.required === 'function' ? stepConfig.required(data) : stepConfig.required
}

// 👉 валидация шага
const isStepValid = computed(() => {
	const data = currentData.value
	const currentStep = steps[step.value - 1]
	const requiredFields = getRequiredFields(currentStep, data)

	if (!requiredFields.length) return true

	return requiredFields.every(field => {
		if (!(field in data)) return false

		const value = data[field]

		if (Array.isArray(value)) return value.length > 0
		if (typeof value === 'string') return value.trim() !== ''

		return value !== null && value !== undefined
	})
})

const allowNext = computed(() => {
	return isStepValid.value && defaultAgreement1.value && props.agreement
})

// 👉 сохраняем ответ в Pinia
const handleAnswer = (data: AnswerData) => {
	quizStore.setAnswer(step.value, data)
}

// 👉 следующий шаг
const nextStep = (e: MouseEvent) => {
	e.preventDefault()

	if (!isStepValid.value || !defaultAgreement1.value || !props.agreement) {
		showErrors.value = true
		return
	}

	showErrors.value = false

	if (step.value === 5) {
		console.log(quizStore.answers)
		return
	}

	step.value++
}

const mapToBitrix = (form: QuizFormData): BitrixFormData => {
	return {
		form_text_61: form.fio, // ФИО
		form_text_62: form.phone, // телефон
		form_text_63: form.city, // город
		form_text_64: form.email, // email
		form_text_65: form.portfolioLink, // соцсети / портфолио
		form_text_66: form.site, // сайт

		form_checkbox_AGREE_CONDITIONS_OF_ACCREDITATION: form.policy1 ? ['67'] : [],
		form_checkbox_AGREE_PRIVACY_POLICY: form.policy2 ? ['68'] : [],
	}
}

const mapAnswersToBitrix = (answers: Record<number, AnswerData>): BitrixAnswers => {
	const result: BitrixAnswers = {}

	// 1 вопрос
	if (answers[1]) {
		result.form_checkbox_5_YEARS_OF_EXPERIENCE = answers[1].answer === 'yes' ? ['69'] : ['70']

		if (answers[1].files?.length) {
			result.photos_1 = answers[1].files as File[]
		}
	}

	// 2 вопрос
	if (answers[2]) {
		result.form_checkbox_COMPLETE_AND_SELECT_EQUIPMENT =
			answers[2].answer === 'yes' ? ['84'] : ['85']

		if (answers[2].comment) {
			result.form_textarea_86 = answers[2].comment
		}
	}

	// 3 вопрос
	if (answers[3]?.brands) {
		result.form_textarea_87 = answers[3].brands
	}

	// 4 вопрос
	if (answers[4]) {
		result.form_checkbox_USED_FAR = answers[4].answer === 'yes' ? ['88'] : ['89']

		if (answers[4].files) {
			result.photos_2 = answers[4].files as File[]
		}
	}

	// 5 вопрос
	if (answers[5]?.message) {
		result.form_textarea_100 = answers[5].message
	}

	return result
}

const sendData = async () => {
	try {
		const payload: BitrixPayload = {
			...mapToBitrix(quizStore.formData),
			...mapAnswersToBitrix(quizStore.answers),
		}

		const res: response = await sendQuizData(payload)

		console.log('SERVER RESPONSE:', res)

		type response = {
			success: boolean
		}

		if (res?.success == true) {
			submitStatus.value = 'success'
		} else {
			console.warn('Bitrix error response:', res)
			submitStatus.value = 'error'
		}
	} catch (error) {
		console.error(error)

		submitStatus.value = 'error'
	}
}

const close = () => {
	console.log('His')
	document.body.style.overflow = 'auto'
	const overlay = document.querySelector('.overlay') as HTMLElement
	const form = document.querySelector('.form-container') as HTMLElement
	const success = document.querySelector('.modal') as HTMLElement

	success.style.display = 'none'
	form.style.display = 'none'
	overlay.style.display = 'none'

	useQuizStore().reset()
	useQuizStore().setStep(1)
}
</script>

<template>
	<SuccessLayout v-if="submitStatus !== 'idle'">
		<template
			v-if="submitStatus === 'success'"
			#success
		>
			<div class="modal">
				<CloseIcon @click="close"></CloseIcon>
				<p class="title">Спасибо! Ваша заявка принята в работу.</p>

				<p class="text">
					Спасибо! Ваша заявка принята в работу.
					<br />
					Мы свяжемся с вами.
				</p>

				<button
					class="btn"
					@click="close"
				>
					ПОНЯТНО
				</button>
			</div>
		</template>

		<template
			v-else
			#fail
		>
			<div class="modal">
				<CloseIcon @click="close"></CloseIcon>
				<p class="title">Не удалось отправить заявку</p>

				<p class="text">
					Произошла ошибка при отправке формы. Попробуйте ещё раз через несколько минут.
				</p>

				<div class="actions">
					<button
						class="btn"
						@click="sendData"
					>
						Повторить
					</button>

					<button
						class="btn btn-secondary"
						@click="submitStatus = 'idle'"
					>
						Закрыть
					</button>
				</div>
			</div>
		</template>
	</SuccessLayout>
	<div class="quiz">
		<div class="quiz-card">
			<div class="steps">
				<div
					class="step"
					v-for="n in questionsComponents.length"
					:key="n"
					:class="{ active: n === step }"
				>
					{{ n }}
				</div>
			</div>

			<component
				:is="questionsComponents[step - 1]"
				:step="step"
				:steps="steps"
				:modelValue="quizStore.answers[step] || {}"
				@getAnswer="handleAnswer"
			/>
		</div>
	</div>

	<div class="form-footer">
		<div style="display: flex; flex-direction: column; gap: 5px">
			<TermsPolicy
				:model-value="props.agreement"
				:show-errors="showErrors"
				@click="toggleAgreement"
			/>

			<Policy
				v-model="defaultAgreement1"
				:show-errors="showErrors"
				@addError="showErrors = true"
			>
				<template #policy1>
					<div :class="{ 'text-red': showErrors && !defaultAgreement1 }">
						Даю согласие на
						<a
							style="text-decoration: underline"
							href="#"
						>
							политику конфиденциальности
						</a>
						и публикацию контактных данных на карте монтажников на сайте far.ru.
					</div>
				</template>
			</Policy>
		</div>

		<button
			v-if="step < 5"
			class="form-btn"
			:disabled="!allowNext"
			:class="{ active: allowNext }"
			@click="nextStep"
		>
			{{ step < questionsComponents.length ? 'Далее' : 'Отправить заявку' }}
			<LeftArrowIcon />
		</button>

		<button
			v-else
			class="form-btn"
			:disabled="!allowNext"
			:class="{ active: step === questionsComponents.length }"
			@click="sendData"
		>
			Отправить заявку
			<LeftArrowIcon />
		</button>
	</div>
</template>

<style scoped>
.quiz {
	padding-left: 60px; /* место под "закладки" */
}

/* КАРТОЧКА */
.quiz-card {
	position: relative;
	display: flex;
	align-items: start;
	justify-content: start;
	border: 3px solid #008a3c;

	background: #fff;
	padding: 11px 17px 20px 20px;
	text-align: left;
	min-height: 216px;
}

/* КРУГИ (ЗАКЛАДКИ) */
.step {
	position: absolute;
	left: -53px;
	width: 47px;
	height: 30px;

	border-top-left-radius: 100px;
	border-bottom-left-radius: 100px;
	border-left: #d9d9d9 solid 3px;
	border-bottom: #d9d9d9 solid 3px;
	border-top: #d9d9d9 solid 3px;

	background: #d9d9d9;

	display: flex;
	align-items: center;
	justify-content: center;

	font-weight: 600;
	color: #9b9b9b;
	box-sizing: content-box;
	z-index: 2;
}

.answers {
	margin-bottom: 14px;
}

.steps {
	position: relative;
	left: -20px;
	/* width: 47px; */
	/* height: 30px; */
	top: -11px;
	display: flex;
	gap: 4px;
	flex-direction: column;

	color: #9b9b9b;
}

/* позиционируем каждый шаг */
.step:nth-child(1) {
	top: -3px;
}
.step:nth-child(2) {
	top: 36px;
}
.step:nth-child(3) {
	top: 76px;
}
.step:nth-child(4) {
	top: 116px;
}
.step:nth-child(5) {
	top: 156px;
}

/* активный */
.step.active {
	box-sizing: content-box;
	background: #fff;
	left: -60px;
	width: 57px;
	height: 30px;
	border-left: #008a3c solid 3px;
	border-bottom: #008a3c solid 3px;
	border-top: #008a3c solid 3px;

	color: #363535;
	z-index: 3;
	margin-left: 0;
}

.modal {
	width: 90%;
	max-width: 640px;
	background: #fff;
	border-radius: 24px;
	padding: 48px 32px;
	text-align: center;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
	display: block !important;
	position: relative;
}

.title {
	font-size: 20px;
	font-weight: 600;
	color: #2b2b2b;
	margin-bottom: 16px;
}

.text {
	font-size: 16px;
	line-height: 1.5;
	color: #4b4b4b;
	margin-bottom: 32px;
}

.btn {
	background: #008a3c;
	color: #fff;
	border: none;
	border-radius: 12px;
	padding: 12px 32px;
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	transition: 0.2s;
}

.btn:hover {
	background: #007533;
}

.actions {
	display: flex;
	gap: 16px;
	justify-content: center;
}
</style>
