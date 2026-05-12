<script setup lang="ts">
import { useQuizStore } from '../stores/aswers'

const emit = defineEmits(['close'])

const close = () => {
	console.log('His')
	document.body.style.overflow = 'auto'
	const overlay = document.querySelector('.overlay') as HTMLElement
	const form = document.querySelector('.form-container') as HTMLElement
	const success = document.querySelector('.modal') as HTMLElement

	success.style.display = 'none'
	form.style.display = 'none'
	overlay.style.display = 'none'

	useQuizStore().reset()
	useQuizStore().setStep(1)
}
</script>

<template>
	<div
		class="overlay"
		@click.self="close"
	>
		<slot name="success"></slot>

		<slot name="fail"></slot>
	</div>
</template>

<style scoped>
.overlay {
	position: fixed;
	inset: 0;
	background: rgba(0, 0, 0, 0.45);
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;
}

.modal {
	width: 90%;
	max-width: 640px;
	background: #fff;
	border-radius: 24px;
	padding: 48px 32px;
	text-align: center;
	box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
	display: block !important;
	position: relative;
}

.title {
	font-size: 20px;
	font-weight: 600;
	color: #2b2b2b;
	margin-bottom: 16px;
}

.text {
	font-size: 16px;
	line-height: 1.5;
	color: #4b4b4b;
	margin-bottom: 32px;
}

.btn {
	background: #008a3c;
	color: #fff;
	border: none;
	border-radius: 12px;
	padding: 12px 32px;
	font-weight: 600;
	font-size: 14px;
	cursor: pointer;
	transition: 0.2s;
}

.btn:hover {
	background: #007533;
}
</style>
