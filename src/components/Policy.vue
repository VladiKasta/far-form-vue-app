<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: Boolean,
	showErrors: Boolean,
})

console.log('from Policy', props.modelValue)

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get: () => props.modelValue,
	set: v => emit('update:modelValue', v),
})
</script>

<template>
	<div
		class="checkbox"
		:class="{ 'text-red': showErrors && !value }"
	>
		<label class="custom-checkbox">
			<input
				v-model="value"
				type="checkbox"
				@change="emit('addError', !showErrors)"
			/>
			<span class="checkmark"></span>
		</label>
		<label for="agreement">
			Даю согласие на
			<a
				style="text-decoration: underline"
				:class="{ 'text-red': showErrors && !value }"
				href="#"
			>
				политику конфиденциальности
			</a>
			и публикацию контактных данных на карте монтажников на сайте far.ru. Ознакомьтесь с
			<a
				style="text-decoration: underline"
				:class="{ 'text-red': showErrors && !value }"
				href="#"
			>
				условиями аккредитации монтажников
			</a>
			FAR
			<br />
			<span>* - поля являются обязательными для заполнения.</span>
		</label>
	</div>
</template>

<style></style>
