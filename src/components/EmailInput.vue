<script setup lang="ts">
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
