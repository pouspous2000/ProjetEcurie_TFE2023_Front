import { useState } from 'react'
import { StableValidationError } from '../Model'

const useCheck = (validateFn, defaultIsChecked = false) => {
	let errorMessage = ''
	let isValueValid = false

	const convertValueToBoolean = value => {
		try {
			validateFn(`${value}`)
			const isChecked = ['true', '1'].includes(`${value}`)
			isValueValid = true
			return isChecked
		} catch (error) {
			isValueValid = false
			if (error instanceof StableValidationError) {
				errorMessage = error.message
			} else {
				// unhandled error
				console.error(error)
				throw error
			}
		}
	}

	const [isChecked, setIsChecked] = useState(convertValueToBoolean(defaultIsChecked))
	const hasError = !isValueValid

	const changeHandler = () => {
		setIsChecked(prev => !prev)
	}

	const reset = () => {
		setIsChecked(convertValueToBoolean(defaultIsChecked))
	}

	return {
		isChecked,
		isValid: isValueValid,
		hasError,
		errorMessage,
		changeHandler,
		reset,
	}
}

export default useCheck
