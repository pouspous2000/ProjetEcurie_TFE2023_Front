import isInt from 'validator/es/lib/isInt'
import isLength from 'validator/es/lib/isLength'
import { Model } from '../shared/Model'

export class Post extends Model {
	static propertyValidatorMapper = {
		userId: {
			validator: this.validatePK,
			errorMessage: 'user Id error message',
		},
		id: {
			validator: this.validatePK,
			errorMessage: 'id error message',
		},
		title: {
			validator: this.validateTitle,
			errorMessage: 'title error message',
		},
		body: {
			validator: this.validateBody,
			errorMessage: 'body error message',
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
