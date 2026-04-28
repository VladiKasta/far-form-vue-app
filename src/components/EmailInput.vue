<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	showErrors: {
		type: Boolean,
		default: false,
	},
})

const emit = defineEmits(['update:modelValue'])

const email = computed({
	get: () => props.modelValue,
	set: val => emit('update:modelValue', val),
})

const hasAt = computed(() => email.value.includes('@'))

const isInvalid = computed(() => {
	return props.showErrors && !hasAt.value
})
</script>

<template>
	<div>
		<input
			v-model="email"
			type="email"
			placeholder="example@mail.com"
			:class="{ uncorrect: isInvalid }"
		/>
	</div>
</template>
