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
	<div class="form-container-terms">
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
			<div class="terms-content">
				<h1>
					Условия аккредитации монтажников и
					<br />
					правила предоставления увеличенного срока гарантии
				</h1>

				<h2>+ 3 года на продукцию FAR</h2>

				<section class="terms-section">
					<h3>Преференции для аккредитованных монтажников FAR:</h3>

					<ol>
						<li>
							Единоразовое предоставление специальной одежды. Дальнейшее обновление — за счёт
							участия в мероприятиях FAR.
						</li>

						<li>Размещение контактного блока на монобрендовом сайте FAR</li>

						<li>Увеличенная гарантия (+3 года) на смонтированную трубопроводную арматуру FAR.</li>

						<li>Свидетельство профессионального монтажника FAR с уникальным номером.</li>
					</ol>
				</section>

				<section class="terms-section">
					<h3>Обязательства после прохождения аккредитации:</h3>

					<ol>
						<li>
							Ежемесячная публикация в личных аккаунтах в социальных сетях поста с упоминанием
							продукции FAR.
						</li>

						<li class="social-line">
							<span>Быть подписанным на официальные страницы FAR в социальных сетях</span>

							<div class="socials">
								<a href="https://t.me/FAR_ru_FAR">
									<img
										src="https://far.qscape.ru/local/js/vue-app/dist/icons/tg.png"
										alt="Telegram"
									/>
								</a>

								<a href="https://max.ru/join/oDWy6uVI7gQStHf7tBz91wF4pBhHTzTjEQ47Tsd-EOM">
									<img
										src="https://far.qscape.ru/local/js/vue-app/dist/icons/max.png"
										alt="MAX"
									/>
								</a>

								<a href="https://vk.com/far_russia">
									<img
										src="https://far.qscape.ru/local/js/vue-app/dist/icons/vk.png"
										alt="VK"
									/>
								</a>
							</div>
						</li>

						<li>Участвовать в мероприятиях (выставках, семинарах, вебинарах) FAR</li>

						<li>Ежегодно подтверждать квалификацию путём прохождения аттестации.</li>
					</ol>
				</section>

				<section class="terms-section">
					<h3>1. Описание процесса получения аккредитации</h3>

					<p>
						Обучение проводится в группах (очно или онлайн) в формате презентации продукции, с
						дополнительными групповыми самостоятельными работами всех участников. Продолжительность
						~ 8 часов.
					</p>
				</section>

				<section class="terms-section">
					<h3>2. Аттестация</h3>

					<p>
						Прохождение письменного теста с вопросами открытого типа проводится в день обучения
						(очно или онлайн)
					</p>

					<p>Параметры теста: 20 вопросов за 60 минут.</p>

					<p>
						Оценка теста и предоставленных примеров монтажных работ проводится комиссией. Каждый из
						членов комиссии выставляет оценку «удовлетворительно» или «неудовлетворительно».
						Проходной балл для успешно прошедших аттестацию: не менее 80% (16) правильных ответов.
					</p>
				</section>

				<section class="terms-section">
					<h3>3. Аккредитация</h3>

					<p>
						На имя Монтажника, успешно прошедшего аттестацию, согласно проходному баллу, выпускается
						электронный сертификат, который отправляется на электронную почту, указанную при подаче
						заявки вместе с Образцом Акта выполненных работ.
					</p>
				</section>
			</div>
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
.form-container-terms {
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

.terms-content {
	font-family: 'Roboto', sans-serif;
	color: #000;
	line-height: 1.6;
}

.terms-content h1 {
	font-size: 18px;
	font-weight: 700;
	text-align: center;
	color: #355796;
	line-height: 1.5;
	margin-bottom: 10px;
}

.terms-content h2 {
	font-size: 28px;
	font-weight: 700;
	text-align: center;
	color: #355796;
	margin-bottom: 40px;
}

.terms-section {
	margin-bottom: 40px;
}

.terms-section h3 {
	font-size: 16px;
	font-weight: 700;
	margin-bottom: 20px;
}

.terms-section ol {
	padding-left: 22px;
	display: flex;
	flex-direction: column;
	gap: 18px;
}

.terms-section li {
	font-size: 15px;
	font-weight: 400;
	line-height: 1.7;
	padding-left: 8px;
}

.terms-section p {
	font-size: 15px;
	line-height: 1.7;
	margin-bottom: 16px;
}

.social-line {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 20px;
}

.socials {
	display: flex;
	align-items: center;
	gap: 14px;
	flex-shrink: 0;
}

.socials img {
	width: 28px;
	height: 28px;
	object-fit: contain;
}
</style>
