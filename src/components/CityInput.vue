<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
	defineProps<{
		modelValue: string
		showErrors?: boolean
		placeholder?: string
	}>(),
	{
		modelValue: '',
		showErrors: false,
		placeholder: 'Введите город',
	}
)

const emit = defineEmits<{
	(e: 'update:modelValue', value: string): void
}>()

const city = computed({
	get: () => props.modelValue,
	set: val => emit('update:modelValue', val),
})

const isInvalid = computed(() => {
	return props.showErrors && city.value.trim().length === 0
})
</script>

<template>
	<div>
		<input
			v-model="city"
			type="text"
			:placeholder="placeholder"
			:class="{ uncorrect: isInvalid }"
		/>
	</div>
</template>

<style scoped></style>
