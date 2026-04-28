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

const layaoutStep = ref(1)
</script>

<template>
	<Transition name="slide">
		<PersonalDataLayout
			v-if="layaoutStep === 1"
			v-model:step="layaoutStep"
			v-model:form="formData"
		></PersonalDataLayout>

		<QuestionsLayout v-else></QuestionsLayout>
	</Transition>
</template>
