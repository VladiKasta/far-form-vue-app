<script setup lang="ts">
import { ref } from 'vue'
import Question from '../components/Question.vue'
import CloseIcon from '../components/UI/CloseIcon.vue'
import TermsOfAccreditation from './TermsOfAccreditation.vue'
const emit = defineEmits(['update:step'])

const showTerms = ref(false)
</script>

<template>
	<transition name="fade">
		<TermsOfAccreditation
			v-show="showTerms"
			:v-model="showTerms"
			@close="showTerms = false"
		></TermsOfAccreditation>
	</transition>
	<div class="form-container">
		<CloseIcon></CloseIcon>
		<div class="form-heading">
			<h2>Стать монтажником FAR</h2>

			<div class="total-steps">Шаг 2 из 2</div>
		</div>

		<div class="progress-bar">
			<span
				class="step filled"
				@click="emit('update:step', 1)"
			>
				Контактные данные
			</span>

			<div
				class="progress-line"
				:class="`fill-100`"
			>
				<div class="line-item"></div>
			</div>
			<span class="step active">Подтверждение опыта</span>
		</div>

		<Question
			:show-terms="showTerms"
			@showTermsEvent="showTerms = true"
		></Question>
	</div>
</template>
