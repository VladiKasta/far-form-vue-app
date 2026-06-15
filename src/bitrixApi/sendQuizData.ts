import { toRaw } from 'vue'

export default async function sendQuizData(payload: any) {
	const formDataBitrix = new FormData()

	const sessionId = document.querySelector('input[name="sessid"]') as HTMLInputElement

	formDataBitrix.append('WEB_FORM_ID', '12')
	formDataBitrix.append('sessid', sessionId.value) //sessionId.value

	Object.entries(payload).forEach(([key, value]) => {
		if (!Array.isArray(value)) {
			if (value !== null && value !== undefined) {
				formDataBitrix.append(key, String(value))
			}
			return
		}

		// 🔥 1. FILES
		const raw = toRaw(value)

		const files = raw.filter(v => v instanceof File)

		if (files.length > 0) {
			files.forEach(file => {
				formDataBitrix.append(`${key}[]`, file)
			})
			return
		}

		// 🔥 2. CHECKBOX / STRING ARRAY
		raw.forEach(item => {
			formDataBitrix.append(`${key}[]`, String(item))
		})
	})

	// DEBUG
	const debugObject: Record<string, any> = {}

	;(formDataBitrix as any).forEach((value: any, key: string) => {
		if (debugObject[key]) {
			if (!Array.isArray(debugObject[key])) {
				debugObject[key] = [debugObject[key]]
			}
			debugObject[key].push(value)
		} else {
			debugObject[key] = value
		}
	})

	console.log('BITRIX OBJECT:', debugObject)

	const res = await fetch('https://far.ru/local/ajax/form_far_installer.php', {
		method: 'POST',
		body: formDataBitrix,
	})

	return await res.json()
}
