<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { FormData } from '../interface/FormData'
import PersonalDataLayout from './PersonalDataLayout.vue'
import QuestionsLayout from './QuestionsLayout.vue'

onMounted(() => {
	console.log('bitrix extension + vue mounted')
})

const formData = reactive<FormData>({
	fio: '',
	city: '',
	portfolioLink: '',
	phone: '',
	email: '',
	site: '',
	policy1: false,
	policy2: false,
})

const layoutStep = ref<number>(1)
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
