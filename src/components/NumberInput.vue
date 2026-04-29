<script setup lang="ts">
import { vMaska } from 'maska/vue'
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		modelValue: string
		showErrors: boolean
	}>(),
	{
		modelValue: '',
		showErrors: false,
	}
)

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const value = computed({
	get: () => props.modelValue,
	set: v => emit('update:modelValue', v),
})

const isComplete = computed(() => {
	const digits = props.modelValue.replace(/\D/g, '')
	//if (digits.length === 0) return true

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
			:class="{ uncorrect: showErrors && !isComplete }"
		/>
	</div>
</template>
