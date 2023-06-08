export class StableValidationError extends Error {
	constructor(message) {
		super(message)
		this.name = 'STABLE_VALIDATION_ERROR'
	}
}

export class StableModelPropertyNotFoundError extends Error {
	constructor(message) {
		super(message)
		this.name = 'STABLE_MODEL_PROPERTY_NOT_FOUND_ERROR'
	}
}

export class Model {
	constructor() {
		if (this.constructor === Model) {
			throw new Error('Abstract Model class should not be instantiated')
		}
	}

	static propertyValidatorMapper = {}

	static validate(property, value) {
		if (!(property in this.propertyValidatorMapper)) {
			throw new StableModelPropertyNotFoundError(`property ${property} does not exist`)
		}
		if (!this.propertyValidatorMapper[property]['validator'](value)) {
			throw new StableValidationError(this.propertyValidatorMapper[property]['errorMessage'])
		}
	}
}
