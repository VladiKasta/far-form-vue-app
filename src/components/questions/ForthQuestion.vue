<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { StepConfig } from '../../interface/Step'

// 👉 принимаем данные от родителя
const props = defineProps<{
	steps: StepConfig[]
	step: number
}>()

// 👉 события для связи с родителем
const emit = defineEmits(['setStep', 'getAnswer'])

// 👉 локальное состояние ответа (для radio)
const answer = ref('')

// 👉 общий объект ответа, который отправляем наверх
type FileItem = {
	file: File
}

type ResultAnswer = {
	answer: string
	files: File[]
}

const resultAnswer = reactive<ResultAnswer>({
	answer: '',
	files: [],
})

// 👉 открываем скрытый input[type="file"]
const chooseFiles = () => {
	const input = document.querySelector('.input-files') as HTMLInputElement
	if (input) {
		input.click()
	}
}

// 👉 следим за любыми изменениями resultAnswer
watch(
	resultAnswer,
	() => {
		// отправляем актуальные данные родителю
		emit('getAnswer', resultAnswer)
	},
	{ deep: true } // важно: отслеживает изменения внутри массива files и поля answer
)

// 👉 обработка выбора файлов
const getFiles = (e: Event) => {
	const input = e.target as HTMLInputElement

	if (!input || !input.files) return

	const files = input.files

	for (let i = 0; i < files.length; i++) {
		const file = files[i]

		const objectURL = URL.createObjectURL(file)

		resultAnswer.files.push(file)
	}

	input.value = ''
}
const isAllowUpload = computed(() => {
	return resultAnswer.answer === 'yes'
})

const getFileUrl = (file: File) => {
	return URL.createObjectURL(file)
}
</script>

<template>
	<div class="content">
		<span class="q-count">Вопрос {{ step }} из 5</span>
		<p class="question-text">{{ steps[step - 1].label }}</p>

		<div class="answers">
			<label class="radio">
				<input
					type="radio"
					value="yes"
					v-model="resultAnswer.answer"
				/>
				<span class="radio-custom"></span>
				<span class="label">Да</span>
			</label>

			<label class="radio">
				<input
					type="radio"
					value="no"
					v-model="resultAnswer.answer"
					@change="resultAnswer.files = []"
				/>
				<span class="radio-custom"></span>
				<span class="label">Нет</span>
			</label>
		</div>

		<div v-show="isAllowUpload">
			<span class="file-hint">Прикрепите от 1-го до 10-ти фото реализованных проектов</span>
			<button
				v-if="resultAnswer.files.length === 0"
				@click="chooseFiles"
				class="form-btn active"
			>
				Загрузить фото
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M7 10L12 15L17 10"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M12 15V3"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>

			<div
				v-else
				class="uploaded-files"
			>
				<div
					class="uploaded-file"
					v-for="(file, index) in resultAnswer.files"
					:key="index"
				>
					<div class="uplaoded-item">
						<img
							alt=""
							:src="getFileUrl(file)"
						/>

						<svg
							@click="resultAnswer.files.splice(index, 1)"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="0.5"
								y="0.5"
								width="17"
								height="17"
								rx="8.5"
								fill="white"
							/>
							<rect
								x="0.5"
								y="0.5"
								width="17"
								height="17"
								rx="8.5"
								stroke="#D9D9D9"
							/>
							<path
								d="M12 6L6 12"
								stroke="#363535"
								stroke-width="0.75"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M6 6L12 12"
								stroke="#363535"
								stroke-width="0.75"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</div>
			</div>

			<input
				multiple
				class="input-files"
				accept="image/*"
				type="file"
				style="display: none"
				@change="getFiles"
			/>
		</div>
	</div>
</template>

<style scoped>
.uploaded-files {
	margin-top: 5px;
	display: flex;
	gap: 5px;
	justify-content: flex-start;
	align-items: flex-start;
}

.file-hint {
	font-size: 12px;
	font-weight: 600;
	display: inline-block;
	margin-bottom: 5px;
}
.error-msg {
	display: inline-block;
	margin-bottom: 5px;
	color: red;
	font-size: 12px;
}

.uplaoded-item {
	height: 40px;
	width: 52px;
	position: relative;
}
.uplaoded-item img {
	width: 100%;
	height: 100%;
	object-fit: cover;
}

.uplaoded-item svg {
	position: absolute;
	top: 0;
	right: 0;
	cursor: pointer;
}
</style>
