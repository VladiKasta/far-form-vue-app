import { StepConfig } from '../interface/Step'

const steps: StepConfig[] = [
	{
		id: 1,
		label: 'Есть ли у Вас опыт монтажа инженерных систем более 5 лет?',
		required: (data: { answer: string }) =>
			data.answer === 'yes' ? ['answer', 'files'] : ['answer'],
	},
	{
		id: 2,
		label:
			'Умеете ли Вы самостоятельно комплектовать и подбирать оборудование для систем отопления и водоснабжения?',
		required: (data: { answer: string }) =>
			data.answer === 'yes' ? ['answer', 'comment'] : ['answer'],
	},
	{
		id: 3,
		label:
			'Укажите опыт работы с брендами в сегменте "выше среднего" или "премиум", с упором на качественное дорогое оборудование.',
		required: ['brands'],
	},
	{
		id: 4,
		label: 'Вы использовали трубопроводную арматуру FAR в ранее установленных инженерных системах?',
		required: (data: { answer: string }) =>
			data.answer === 'yes' ? ['answer', 'files'] : ['answer'],
	},
	{ id: 5, label: 'Дополнительная информация', required: [] },
]

export { steps }
