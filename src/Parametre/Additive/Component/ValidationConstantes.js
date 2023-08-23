import { StableValidationError } from '../../../shared/Model'

export const validateName = value => {
	const trimmedValue = value.trim()
	if (trimmedValue.length === 0 || trimmedValue.length > 255) {
		throw new StableValidationError("Le nom de l'additif doit contenir entre 1 et 255 caractères.")
	}
}

export const validatePrice = value => {
	const price = value
	if (price === '' || price === 0) {
		throw new StableValidationError("Le prix de l'additif ne peut pas valoir 0.")
	}
}

export default {
	validateName,
	validatePrice,
}
