import isInt from 'validator/es/lib/isInt'
import isBoolean from 'validator/es/lib/isBoolean'
import isLength from 'validator/es/lib/isLength'
import { Model } from '../shared/Model'

export class Todo extends Model {
	static propertyValidatorMapper = {
		userId: {
			validator: this.validatePk,
			errorMessage: 'todo_validation_userId',
		},
		id: {
			validator: this.validatePk,
			errorMessage: 'todo_validation_id',
		},
		title: {
			validator: this.validateTitle,
			errorMessage: 'todo_validation_title',
		},
		completed: {
			validator: this.validateBool,
			errorMessage: 'todo_validation_completed',
		},
	}

	static validatePk(value) {
		return isInt(value, { min: 1 })
	}

	static validateBool(value) {
		return isBoolean(value, { loose: false })
	}

	static validateTitle(value) {
		return isLength(value, { min: 5 })
	}
}
