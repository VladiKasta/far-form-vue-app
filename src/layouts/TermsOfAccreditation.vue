<script setup lang="ts">
import { ref } from 'vue'

const isBottomReached = ref(false)
const emit = defineEmits(['accept', 'close'])

const handleAccept = () => {
	emit('accept')
}

const handleClose = () => {
	emit('close')
}

const handleScroll = (e: Event) => {
	const el = e.target as HTMLElement

	if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
		isBottomReached.value = true
	}
}
</script>

<template>
	<div class="form-container">
		<span
			class="close-icon"
			@click="handleClose"
		>
			<svg
				class="close-icon"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M18 6L6 18"
					stroke="#363535"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<path
					d="M6 6L18 18"
					stroke="#363535"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</span>

		<div class="form-heading">
			<h2>Условия аккредитации монтажника FAR</h2>
		</div>

		<section
			class="terms-wrapper"
			@scroll="handleScroll"
		>
			<p>
				Условия аккредитации монтажников и правила предоставления увеличенного срока гарантии + 3
				года на продукцию FAR Преференции для аккредитованных монтажников FAR: 1. Единоразовое
				предоставление специальной одежды. Дальнейшее обновление — за счёт участия в мероприятиях
				FAR. 2. Размещение контактного блока на монобрендовом сайте FAR 3. Увеличенная гарантия (+3
				года) на смонтированную трубопроводную арматуру FAR. 4. Свидетельство профессионального
				монтажника FAR с уникальным номером. Обязательства после прохождения аккредитации: 1.
				Ежемесячная публикация в личных аккаунтах в социальных сетях поста с упоминанием продукции
				FAR. 2. Быть подписанным на официальные страницы FAR в социальных сетях 3. Участвовать в
				мероприятиях (выставках, семинарах, вебинарах) FAR 4. Ежегодно подтверждать квалификацию
				путём прохождения аттестации. 1. Описание процесса получения аккредитации Обучение
				проводится в группах (очно или онлайн) в формате презентации продукции, с дополнительными
				групповыми самостоятельными работами всех участников. Продолжительность ~ 8 часов. 2.
				Аттестация Прохождение письменного теста с вопросами открытого типа проводится в день
				обучения (очно или онлайн) Параметры теста: 20 вопросов за 60 минут. Оценка теста и
				предоставленных примеров монтажных работ проводится комиссией. Каждый из членов комиссии
				выставляет оценку «удовлетворительно» или «неудовлетворительно». Проходной балл для успешно
				прошедших аттестацию: не менее 80% (16) правильных ответов. 3. Аккредитация На имя
				Монтажника, успешно прошедшего аттестацию, согласно проходному баллу, выпускается
				электронный сертификат, который отправляется на электронную почту, указанную при подаче
				заявки вместе с Образцом Акта выполненных работ.
			</p>
		</section>

		<button
			@click="handleAccept"
			class="form-btn"
			:disabled="!isBottomReached"
			:class="{ active: isBottomReached }"
		>
			Согласен
		</button>
	</div>
</template>

<style scoped>
.form-container {
	position: absolute;
	height: 100%;
	max-height: 468px;
	width: 100%;
	z-index: 10;
	background: #fff;
	border-radius: 8px;
	padding: 35px 60px;
	width: 100%;
	max-width: 1020px;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
	text-align: center;
}

.terms-wrapper {
	text-align: left;
	width: 80%;
	margin-top: 20px;
	max-height: 300px;
	overflow-y: scroll;
}

.form-btn {
	margin-left: auto;
}
</style>
