import { StableValidationError } from '../../../shared/Model'

export const validateName = value => {
	const trimmedValue = value.trim()
	if (trimmedValue.length === 0 || trimmedValue.length > 255) {
		throw new StableValidationError('Le nom de la pension doit contenir entre 1 et 255 caractères.')
	}
}

export const validatePrice = value => {
	const price = value
	if (price === '' || price === 0) {
		throw new StableValidationError('Le prix de la pension ne peut pas valoir 0.')
	}
}

export const validateDescription = value => {
	const trimmedValue = value.trim()
	if (trimmedValue.length === 0 || trimmedValue.length > 255) {
		throw new StableValidationError('La description doit contenir entre 1 et 255 caractères.')
	}
}
export default {
	validateDescription,
	validateName,
	validatePrice,
}
