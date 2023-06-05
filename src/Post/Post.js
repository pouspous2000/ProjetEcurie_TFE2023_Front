import isInt from 'validator/es/lib/isInt'
import isLength from 'validator/es/lib/isLength'
import { Model } from '../shared/Model'

export class Post extends Model {
	static propertyValidatorMapper = {
		userId: {
			validator: this.validatePK,
			errorMessage: 'post_validation_userId',
		},
		id: {
			validator: this.validatePK,
			errorMessage: 'post_validation_id',
		},
		title: {
			validator: this.validateTitle,
			errorMessage: 'post_validation_title',
		},
		body: {
			validator: this.validateBody,
			errorMessage: 'post_validation_body',
		},
	}

	constructor(userId, id, title, body) {
		super()
		this.userId = userId
		this.id = id
		this.title = title
		this.body = body
	}

	static validatePK(value) {
		return isInt(value, { min: 1 })
	}

	static validateTitle(value) {
		return isLength(value, { min: 5 })
	}

	static validateBody(value) {
		return isLength(value, { min: 20 })
	}
}
