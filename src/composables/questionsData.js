export const steps = [
	{
		id: 1,
		label: 'Есть ли у Вас опыт монтажа инженерных систем более 5 лет?',
		required: data => (data.answer === 'yes' ? ['answer', 'files'] : ['answer']),
	},
	{
		id: 2,
		label: 'Умеете ли Вы самостоятельно подбирать и комплектовать оборудование?',
		required: data => (data.answer === 'yes' ? ['answer', 'comment'] : ['answer']),
	},
	{
		id: 3,
		label:
			'Укажите бренды, с которыми Вы работали в сегменте «выше среднего» или «премиум»с упором на качественное дорогое оборудование',
		required: ['brands'],
	},
	{
		id: 4,
		label: 'Вы применяли в ранее смонтированных инженерных системах трубопроводную арматуру FAR?',
		required: data => (data.answer === 'yes' ? ['answer', 'files'] : ['answer']),
	},
	{ id: 5, label: 'Дополнительная информация', required: [] },
]
