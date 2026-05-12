<script setup lang="ts">
import { onMounted } from 'vue'
import { useQuizStore } from '../stores/aswers'
import PersonalDataLayout from './PersonalDataLayout.vue'
import QuestionsLayout from './QuestionsLayout.vue'

onMounted(() => {
	console.log('bitrix extension + vue mounted')
})

/* const formData = reactive<QuizFormData>({
	fio: '',
	city: '',
	portfolioLink: '',
	phone: '',
	email: '',
	site: '',
	policy1: false,
	policy2: false,
}) */

const formData = useQuizStore().formData
const layoutStep = useQuizStore()
</script>

<template>
	<Transition name="slide">
		<PersonalDataLayout
			v-if="layoutStep.step === 1"
			v-model:step="layoutStep"
			v-model:form="formData"
		></PersonalDataLayout>

		<QuestionsLayout
			v-else
			v-model:step="layoutStep"
		></QuestionsLayout>
	</Transition>
</template>
