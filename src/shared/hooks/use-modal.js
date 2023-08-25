import { useState } from 'react'

const useModal = (defaultIsVisible = false, openFn = undefined, closeFn = undefined, confirmFn = undefined, resetFormFn= undefined) => {
	const [isVisible, setIsVisible] = useState(defaultIsVisible)
	const [modalType, setModalType] = useState('');

	const openHandler = (openFnArgs = undefined, type = '') => {
		if (openFn) {
			openFn(openFnArgs)
		}
		setModalType(type);
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
	const resetHandler = (resetFormFn = undefined) => {
		if (resetFormFn) {
		  resetFormFn();
		}
	  };

	return {
		isVisible,
		openHandler,
		closeHandler,
		confirmHandler,
		resetHandler,
		modalType
	}
}

export default useModal
