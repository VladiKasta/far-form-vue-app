<script setup lang="ts">
import DownloadIcon from './UI/DownloadIcon.vue'
defineProps<{
	modelValue: boolean
	showErrors: boolean
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

		<label :class="{ 'text-red': showErrors && !modelValue }">
			<div style="display: flex; align-items: center; gap: 5px; font-size: 14px">
				Даю согласие на
				<a
					style="text-decoration: underline"
					:class="{ 'text-red': showErrors && !modelValue }"
					download
					target="_blank"
					href="https://far.qscape.ru/local/js/vue-app/dist/files/Условия_аккредитаци_монтажников_FAR.pdf"
				>
					условия аккредитации монтажников FAR
					<DownloadIcon style="display: inline" />
				</a>
				<!-- <a
					download
					href="https://far.qscape.ru/local/js/vue-app/dist/files/Условия_аккредитаци_монтажников_FAR.pdf"
				></a> -->
			</div>
		</label>
	</div>
</template>
