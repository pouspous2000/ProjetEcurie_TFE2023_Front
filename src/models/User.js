import { Model } from '../shared/Model'
import isEmail from 'validator/es/lib/isEmail'
import isLength from 'validator/es/lib/isLength'
import { StableValidationError } from '../shared/Model'

export class User extends Model {
	static propertyValidatorMapper = {
		email: {
			validator: this.validateEmail,
			errorMessage: 'user_validation_email',
		},
		password: {
			validator: this.validatePassword,
			errorMessage: 'user_validation_password',
		},
		confirmationCode: {
			validator: this.validateConfirmationCode,
			errorMessage: 'user_validation_confirmationCode',
		},
	}

	static validateEmail(value) {
		return isEmail(value ? value.trim() : '')
	}

	static validatePassword(value) {
		return isLength(value ? value.trim() : '', { min: 1, max: 255 })
	}

	static validatePasswordConfirm(value, password) {
		if (!(isLength(value ? value.trim() : '', { min: 1, max: 255 }) && value.trim() === password)) {
			throw new StableValidationError('user_validation_passwordConfirm')
		}
	}

	static validateConfirmationCode(value) {
		return isLength(value ? value.trim() : '', { min: 10, max: 255 })
	}
}
