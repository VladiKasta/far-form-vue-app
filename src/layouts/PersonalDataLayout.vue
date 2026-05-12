<script setup lang="ts">
import { computed, ref } from 'vue'
import CitySelect from '../components/CitySelect.vue'
import EmailInput from '../components/EmailInput.vue'
import FioInput from '../components/FioInput.vue'
import NumberInput from '../components/NumberInput.vue'
import Policy from '../components/Policy.vue'
import TermsPolicy from '../components/TermsPolicy.vue'
import CloseIcon from '../components/UI/CloseIcon.vue'
import LeftArrowIcon from '../components/UI/LeftArrowIcon.vue'
import { cities } from '../composables/cities.js'
import { useQuizStore } from '../stores/aswers'
import TermsOfAccreditation from './TermsOfAccreditation.vue'

const quizStore = useQuizStore()
const setStep = useQuizStore().setStep

const showErrors = ref(false)
const showTerms = ref(false)
const emit = defineEmits(['update:step'])

const formData = quizStore.formData

const getDigits = (phone: string) => phone.replace(/\D/g, '')

// VALIDATION
const isValid = computed(() => {
	return (
		formData.fio.trim().length > 0 &&
		formData.city.trim().length > 0 &&
		getDigits(formData.phone).length >= 11 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
		formData.policy1 &&
		formData.policy2
	)
})

const validFieldsCount = computed(() => {
	let count = 0
	if (formData.fio.trim()) count++
	if (formData.city.trim()) count++
	if (getDigits(formData.phone).length === 11) count++
	if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) count++
	if (formData.policy1 && formData.policy2) count++
	return count
})

// FIELD VALIDATION
const isFieldInvalid = (field: keyof typeof formData) => {
	return showErrors.value && !formData[field]
}

// TERMS
const toggleTerms = () => {
	showTerms.value = !showTerms.value
}

const handleTermsAccept = () => {
	formData.policy2 = true
	showTerms.value = false
}

const handleTermsClose = () => {
	formData.policy2 = false
	showTerms.value = false
}

// SUBMIT STEP
const validate = (e: MouseEvent) => {
	e.preventDefault()
	showErrors.value = true

	if (isValid.value) {
		/* emit('update:step', 2) */
		setStep(2)
	}
}
</script>

<template>
	<transition name="fade">
		<TermsOfAccreditation
			v-show="showTerms"
			@accept="handleTermsAccept"
			@close="handleTermsClose"
		/>
	</transition>

	<div class="form-container">
		<CloseIcon></CloseIcon>
		<div class="form-heading">
			<h2>Стать монтажником FAR</h2>

			<div class="total-steps">Шаг 1 из 2</div>
		</div>

		<div class="progress-bar">
			<span
				class="step"
				:class="isValid ? 'filled' : 'active'"
			>
				Контактные данные
			</span>

			<div
				class="progress-line"
				:class="`fill-${(validFieldsCount / 5) * 100}`"
			>
				<div class="line-item"></div>
			</div>
			<span class="step">Подтверждение опыта</span>
		</div>

		<form>
			<div class="form-step">
				<div class="form-input__section">
					<div class="form-group">
						<label
							:class="{ 'text-red': isFieldInvalid('fio') }"
							for="fio"
						>
							ФИО *
						</label>

						<FioInput
							:show-errors="showErrors"
							v-model="formData.fio"
						></FioInput>
					</div>

					<div class="form-group">
						<label
							:class="{ 'text-red': isFieldInvalid('city') }"
							for="city"
						>
							Город *
						</label>

						<CitySelect
							v-model="formData.city"
							:options="cities"
							:show-errors="showErrors"
						></CitySelect>
					</div>

					<div class="form-group">
						<label for="social">Адрес страницы в соц.сетях с примерами работ</label>
						<input
							v-model="formData.portfolioLink"
							type="text"
							id="social"
							name="social"
						/>
					</div>
				</div>

				<div class="form-input__section">
					<div class="form-group">
						<label
							:class="{ 'text-red': isFieldInvalid('phone') }"
							for="phone"
						>
							Контактный телефон *
						</label>
						<NumberInput
							:show-errors="showErrors"
							v-model="formData.phone"
						/>
					</div>

					<div class="form-group">
						<label
							:class="{ 'text-red': isFieldInvalid('email') }"
							for="email"
						>
							Электронная почта *
						</label>

						<EmailInput
							:show-errors="showErrors"
							v-model="formData.email"
						></EmailInput>
					</div>

					<div class="form-group">
						<label for="site">Сайт</label>
						<input
							v-model="formData.site"
							type="url"
							id="site"
							name="site"
						/>
					</div>
				</div>
			</div>
			<div class="form-footer">
				<div style="display: flex; flex-direction: column; gap: 5px">
					<TermsPolicy
						:model-value="formData.policy2"
						:show-errors="showErrors"
						@click="toggleTerms"
					/>

					<!-- второй -->
					<Policy
						v-model="formData.policy1"
						:show-errors="showErrors"
					>
						<!-- первый -->
						<template #policy1>
							Даю согласие на
							<a
								style="text-decoration: underline"
								:class="{ 'text-red': showErrors && !formData.policy1 }"
								href="#"
							>
								политику конфиденциальности
							</a>
							и публикацию контактных данных на карте монтажников на сайте far.ru.
						</template>
					</Policy>
				</div>

				<button
					class="form-btn"
					@click="e => validate(e)"
					:class="{ active: isValid }"
				>
					Подтверждение опыта

					<LeftArrowIcon></LeftArrowIcon>
				</button>
			</div>
		</form>
	</div>
</template>

<style scoped>
.form-group label {
	font-family: 'Roboto', sans-serif;
	font-weight: 600;
	font-style: SemiBold;
	font-size: 12px;
	line-height: 100%;
}

.form-group input {
	font-family: 'Roboto', sans-serif;
	font-weight: 400;
	font-style: Regular;
	font-size: 18px;

	line-height: 140%;
}

@media (max-width: 992px) {
	.form-group label {
		font-size: 10px;
		margin-bottom: 10px;
	}
}
</style>
