import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useAddTodoMutation } from '../api'
import useInput from '../../shared/hooks/use-input'
import useCheck from '../../shared/hooks/use-check'
import { Todo } from '../Todo'

import { Button } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

import { FormCreate } from './partials/FormCreate'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import { useEffect } from 'react'
import { useCallback } from 'react'

const createModalProptypes = {
	isVisible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
}

export const CreateModal = props => {
	const { t } = useTranslation()
	const [addTodo, { isLoading, isSuccess, isError, error: errorMessage }] = useAddTodoMutation()

	const title = useInput(value => Todo.validate('title', value))
	const completed = useCheck(value => Todo.validate('completed', value))
	const userId = useInput(value => Todo.validate('userId', value))
	const id = useInput(value => Todo.validate('id', value))

	const formResetHandler = useCallback(() => {
		;[title, completed, userId, id].forEach(field => {
			field.reset()
		})
	}, [title, completed, userId, id])

	const addTodoHandler = () => {
		addTodo({
			title: title.value,
			userId: userId.value,
			id: id.value,
			completed: completed.isChecked,
		})
	}

	const isFormValid = title.isValid && completed.isValid && userId.isValid && id.isValid
	const isConfirmButtonDisabled = !isFormValid

	useEffect(() => {
		if (isSuccess) {
			formResetHandler()
			props.close()
		}
	}, [props, formResetHandler, isSuccess])

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else {
			return (
				<>
					{isError && <BaseErrorAlert message={errorMessage.error} />}
					<Modal.Body>
						<FormCreate userId={userId} id={id} title={title} completed={completed} />
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={props.close}>
							{t('todo_createModal_close')}
						</Button>
						<Button variant="primary" onClick={addTodoHandler} disabled={isConfirmButtonDisabled}>
							{t('todo_createModal_confirm')}
						</Button>
					</Modal.Footer>
				</>
			)
		}
	}

	return (
		<Modal show={props.isVisible} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>{t('todo_createModal_title')}</Modal.Title>
			</Modal.Header>
			{conditionalRendering()}
		</Modal>
	)
}

CreateModal.propTypes = createModalProptypes
