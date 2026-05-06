<script setup>
const emits = defineEmits(['close'])

const closeModal = () => {
	document.body.style.overflow = 'auto'
	document.querySelector('.overlay').style.display = 'none'
}
</script>

<template>
	<svg
		@click="closeModal"
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
</template>

<style scoped></style>
