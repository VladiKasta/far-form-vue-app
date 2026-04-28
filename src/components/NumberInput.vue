<script setup>
import { vMaska } from 'maska/vue'
import { computed } from 'vue'

const props = defineProps({
	modelValue: String,
	showErrors: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get: () => props.modelValue,
	set: v => emit('update:modelValue', v),
})

/* const onInput = e => {
	const digits = e.target.value.replace(/\D/g, '').slice(0, 10)

	emit('update:modelValue', digits)
} */

const isComplete = computed(() => {
	const digits = props.modelValue.replace(/\D/g, '')
	if (digits.length === 0) return true

	return digits.length >= 11
})
</script>

<template>
	<div>
		<input
			v-maska="'+7 (###) ###-##-##'"
			v-model="value"
			type="tel"
			placeholder="+7 (___) ___-__-__"
			:class="{ uncorrect: !isComplete }"
		/>
	</div>
</template>
