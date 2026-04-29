<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

/* const props = defineProps({
	modelValue: String,
	options: {
		type: Array,
		required: true,
	},
	placeholder: {
		type: String,
		default: 'Выберите город',
	},
	showErrors: {
		type: Boolean,
		default: false,
	},
}) */

const props = withDefaults(
	defineProps<{
		modelValue: string
		options: { label: string; value: string }[]
		placeholder?: string
		showErrors?: boolean
	}>(),
	{
		placeholder: 'Выберите город',
		showErrors: false,
	}
)

const emit = defineEmits(['update:modelValue'])

const isOpen = ref(false)
const dropdown = ref<Node>()

const selectedLabel = computed(() => {
	const found = props.options.find(o => o.value === props.modelValue)
	return found ? found.label : ''
})

const isInvalid = computed(() => {
	return props.showErrors && !props.modelValue
})

const toggle = () => {
	isOpen.value = !isOpen.value
}

const select = (city: { label: string; value: string }) => {
	emit('update:modelValue', city.value)
	isOpen.value = false
}

const handleClickOutside = (e: MouseEvent) => {
	const target = e.target as Node
	if (dropdown.value && !dropdown.value.contains(target)) {
		isOpen.value = false
	}
}

onMounted(() => {
	document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
	document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
	<div
		class="dropdown"
		ref="dropdown"
	>
		<!-- выбранное значение -->
		<div
			class="dropdown__selected"
			:class="{ uncorrect: isInvalid }"
			@click="toggle"
		>
			{{ selectedLabel || placeholder }}
			<span
				class="arrow"
				:class="{ open: isOpen }"
			>
				▾
			</span>
		</div>

		<!-- список -->
		<div
			v-if="isOpen"
			class="dropdown__list"
		>
			<div
				v-for="city in options"
				:key="city.value"
				class="dropdown__item"
				@click="select(city)"
			>
				{{ city.label }}
			</div>
		</div>
	</div>
</template>

<style scoped>
.dropdown {
	position: relative;
	width: 100%;
}

.dropdown__selected {
	padding: 8px 12px;
	border: 1px solid #ccc;
	border-radius: 6px;
	background: #fff;
	cursor: pointer;
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.dropdown__selected.uncorrect {
	border-color: red;
}

.arrow {
	transition: transform 0.2s ease;
}

.arrow.open {
	transform: rotate(180deg);
}

.dropdown__list {
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	background: #fff;
	border: 1px solid #ccc;
	border-radius: 6px;
	margin-top: 4px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	z-index: 10;
}

.dropdown__item {
	padding: 10px 12px;
	cursor: pointer;
	transition: background 0.2s;
}

.dropdown__item:hover {
	background: #f5f5f5;
}
</style>
