<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { StepConfig } from '../../interface/Step'

const props = defineProps<{
	steps: StepConfig[]
	step: number
}>()

// 👉 объявляем события для общения с родителем
const emit = defineEmits(['setStep', 'getAnswer'])

// 👉 локальное состояние для radio (да/нет)
const answer = ref('')

type ResultAnswer = {
	answer: string
	comment?: string
}

// 👉 объект, который будем отправлять родителю
const resultAnswer = reactive<ResultAnswer>({
	answer: '', // yes / no
	comment: '', // комментарий
})

// 👉 следим за изменениями answer
watch(answer, () => {
	resultAnswer.answer = answer.value // при изменении answer обновляем resultAnswer
})

// 👉 следим за изменениями resultAnswer
watch(
	resultAnswer,
	() => {
		if (!resultAnswer.answer) return
		emit('getAnswer', { ...resultAnswer })
	},
	{ deep: true }
)
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
					v-model="answer"
				/>
				<span class="radio-custom"></span>
				<span class="label">Да</span>
			</label>

			<label class="radio">
				<input
					type="radio"
					value="no"
					v-model="answer"
					@change="resultAnswer.comment = ''"
				/>
				<span class="radio-custom"></span>
				<span class="label">Нет</span>
			</label>

			<div
				v-show="resultAnswer.answer == 'yes'"
				class="comment-wrapper"
			>
				<span>Опишите примеры *</span>
				<textarea
					name="comment"
					id="comment"
					v-model="resultAnswer.comment"
				></textarea>
			</div>
		</div>
	</div>
</template>

<style scoped>
.content {
	width: 100%;
}
#comment {
	width: 100%;
	height: 42px;
	display: block;
	outline: none;
}

.content .comment-wrapper {
	padding-left: 18px;
}

.comment-wrapper span {
	margin-bottom: 2px;
	font-size: 12px;
	font-family: 'Roboto', sans-serif;
	font-weight: 600;
}

@media (max-width: 992px) {
	.content .comment-wrapper {
		padding-left: 0;
	}
}
</style>
