import { useState } from 'react'
import { StableValidationError } from '../Model'

const useInput = (validateFn, defaultValue = '') => {
	const [enteredValue, setEnteredValue] = useState(defaultValue)
	const [hadFocus, setHadFocus] = useState(!!enteredValue)

	let errorMessage = ''
	let isValueValid = false

	try {
		isValueValid = validateFn(enteredValue)
		isValueValid = true
	} catch (error) {
		if (error instanceof StableValidationError) {
			errorMessage = error.message
		} else {
			console.error(error.message)
			throw error
		}
	}
	const hasError = !isValueValid && hadFocus

	const inputHandler = event => {
		setEnteredValue(event.target.value)
	}

	const blurHandler = () => {
		setHadFocus(true)
	}

	const reset = () => {
		setEnteredValue(defaultValue)
		setHadFocus(false)
	}

	return {
		value: enteredValue,
		isValid: isValueValid,
		hasError,
		errorMessage,
		inputHandler,
		blurHandler,
		reset,
	}
}

export default useInput
