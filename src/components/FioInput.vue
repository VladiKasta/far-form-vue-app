<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: String,
	showErrors: Boolean,
})

const emit = defineEmits(['update:modelValue'])

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
