<script setup lang="ts">
import DownloadIcon from './UI/DownloadIcon.vue'
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

		<label>
			<div style="display: flex; align-items: center; gap: 5px; font-size: 14px">
				Даю согласие на
				<a
					style="text-decoration: underline"
					download
					href="https://far.qscape.ru/local/js/vue-app/dist/files/Условия_аккредитаци_монтажников_FAR.pdf"
				>
					условия аккредитации монтажников FAR
				</a>
				<a
					download
					href="https://far.qscape.ru/local/js/vue-app/dist/files/Условия_аккредитаци_монтажников_FAR.pdf"
				>
					<DownloadIcon />
				</a>
			</div>
		</label>
	</div>
</template>
