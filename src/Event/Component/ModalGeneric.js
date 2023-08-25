import { Modal, Button, Form } from 'react-bootstrap'
import useInput from '../../shared/hooks/use-input'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

import {
	useAddEventMutation,
	useSubscribeEventMutation,
	useUpdateEventMutation,
	useDeleteEventMutation,
} from '../../API/event.api'
import {
	useSubscribeCompetitionMutation,
	useAddCompetitionMutation,
	useUpdateCompetitionMutation,
	useDeleteCompetitionMutation,
} from '../../API/competition.api'
import {
	useSubscribeTaskMutation,
	useAddTaskMutation,
	useUpdateTaskMutation,
	useDeleteTaskMutation,
} from '../../API/task.api'

import { useGetContactByRoleCategoryQuery } from '../../API/contact.api'
import { useAddLessonMutation, useUpdateLessonMutation, useDeleteLessonMutation } from '../../API/lesson.api'
import validationConstants from './ValidationConstante'
import moment from 'moment'

const createModalProptypes = {
	modal: PropTypes.shape({
		isVisible: PropTypes.bool,
		openHandler: PropTypes.func,
		closeHandler: PropTypes.func,
		confirmHandler: PropTypes.func,
	}),
}

export const ModalGeneric = props => {
	const {
		id,
		title,
		dateStart,
		dateEnd,
		hourStart,
		hourEnd,
		status,
		remark,
		descript,
		category,
		isAutor,
		type,
		categories,
	} = props


	const [description, setDescription] = useState('')
	const [statusTask, setStatusTask] = useState('')
	const [remarkTask, setRemarkTask] = useState('')
	const [names, setNames] = useState('')

	const currentDateTime = moment()

	const isValid = type !== 'Add'

	// ------Formatage date et heure-----------
	const [startDate, setStartDate] = useState('')
	const [startTime, setStartTime] = useState('')
	const [endDate, setEndDate] = useState('')
	const [endTime, setEndTime] = useState('')

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
		const formattedTime = moment(time, 'HH:mm').format('HH:mm:ss')
		return `${date}T${formattedTime}.000Z`
	}
	// ---------CatégoriesEventable-----------
	const [selectedCategory, setSelectedCategory] = useState(type === 'Add' ? 'event' : categories)
	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value)
	}
	// ---------CatégoriesEventable-----------
	const [selectedEmployee, setSelectedEmployee] = useState("")
	const handleEmployeeChange = employee => {
		setSelectedEmployee(employee.target.value)
		console.log(employee)
	}

	// ---------Validation des inputs---------
	const {
		validateName,
		validateDescription,
		validateStartDates,
		validateStartTimes,
		validateEndTimes,
		validateEndDates,
	} = validationConstants

	const name = useInput(value => validateName(value, ''))
	const descriptions = useInput(value => validateDescription(value), '')
	const startDates = useInput(value => validateStartDates(value, ''))
	const startTimes = useInput(value => validateStartTimes(value, startDate, ''))
	const endTimes = useInput(value => validateEndTimes(value, endDate, startTime, startDate, ''))
	const endDates = useInput(value => validateEndDates(value, startDate, ''))

	const [selectedTime, setSelectedTime] = useState('')
	const [selectedDate, setSelectedDate] = useState('')

	const isTimeValid = () => {
		if (moment(selectedDate).isSame(moment(), 'day')) {
			const selectedMoment = moment(selectedTime, 'HH:mm')
			const currentMoment = moment()
			return selectedMoment.isAfter(currentMoment)
		}
		return true
	}
	//  __________GET_______________
	const {
		data: getContactByRoleCategoryData,
		isSuccess: isGetContactByRoleCategorySuccess,
		isLoading: isGetContactByRoleCategoryLoading,
		isError: isGetContactByRoleCategoryError,
		error: getContactByRoleCategoryError,
	} = useGetContactByRoleCategoryQuery(selectedCategory === 'lesson' ? 'CLIENT' : 'EMPLOYEE');




	// _________ADD________
	const [addEvent, { isSuccess: isAddEventSuccess }] = useAddEventMutation()
	const [addCompetition, { isSuccess: isAddCompetitionSuccess }] = useAddCompetitionMutation()
	const [addLesson, { isSuccess: isAddLessonSuccess }] = useAddLessonMutation()
	const [addTask, { isSuccess: isAddTaskSuccess }] = useAddTaskMutation()

	const addHandler = () => {

		if (selectedCategory === 'event') {
			addEvent({
				name: name.value,
				description: description,
				startingAt: getFormattedDateTime(startDate, startTime),
				endingAt: getFormattedDateTime(endDate, endTime),
				participants: []
			});

		} else if (selectedCategory === 'task') {
			const getIdEmploee = getContactByRoleCategoryData && getContactByRoleCategoryData.find(employee => `${employee.firstName} ${employee.lastName}` === selectedEmployee)
			addTask({
				employeeId: getIdEmploee.id,
				name: name.value,
				description: description,
				startingAt: getFormattedDateTime(startDate, startTime),
				endingAt: getFormattedDateTime(endDate, endTime),
				remark: remarkTask,
			})

		} else if (selectedCategory === 'competition') {
			addCompetition({
				name: name.value,
				description: description,
				startingAt: getFormattedDateTime(startDate, startTime),
				endingAt: getFormattedDateTime(endDate, endTime),
				participants: [],
			})

		} else if (selectedCategory === 'lesson') {
			const getIdEmploee = getContactByRoleCategoryData && getContactByRoleCategoryData.find(employee => `${employee.firstName} ${employee.lastName}` === selectedEmployee)
			addLesson({
				clientId: getIdEmploee.id,
				startingAt: getFormattedDateTime(startDate, startTime),
				endingAt: getFormattedDateTime(endDate, endTime),
			})
		}
	}

	useEffect(() => {
		if (isAddEventSuccess || isAddTaskSuccess || isAddCompetitionSuccess || isAddLessonSuccess) {
			props.modal.closeHandler()
		}
	}, [isAddEventSuccess, isAddTaskSuccess, isAddCompetitionSuccess, isAddLessonSuccess, props])

	const isFormValid = !(
		name.hasError ||
		description.hasError ||
		startDates.hasError ||
		startTimes.hasError ||
		endTimes.hasError ||
		endDates.hasError
	)

	//  __________SUBSCRIBE_______________
	const [subscribeEvent, { isSuccess: isSubscribeEventSuccess }] = useSubscribeEventMutation()
	const [subscribeTask, { isSuccess: isSubscribeTaskSuccess }] = useSubscribeTaskMutation()
	const [subscribeCompetition, { isSuccess: isSubscribeCompetitionSuccess }] = useSubscribeCompetitionMutation()

	const handelParticipant = eventId => {
		if (category === 'event') {
			subscribeEvent({
				id: eventId,
			})
		} else if (category === 'task') {
			subscribeTask({
				id: eventId,
			})
		} else if (category === 'competion') {
			subscribeCompetition({
				id: eventId,
			})
		}
	}


	useEffect(() => {
		if (isSubscribeEventSuccess || isSubscribeTaskSuccess || isSubscribeCompetitionSuccess) {
			props.modal.closeHandler()
		}
	}, [isSubscribeEventSuccess, isSubscribeTaskSuccess, isSubscribeCompetitionSuccess, props])



	//  __________UPDATE_______________

	const [updateEvent, { isSuccess: isUpdateEventSuccess }] = useUpdateEventMutation()
	const [updateCompetition, { isSuccess: isUpdateCompetitionSuccess }] = useUpdateCompetitionMutation()
	const [updateTask, { isSuccess: isUpdateTaskSuccess }] = useUpdateTaskMutation()
	const [updateLesson, { isSuccess: isUpdateLessonSuccess }] = useUpdateLessonMutation()

	const updateHandler = () => {
		let eventData = {
			id: id,
			name: name.value === '' ? title : name.value,
			description: description === '' ? descript : description,
			startingAt: `${moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(hourStart, 'HH:mm').format('HH:mm:ss')}.000Z`,
			endingAt: `${moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(hourEnd, 'HH:mm').format('HH:mm:ss')}.000Z`,
		};

		if (category === 'event') {
			eventData.participants = [];
			updateEvent(eventData);
		} else if (category === 'task') {
			eventData.employeeId = props.employee.userId;
			eventData.remark = remarkTask;
			updateTask(eventData);
		} else if (category === 'competion') {
			eventData.participants = [];
			updateCompetition(eventData);
		} else if (category === 'lesson') {
			updateLesson({
				clientId: props.client.userId,
				startingAt: `${moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourStart,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				endingAt: `${moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourEnd,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`
			});
		}
	};

	useEffect(() => {
		if (isUpdateEventSuccess || isUpdateLessonSuccess || isUpdateTaskSuccess || isUpdateCompetitionSuccess) {
			props.modal.closeHandler()
		}
	}, [isUpdateEventSuccess, isUpdateLessonSuccess, isUpdateTaskSuccess, isUpdateCompetitionSuccess, props])

	// _______________DELETE______________

	const [deleteEvent, { isSuccess: isDeleteEventSuccess }] = useDeleteEventMutation()
	const [deleteTask, { isSuccess: isDeleteTaskSuccess }] = useDeleteTaskMutation()
	const [deleteLesson, { isSuccess: isDeleteLessonSuccess }] = useDeleteLessonMutation()
	const [deleteCompetition, { isSuccess: isDeleteCompetitionSuccess }] = useDeleteCompetitionMutation()

	const deleteHandler = eventId => {
		if (category === 'event')
			deleteEvent({
				id: eventId,
			})
		else if (category === 'task') {
			deleteTask({
				id: eventId,
			})
		} else if (category === 'competion') {
			deleteCompetition({
				id: eventId,
			})
		} else if (category === 'lesson') {
			deleteLesson({
				id: eventId,
			})
		}
	}

	useEffect(() => {
		if (isDeleteEventSuccess || isDeleteCompetitionSuccess || isDeleteLessonSuccess || isDeleteTaskSuccess) {
			props.modal.closeHandler()
		}
	}, [isDeleteEventSuccess, isDeleteCompetitionSuccess, isDeleteLessonSuccess, isDeleteTaskSuccess, props])

	useEffect(() => {
		if (isAddEventSuccess) {
			props.modal.closeHandler()
		}
	}, [props, isAddEventSuccess])

	const conditionalRendering = () => {
		if (type === 'Add') {
			return (
				<Button variant="secondary" disabled={!isFormValid || !isTimeValid()} onClick={addHandler}>
					Ajouter
				</Button>
			)
		} else if (type === 'View') {
			return (
				<>
					{dateStart > currentDateTime.format('DD/MM/YYYY') ? (
						<Button variant="secondary" onClick={() => handelParticipant(id)}>
							{props.participant && props.participant.find(participant => participant.userId === 1)
								? // TODO : Mettre l'id du user ! Ici Hardcodé !
								'Se désinscrire'
								: "S'inscrire"}
						</Button>
					) : (
						''
					)}
				</>
			)
		} else if (type === 'AutorView') {
			return (
				<>
					<Button
						variant="secondary"
						disabled={!isFormValid || !isTimeValid()}
						onClick={updateHandler}
						data-bs-dismiss="modal">
						Enregistrer
					</Button>

					<Button variant="secondary" onClick={() => deleteHandler(id)}>
						Supprimer
					</Button>
				</>
			)
		}
	}

	return (
		<Modal show={props.modal.isVisible} onHide={props.modal.closeHandler}>
			<Modal.Header>
				<Modal.Title as={'header'} className="d-flex justify-content-between align-items-center w-100">
					<p style={{ float: 'right' }}></p>
					<i
						data-bs-dismiss="modal"
						style={{ fontSize: '30px', float: 'right' }}
						className="bi bi-x-circle-fill"
						onClick={() => {
							props.modal.closeHandler && props.modal.closeHandler()

						}}>
					</i>
				</Modal.Title>
			</Modal.Header>

			<Modal.Body>
				<Form>
					{
						selectedCategory === 'lesson' ? '' :
							<Form.Group className="mb-3">
								<Form.Label>Nom de l'évènement </Form.Label>
								<Form.Control
									type="text"
									placeholder="Ex: Additive complète"
									name="name"
									defaultValue={type === 'Add' ? '' : title}
									onChange={event => setNames(event.target.value)}
									onInput={name.inputHandler}
									onBlur={name.blurHandler}
									isInvalid={name.hasError}
									disabled={!isAutor}
									style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
								/>
								<Form.Control.Feedback type="invalid">{name.errorMessage}</Form.Control.Feedback>
							</Form.Group>
					}


					<Form.Group className="mb-3">
						<Form.Label>Catégories </Form.Label>
						<Form.Select disabled={isValid} defaultValue={selectedCategory} onChange={handleCategoryChange}>
							{categories &&
								categories.map((category, index) => (
									<option key={index} value={category}>
										{category}
									</option>
								))}
						</Form.Select>
					</Form.Group>

					{
						category === 'lesson' || selectedCategory === 'lesson' ? '' :
							<>

								<Form.Group className="mb-3">
									<Form.Label>Description de l'évènement </Form.Label>
									<Form.Control
										rows="3"
										placeholder="Décrivez votre evènement"
										defaultValue={type === 'Add' ? '' : descript}
										onChange={event => setDescription(event.target.value)}
										onInput={descriptions.inputHandler}
										onBlur={descriptions.blurHandler}
										isInvalid={descriptions.hasError}
										disabled={!isAutor}
										style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
									/>
									<Form.Control.Feedback type="invalid">
										{descriptions.errorMessage}
									</Form.Control.Feedback>
								</Form.Group>

								{

									category === 'task' || selectedCategory === 'task' ?
										<>
											<Form.Group className="mb-3">
												<Form.Label>Remarque sur la tâche</Form.Label>
												<Form.Control
													rows="3"
													placeholder="Ajoutez une remarque"
													defaultValue={type === 'Add' ? '' : remark}
													onChange={event => setRemarkTask(event.target.value)}
													onInput={descriptions.inputHandler}
													onBlur={descriptions.blurHandler}
													isInvalid={descriptions.hasError}
													disabled={!isAutor}
													style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
												/>
												<Form.Control.Feedback type="invalid">
													{descriptions.errorMessage}
												</Form.Control.Feedback>
											</Form.Group>
										</>
										: ''
								}
							</>
					}



					<Form.Group className="mb-3">
						<Form.Label> Début de l'évènement : </Form.Label>
						<br />
						<Form.Label> Date </Form.Label>
						<Form.Control
							min={moment().format('YYYY-MM-DD')}
							type="date"
							defaultValue={type === 'Add' ? '' : moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}
							onChange={e => {
								handleStartDateChange(e)
								setSelectedDate(e.target.value)
							}}
							onInput={startDates.inputHandler}
							onBlur={startDates.blurHandler}
							isInvalid={startDates.hasError}
							disabled={!isAutor}
							style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
						/>
						<Form.Control.Feedback type="invalid">{startDates.errorMessage}</Form.Control.Feedback>

						<Form.Label>Heure </Form.Label>
						<Form.Control
							type="time"
							defaultValue={type === 'Add' ? '' : hourStart}
							onChange={e => {
								handleStartTimeChange(e)
								setSelectedTime(e.target.value)
							}}
							onInput={startTimes.inputHandler}
							onBlur={startTimes.blurHandler}
							isInvalid={startTimes.hasError}
							disabled={!isAutor}
							style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
						/>
						<Form.Control.Feedback type="invalid">{startTimes.errorMessage}</Form.Control.Feedback>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Fin de l'évènement : </Form.Label>
						<br />

						<Form.Label> Date </Form.Label>
						<Form.Control
							min={moment().format('YYYY-MM-DD')}
							type="date"
							defaultValue={type === 'Add' ? '' : moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}
							onChange={e => {
								handleEndDateChange(e)
								setSelectedDate(e.target.value)
							}}
							onInput={endDates.inputHandler}
							onBlur={endDates.blurHandler}
							isInvalid={endDates.hasError}
							disabled={!isAutor}
							style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
						/>
						<Form.Control.Feedback type="invalid">{endDates.errorMessage}</Form.Control.Feedback>

						<Form.Label>Heure </Form.Label>
						<Form.Control
							disabled={!isAutor}
							type="time"
							defaultValue={type === 'Add' ? '' : hourEnd}
							onChange={e => {
								handleEndTimeChange(e)
								setSelectedTime(e.target.value)
							}}
							onInput={endTimes.inputHandler}
							onBlur={endTimes.blurHandler}
							isInvalid={endTimes.hasError}
							style={isAutor ? {} : { background: 'transparent', pointerEvents: 'none' }}
						/>
						<Form.Control.Feedback type="invalid">{endTimes.errorMessage}</Form.Control.Feedback>
					</Form.Group>



					{type !== 'Add' ?
						<>
							<Form.Group>
								<Form.Label style={{ textDecoration: 'underline' }}> Créateur : </Form.Label>
								<div>
									<p>
										{props.creator.firstName} {props.creator.lastName}
									</p>
								</div>

								<Form.Label style={{ textDecoration: 'underline' }}> Participants : </Form.Label>


								{
									props.participant === [] ? (
										<div>
											Il n'y a pas encore de participants pour cet évènement.
										</div>
									) : (
										(category === 'competition' || category === 'event') && type !== 'Add' ? (
											props.participants.map(participant => (
												<div key={participant.userId}>
													<p>
														- {participant.firstName} {participant.lastName}
													</p>
												</div>
											))
										) : (
											category === 'lesson' && type !== 'Add' ? (
												<div key={props.client.userId}>
													<p>
														- {props.client.firstName} {props.client.lastName}
													</p>
												</div>
											) : (
												category === 'task' && type !== 'Add' ? (
													<div key={props.employee.userId}>
														<p>
															- {props.employee.firstName} {props.employee.lastName}
														</p>
													</div>
												) : (
													''
												)
											)
										)
									)
								}
							</Form.Group>
						</>
						: ''
					}
					{
						selectedCategory === 'task' ?
							<Form.Group className="mb-3">
								<Form.Label>Employé : </Form.Label>
								<Form.Select disabled={isValid} defaultValue={selectedEmployee} onChange={handleEmployeeChange}>
									{getContactByRoleCategoryData &&
										getContactByRoleCategoryData.map((value, index) => (
											<option key={index} value={value.userId}>
												{value.firstName}  {value.lastName}
											</option>
										))}
								</Form.Select>
							</Form.Group>
							:
							<>
								{
									selectedCategory === 'lesson' ?
										<Form.Group className="mb-3">
											<Form.Label>Client : </Form.Label>
											<Form.Select disabled={isValid} defaultValue={selectedEmployee} onChange={handleEmployeeChange}>
												{getContactByRoleCategoryData &&
													getContactByRoleCategoryData.map((value, index) => (
														<option key={index} value={value.userId}>
															{value.firstName}  {value.lastName}
														</option>
													))}
											</Form.Select>
										</Form.Group>
										: ''
								}
							</>

					}

				</Form>
			</Modal.Body>
			<Modal.Footer>{conditionalRendering()}</Modal.Footer>
		</Modal>
	)

}

ModalGeneric.propTypes = createModalProptypes
ModalGeneric.defaultProps = {

	descript: '',
	dateStart: '',
	dateEnd: '',
	hourStart: '',
	hourEnd: '',
	title: '',
	isAutor: '',
	type: '',
	status: '',
	creator: '',
	client: '',
	categories: '',
	category: '',
	employee: '',
	remark: '',
	id: '',
}
