import { useState } from 'react'

const useModal = (defaultIsVisible = false, openFn = undefined, closeFn = undefined, confirmFn = undefined) => {
	const [isVisible, setIsVisible] = useState(defaultIsVisible)

	const openHandler = (openFnArgs = undefined) => {
		if (openFn) {
			openFn(openFnArgs)
		}
		setIsVisible(true)
	}

	const closeHandler = (closeFnArgs = undefined) => {
		if (closeFn) {
			closeFn(closeFnArgs)
		}
		setIsVisible(false)
	}

	const confirmHandler = (confirmFnArgs = undefined) => {
		if (confirmFn) {
			confirmFn(confirmFnArgs)
		}
		setIsVisible(false)
	}

	return {
		isVisible,
		openHandler,
		closeHandler,
		confirmHandler,
	}
}

export default useModal
