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

const FIO = computed({
	get: () => props.modelValue,
	set: val => emit('update:modelValue', val),
})

const isInvalid = computed(() => {
	return props.showErrors && FIO.value.trim().length === 0
})
</script>

<template>
	<div>
		<input
			v-model="FIO"
			type="text"
			placeholder="Иванов Иван Иванович"
			:class="{ uncorrect: isInvalid }"
		/>
	</div>
</template>
