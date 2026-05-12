export interface BitrixFormData {
	form_text_61: string
	form_text_62: string
	form_text_63: string
	form_text_64: string
	form_text_65: string
	form_text_66: string
	form_checkbox_AGREE_CONDITIONS_OF_ACCREDITATION: string[]
	form_checkbox_AGREE_PRIVACY_POLICY: string[]
}

export interface BitrixAnswers {
	form_checkbox_5_YEARS_OF_EXPERIENCE?: string[]
	photos_1?: File[]

	form_checkbox_COMPLETE_AND_SELECT_EQUIPMENT?: string[]
	form_textarea_86?: string

	form_textarea_87?: string

	form_checkbox_USED_FAR?: string[]
	photos_2?: File[]

	form_textarea_100?: string
}

export type BitrixPayload = BitrixFormData & BitrixAnswers
