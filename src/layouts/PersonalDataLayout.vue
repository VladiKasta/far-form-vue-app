<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import CitySelect from '../components/CitySelect.vue'
import EmailInput from '../components/EmailInput.vue'
import FioInput from '../components/FioInput.vue'
import NumberInput from '../components/NumberInput.vue'
import Policy from '../components/Policy.vue'
import CloseIcon from '../components/UI/CloseIcon.vue'
import DownloadIcon from '../components/UI/DownloadIcon.vue'
import LeftArrowIcon from '../components/UI/LeftArrowIcon.vue'
import { cities } from '../composables/cities.js'
import { FormData } from '../interface/FormData'

const showErrors = ref(false)

onMounted(() => {
	console.log('bitrix extension + vue mounted')
})

const slots = defineSlots<{
	policy1?: () => any
	policy2?: () => any
}>()

const props = withDefaults(
	defineProps<{
		form?: FormData
		step: number
	}>(),
	{
		form: (): FormData => ({
			fio: '',
			city: '',
			portfolioLink: '',
			phone: '',
			email: '',
			site: '',
			policy1: false,
			policy2: false,
		}),
		step: 1,
	}
)

const emit = defineEmits(['update:form', 'update:step'])

const formData = computed({
	get: () => props.form,
	set: value => emit('update:form', value),
})

const validate = (e: MouseEvent) => {
	e.preventDefault()
	showErrors.value = true

	if (isValid.value) {
		emit('update:step', 2)
	}
	console.log(validFieldsCount.value)
}

const isValid = computed(() => {
	console.log(formData)
	return (
		formData.value.fio.trim().length > 0 &&
		formData.value.city.trim().length > 0 &&
		formData.value.phone.replace(/\D/g, '').length >= 11 &&
		/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email) &&
		formData.value.policy1 &&
		formData.value.policy2
	)
})

const validFieldsCount = computed(() => {
	let count = 0
	if (formData.value.fio.trim().length > 0) count++
	if (formData.value.city.trim().length > 0) count++
	const digits = formData.value.phone.replace(/\D/g, '')
	if (digits.length === 11) count++
	if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) count++
	if (formData.value.policy1 && formData.value.policy2) count++

	return count
})

type ValidatorFields = Omit<FormData, 'portfolioLink' | 'site'>
const getDigits = (phone: string) => phone.replace(/\D/g, '')
const validators: {
	[K in keyof ValidatorFields]: (value: ValidatorFields[K]) => boolean
} = {
	fio: v => v.trim().length > 0,
	city: v => v.trim().length > 0,
	phone: v => getDigits(v).length === 11,
	email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
	policy1: v => v === true,
	policy2: v => v === true,
}

const isFieldInvalid = <K extends keyof ValidatorFields>(field: K) => {
	const validator = validators[field]
	const value = formData.value[field]

	return showErrors.value && !validator(value)
}
</script>

<template>
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
					<!-- первый -->

					<Policy
						v-model="formData.policy2"
						:show-errors="showErrors"
					>
						<!-- второй -->
						<template #policy2>
							<div style="display: flex; align-items: center; gap: 5px; font-size: 14px">
								Даю согласие на
								<a
									style="text-decoration: underline"
									:class="{ 'text-red': showErrors && !formData.policy2 }"
									download
									href="../files/Условия_аккредитаци_монтажников_FAR.pdf"
								>
									условия аккредитации монтажников FAR
								</a>
								<a
									download
									href="../files/Условия_аккредитаци_монтажников_FAR.pdf"
								>
									<DownloadIcon />
								</a>
							</div>
						</template>
					</Policy>

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
</style>
