<script setup lang="ts">
import { reactive, watch } from 'vue'
import { StepConfig } from '../../interface/Step'

/* const props = defineProps({
	steps: Array,
	step: Number,
}) */

const props = defineProps<{
	steps: StepConfig[]
	step: number
}>()
const emit = defineEmits(['setStep', 'getAnswer'])
const resultAnswer = reactive({
	message: '',
})

watch(resultAnswer, () => {
	emit('getAnswer', resultAnswer)
})
</script>

<template>
	<div class="content">
		<span class="q-count">Вопрос {{ step }} из 5</span>
		<p class="question-text">{{ steps[step - 1].label }}</p>

		<div class="brands-wrapper">
			<span>Сообщение</span>
			<textarea
				name="brands"
				id="brands"
				v-model="resultAnswer.message"
			></textarea>
		</div>
	</div>
</template>

<style scoped>
.content {
	width: 100%;
}
#brands {
	width: 100%;
	height: 115px;
	display: block;
	outline: none;
}

.brands-wrapper {
	padding-left: 18px;
}

.brands-wrapper span {
	margin-bottom: 2px;
	font-weight: 600;
	font-family: 'Roboto', sans-serif;
	font-size: 12px;
	line-height: 100%;
}
</style>
