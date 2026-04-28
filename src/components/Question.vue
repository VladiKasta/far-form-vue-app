<script setup>
import { computed, reactive, ref } from 'vue'
import { steps } from '../composables/questionsData.js'
import Policy from './Policy.vue'
import FifthQuestion from './questions/FifthQuestion.vue'
import FirstQuestion from './questions/FirstQuestion.vue'
import ForthQuestion from './questions/ForthQuestion.vue'
import SecondQuestion from './questions/SecondQuestion.vue'
import ThirdQuestion from './questions/ThirdQuestion.vue'
import LeftArrowIcon from './UI/LeftArrowIcon.vue'

const step = ref(1)
const answers = reactive({})
const defaultAgreement = ref(true)
const showErrors = ref(false)

const questionsComponents = [
	FirstQuestion,
	SecondQuestion,
	ThirdQuestion,
	ForthQuestion,
	FifthQuestion,
]

// 👉 текущие данные шага
const currentData = computed(() => {
	return answers[step.value] || {}
})

// 👉 получить обязательные поля
const getRequiredFields = (stepConfig, data) => {
	if (!stepConfig.required) return []

	return typeof stepConfig.required === 'function' ? stepConfig.required(data) : stepConfig.required
}

// 👉 валидация
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

// 👉 кнопка
const allowNext = computed(() => {
	return isStepValid.value && defaultAgreement.value
})

// 👉 просто сохраняем данные
const handleAnswer = data => {
	answers[step.value] = data
}

// 👉 переход дальше
const nextStep = e => {
	e.preventDefault()

	if (!isStepValid.value || !defaultAgreement.value) {
		showErrors.value = true
		return
	}

	showErrors.value = false

	if (step.value === 5) {
		console.log(answers)
		return
	}

	step.value++
}

// 👉 назад (опционально)
const prevStep = () => {
	if (step.value > 1) step.value--
}
</script>

<template>
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
				:modelValue="answers[step] || {}"
				@getAnswer="handleAnswer"
			/>
		</div>
	</div>

	<div class="form-footer">
		<Policy
			v-model="defaultAgreement"
			:show-errors="showErrors"
			@addError="showErrors = $event"
		/>

		<button
			class="form-btn"
			:disabled="!allowNext"
			:class="{ active: allowNext }"
			@click="nextStep"
		>
			{{ step < 5 ? 'Далее' : 'Отправить заявку' }}
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
</style>
