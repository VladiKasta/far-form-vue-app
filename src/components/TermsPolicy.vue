<script setup lang="ts">
const props = defineProps<{
	modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'accept'])

const onChange = (e: Event) => {
	const target = e.target as HTMLInputElement
	emit('update:modelValue', target.checked)
}
</script>

<template>
	<div class="checkbox">
		<label class="custom-checkbox">
			<input
				type="checkbox"
				:checked="modelValue"
				@change="onChange"
			/>
			<span class="checkmark"></span>
		</label>

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
