<script setup>
import { onMounted, reactive, ref } from 'vue'
import PersonalDataLayout from './PersonalDataLayout.vue'
import QuestionsLayout from './QuestionsLayout.vue'

onMounted(() => {
	console.log('bitrix extension + vue mounted')
})

const formData = reactive({
	fio: '',
	city: '',
	portfolioLink: '',
	phone: '',
	email: '',
	site: '',
	policy: false,
})

const layoutStep = ref(1)
</script>

<template>
	<Transition name="slide">
		<PersonalDataLayout
			v-if="layoutStep === 1"
			v-model:step="layoutStep"
			v-model:form="formData"
		></PersonalDataLayout>

		<QuestionsLayout
			v-else
			v-model:step="layoutStep"
		></QuestionsLayout>
	</Transition>
</template>
