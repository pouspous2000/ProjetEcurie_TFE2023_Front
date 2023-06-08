import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { useDeleteTodoMutation } from '../api'
import { useEffect } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'

const deleteModalProptypes = {
	isVisible: PropTypes.bool.isRequired,
	close: PropTypes.func.isRequired,
	id: PropTypes.number,
}

export const DeleteModal = props => {
	const { t } = useTranslation()
	const [deleteTodo, { isLoading, isSuccess, isError, error: errorMessage }] = useDeleteTodoMutation()

	const deleteTodoHandler = () => {
		deleteTodo({ id: props.id })
	}

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else {
			return (
				<>
					{isError && <BaseErrorAlert message={errorMessage.error} />}
					<p>{t('todo_deleteModal_text')}</p>
				</>
			)
		}
	}

	useEffect(() => {
		if (isSuccess) {
			props.close()
		}
	}, [isSuccess, props])

	return (
		<Modal show={props.isVisible} onHide={props.close}>
			<Modal.Header closeButton>
				<Modal.Title>{t('todo_deleteModal_title')}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{conditionalRendering()}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={props.close}>
					{t('todo_deleteModal_close')}
				</Button>
				<Button variant="primary" onClick={deleteTodoHandler}>
					{t('todo_deleteModal_confirm')}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

DeleteModal.propTypes = deleteModalProptypes
