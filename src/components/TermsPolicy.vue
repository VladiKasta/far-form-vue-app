<script setup lang="ts">
defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits(['click'])
</script>

<template>
	<div
		class="checkbox"
		@click="emit('click')"
	>
		<div class="custom-checkbox">
			<input
				type="checkbox"
				:checked="modelValue"
				readonly
			/>

			<span class="checkmark"></span>
		</div>

		<div>Даю согласие на условия аккредитации монтажников FAR</div>
	</div>
</template>
