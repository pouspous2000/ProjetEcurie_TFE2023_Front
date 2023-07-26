import React, { useCallback, useEffect, useState } from 'react'
import useInput from '../../shared/hooks/use-input'
import { Modal, Form, DatePicker } from 'react-bootstrap'
import { useAddEventsMutation } from '../../API/event.api'
import PropTypes from 'prop-types'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import { StableValidationError } from '../../shared/Model'
import moment from 'moment'
const createModalProptypes = {
	modal: PropTypes.shape({
		isVisible: PropTypes.bool,
		openHandler: PropTypes.func,
		closeHandler: PropTypes.func,
		confirmHandler: PropTypes.func,
	}),
}

export const ModalAddEvent = props => {
	const [
		addEvents,
		{ isLoading: isAddEventLoading, isSuccess: isAddEventSuccess, isError: isAddEventError, error: AddEventError },
	] = useAddEventsMutation()

	const [startDate, setStartDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endDate, setEndDate] = useState('')
	const [endTime, setEndTime] = useState('')

	const [description, setDescription] = useState('')

	const validateName = value => {
		const trimmedValue = value.trim()
		if (trimmedValue.length === 0 || trimmedValue.length > 255) {
			throw new StableValidationError("Le nom de l'évènement doit contenir entre ... et ....")
		}
	}

	const name = useInput(value => validateName(value, ''))
	// const description = useCheck(value => Todo.validate('completed', value))
	// const startingAt= useInput(value => Todo.validate('userId', value))
	// const endingAt = useInput(value => Todo.validate('id', value))

	const formResetHandler = useCallback(() => {
		name.reset()
		setDescription('')
	}, [name])

	const addEventHandler = () => {
		addEvents({
			name: name.value,
			description: description,
			startingAt: getFormattedDateTime(startDate, startTime),
			endingDate: getFormattedDateTime(endDate, endTime),
			// participants: '',
		})
	}
	useEffect(() => {
		if (isAddEventSuccess) {
			formResetHandler()
			props.modal.closeHandler()
		}
	}, [props, formResetHandler, isAddEventSuccess])

	const isFormValid = name.isValid
	const isConfirmButtonDisabled = !isFormValid

	const handleStartDateChange = event => {
		setStartDate(event.target.value)
	}

	const handleStartTimeChange = event => {
		setStartTime(event.target.value)
	}

	const handleEndDateChange = event => {
		setEndDate(event.target.value)
	}

	const handleEndTimeChange = event => {
		setEndTime(event.target.value)
	}

	const getFormattedDateTime = (date, time) => {
		const formattedDate = moment(date).format('YYYY-MM-DD')
		const formattedTime = moment(time, 'HH:mm').format('HH:mm:ss')
		return `${formattedDate}T${formattedTime}.000Z`
	}

	return (
		<Modal show={props.modal.isVisible} onHide={props.modal.closeHandler}>
			<Modal.Header>
				<Modal.Title as={'header'} className="d-flex justify-content-between align-items-center w-100">
					<h3 style={{ color: '#271503', textAlign: 'center' }}>Ajouter un nouvel evènement</h3>
					<i
						data-bs-dismiss="modal"
						style={{ fontSize: '30px' }}
						className="bi bi-x-circle-fill"
						onClick={props.modal.closeHandler}></i>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Group className="mb-3">
						<Form.Label>Nom de l'évènement </Form.Label>
						<Form.Control
							type="text"
							placeholder="Ex: Additive complète"
							name="name"
							value={name.value}
							onInput={name.inputHandler}
							onBlur={name.blurHandler}
							isInvalid={name.hasError}
						/>
						<Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Description de l'évènement </Form.Label>
						<Form.Control
							rows="3"
							placeholder="Décrivez votre evènement"
							value={description}
							onChange={event => setDescription(event.target.value)}
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label> Début de l'évènement : </Form.Label>
						<br />
						<Form.Label> Date </Form.Label>
						<Form.Control type="date" value={startDate} onChange={handleStartDateChange} />

						<Form.Label>Heure </Form.Label>
						<Form.Control type="time" value={startTime} onChange={handleStartTimeChange} />
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label> Début de l'évènement : </Form.Label>
						<br />
						<Form.Label> Date </Form.Label>
						<Form.Control type="date" value={endDate} onChange={handleEndDateChange} />
						<Form.Label>Heure </Form.Label>
						<Form.Control type="time" value={endTime} onChange={handleEndTimeChange} />
					</Form.Group>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<button
					style={{
						borderRadius: '10px',
						backgroundColor: '#af8d68',
						borderColor: '#af8d68',
						color: '#F5F5DC',
					}}
					disabled={isConfirmButtonDisabled}
					onClick={addEventHandler}>
					Envoyer
				</button>
			</Modal.Footer>
		</Modal>
	)
}
ModalAddEvent.propTypes = createModalProptypes
