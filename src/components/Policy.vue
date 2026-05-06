<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	modelValue: boolean
	showErrors?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const value = computed({
	get: () => props.modelValue,
	set: v => emit('update:modelValue', v),
})
</script>

<template>
	<div class="checkbox">
		<label class="custom-checkbox">
			<input
				type="checkbox"
				v-model="value"
			/>
			<span class="checkmark"></span>
		</label>

		<label>
			<slot name="policy1"></slot>
			<slot name="policy2"></slot>
		</label>
	</div>
</template>
