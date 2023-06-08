import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useUpdateTodoMutation } from '../api'
import useInput from '../../shared/hooks/use-input'
import useCheck from '../../shared/hooks/use-check'
import { Todo } from '../Todo'

import { Button, Form } from 'react-bootstrap'
import { Modal } from 'react-bootstrap'

import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import { useEffect } from 'react'

const updateModalProptypes = {
	isVisible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	todo: PropTypes.shape({
		id: PropTypes.string.isRequired,
		completed: PropTypes.bool.isRequired,
		userId: PropTypes.string.isRequired,
		title: PropTypes.string.isRequired,
	}),
}

export const UpdateModal = props => {
	const { t } = useTranslation()
	const [updateTodo, { isLoading, isSuccess, isError, error: errorMessage }] = useUpdateTodoMutation()

	const title = useInput(value => Todo.validate('title', value), props.todo.title)
	const completed = useCheck(value => Todo.validate('completed', value), props.todo.completed)

	const updateTodoHandler = () => {
		updateTodo({
			title: title.value,
			userId: props.todo.userId,
			id: props.todo.id,
			completed: completed.isChecked,
		})
	}

	const isFormValid = title.isValid && completed.isValid
	const isConfirmButtonDisabled = !isFormValid

	useEffect(() => {
		if (isSuccess) {
			props.close()
		}
	}, [props, isSuccess])

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else {
			return (
				<>
					{isError && <BaseErrorAlert message={errorMessage.error} />}
					<Modal.Body>
						<Form.Group className="mb-3">
							<Form.Label>{t('todo_form_title_label')}</Form.Label>
							<Form.Control
								type="text"
								placeholder={t('todo_form_title_placeholder')}
								name="title"
								value={title.value}
								onInput={title.inputHandler}
								onBlur={title.blurHandler}
								isInvalid={title.hasError}
							/>
							<Form.Control.Feedback type="invalid">
								{t(props.todo.title.errorMessage)}
							</Form.Control.Feedback>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>{t('todo_form_completed_label')}</Form.Label>
							<Form.Check
								type="checkbox"
								checked={completed.isChecked}
								onChange={completed.changeHandler}
								onBlur={completed.inputHandler}
								isInvalid={completed.hasError}
							/>
							<Form.Control.Feedback type="invalid">
								{t(props.todo.completed.errorMessage)}
							</Form.Control.Feedback>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={props.close}>
							{t('todo_updateModal_close')}
						</Button>
						<Button variant="primary" onClick={updateTodoHandler} disabled={isConfirmButtonDisabled}>
							{t('todo_updateModal_confirm')}
						</Button>
					</Modal.Footer>
				</>
			)
		}
	}

	return (
		<Modal show={props.isVisible} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>{t('todo_updateModal_title')}</Modal.Title>
			</Modal.Header>
			{conditionalRendering()}
		</Modal>
	)
}

UpdateModal.propTypes = updateModalProptypes
