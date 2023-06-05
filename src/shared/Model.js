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

		// automatic getter and setters generation , beware it does not allow to use the syntactic sugars for setters and getters definitions
		Object.keys(this.constructor.propertyValidatorMapper).forEach(property => {
			Object.defineProperty(this, property, {
				get() {
					return this[`_${property}`]
				},
				set(value) {
					this.constructor.validate(property, `${value}`) //force string casting as validator functions require a string to validate
					this[`_${property}`] = value
				},
				configurable: true,
				enumerable: true,
			})
		})
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

	serialize() {
		// returns an object with the structure {getterName: getterValue} for the instance
		const serialized = {}
		const modelContext = this

		Object.getOwnPropertyNames(this)
			.filter(property => property.startsWith('_'))
			.forEach(property => {
				const getterName = property.slice(1)
				serialized[getterName] = modelContext[getterName]
			})
		return serialized
	}
}
