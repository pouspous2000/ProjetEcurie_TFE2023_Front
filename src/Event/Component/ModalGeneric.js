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
import { conditionalRenderingLessonStatus } from './FormConditionalRendering/conditionalRenderingLessonStatus'
import { conditionalRenderingTaskStatus } from './FormConditionalRendering/ConditionalRenderingStatus'
import { conditionalRenderingSelected } from './FormConditionalRendering/conditionalRenderingSelected'
import { conditionalRenderingPeople } from './FormConditionalRendering/conditionalRenderingPeoples'
import { conditionalRenderingDateTime } from './FormConditionalRendering/conditionalRenderingDateTime'
import { conditionalRenderingDescription } from './FormConditionalRendering/conditionalRenderingDescription'
import { conditionalRenderingCategory } from './FormConditionalRendering/conditionalRenderingCategory'
import { conditionalRenderingName } from './FormConditionalRendering/conditionalRenderingName'
import { ModalError } from '../../shared/hooks/ModalError'
import useModal from  '../../shared/hooks/use-modal'
import { handelParticipant } from './CRUD/conditionalRenderingSubescribe'
import { addHandler } from './CRUD/conditionalRenderingAdd'
import { conditionalRenderingUpdate } from './CRUD/conditionalRenderingUpdate'
import { conditionalRenderingDelete } from './CRUD/conditionalRenderingDelete'




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


	const errorModal = useModal()

	const [description, setDescription] = useState('')
	const [statusTask, setStatusTask] = useState('')
	const [remarkTask, setRemarkTask] = useState('')
	const [names, setNames] = useState('')
	const [error, setError] = useState('')

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

	// ---------CatégoriesEventable-----------
	const [selectedCategory, setSelectedCategory] = useState(type === 'Add' ? 'event' : categories)
	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value)
	}
	// ---------CatégoriesEventable-----------
	const [selectedEmployee, setSelectedEmployee] = useState("")
	const handleEmployeeChange = employee => {
		setSelectedEmployee(employee.target.value)
	}
	const [selectedStatus, setSelectedStatus] = useState("")
	const handelStatusChange = status => {
		setSelectedStatus(status.target.value)
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
	} = useGetContactByRoleCategoryQuery(selectedCategory === 'lesson' ? 'CLIENT' : 'EMPLOYEE');

	// _________ADD________
	const [addEvent, { isSuccess: isAddEventSuccess, isError: isAddEventError, error:eventError }] = useAddEventMutation()
	const [addCompetition, { isSuccess: isAddCompetitionSuccess , isError: isAddCompetitionError, error:competitionError}] = useAddCompetitionMutation()
	const [addLesson, { isSuccess: isAddLessonSuccess, isError: isAddLessonError, error:lessonError }] = useAddLessonMutation()
	const [addTask, { isSuccess: isAddTaskSuccess, isError: isAddTaskError, error:taskError}] = useAddTaskMutation()

	useEffect(() => {
		if (isAddEventSuccess || isAddTaskSuccess || isAddCompetitionSuccess || isAddLessonSuccess) {
			props.modal.closeHandler()
		}
	}, [isAddEventSuccess, isAddTaskSuccess, isAddCompetitionSuccess, isAddLessonSuccess, props])

	useEffect(()=> {
		if(isAddEventError){
			setError(eventError.data.message )
			errorModal.openHandler()
		}else if(isAddCompetitionError ){
			setError(competitionError.data.message )
			errorModal.openHandler()
		}else if(isAddLessonError){
			setError(competitionError.data.message )
			errorModal.openHandler()
		}else if(isAddTaskError){
			setError(competitionError.data.message )
			errorModal.openHandler()
		}	
		},[isAddEventError, isAddCompetitionError,isAddLessonError,isAddTaskError])
	
	
	// switch (day) {
	// 	case 1:
	// 	  dayName = "Lundi";
	// 	  break;
	// 	case 2:
	// 	  dayName = "Mardi";
	// 	  break;
	// 	case 3:
	// 	  dayName = "Mercredi";
	// 	  break;
	// 	case 4:
	// 	  dayName = "Jeudi";
	// 	  break;
	// 	case 5:
	// 	  dayName = "Vendredi";
	// 	  break;
	// 	case 6:
	// 	  dayName = "Samedi";
	// 	  break;
	// 	case 7:
	// 	  dayName = "Dimanche";
	// 	  break;
	// 	default:
	// 	  dayName = "Jour inconnu";
	//   }
	  
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
				<Button variant="secondary" disabled={!isFormValid || !isTimeValid()} onClick={() => addHandler(getContactByRoleCategoryData, selectedCategory, addEvent, addTask, addCompetition, addLesson, name.value, description, startDate, startTime, endDate, endTime, remarkTask, selectedEmployee)}>
					Ajouter
				</Button>
			)
		} else if (type === 'View') {
			return (
				<>
					{dateStart > currentDateTime.format('DD/MM/YYYY') ? (
						<Button variant="secondary" onClick={() => handelParticipant(id, category, subscribeEvent, subscribeTask, subscribeCompetition)}>
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
				{dateStart > currentDateTime.format('DD/MM/YYYY') ? (
					<Button
						variant="secondary"
						disabled={!isFormValid || !isTimeValid()}
						onClick={() => conditionalRenderingUpdate(props.participant,props.employee, props.client, updateEvent, updateCompetition,updateLesson, updateTask, description, descript, name.value, title, id, dateStart, hourStart, hourEnd, category, dateEnd, remarkTask, selectedStatus, status)}
						data-bs-dismiss="modal">
						Enregistrer
					</Button>
				):''
				}
					<Button variant="secondary" onClick={() => conditionalRenderingDelete(id, deleteEvent, deleteTask, deleteCompetition, deleteLesson, category)}>
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
						onClick={props.modal.closeHandler}
					></i>
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>

					{conditionalRenderingName(name, title, status, category, setNames, type, dateStart, hourStart, isAutor)}
					{conditionalRenderingCategory(categories, isValid, category, handleCategoryChange)}


					{conditionalRenderingDescription(dateStart, hourStart, type, descript, setDescription, descriptions, isAutor, category, setRemarkTask, remark, status)}

					{conditionalRenderingDateTime(dateStart, startDates, startTimes, endTimes, handleEndTimeChange, hourEnd, handleEndDateChange, endDates, dateEnd, isAutor, handleStartDateChange, setSelectedDate,
						hourStart, type, handleStartTimeChange, setSelectedTime)}

					{type !== 'Add' ? conditionalRenderingPeople(props.creator, props.participants, category, props.client, props.employee) : ''}

					{selectedCategory === 'lesson' || selectedCategory === 'task' ? conditionalRenderingSelected(selectedCategory, getContactByRoleCategoryData, selectedEmployee, handleEmployeeChange, isValid) : ''}

					{category === 'lesson' ? conditionalRenderingLessonStatus(status, handelStatusChange) : ''}

					{category === 'task' ? conditionalRenderingTaskStatus(props.creator.userId, props.employee.userId, type, status, handelStatusChange) : ''}

				</Form>
			</Modal.Body>
			<Modal.Footer>{conditionalRendering()}</Modal.Footer>
			{errorModal.isVisible && (
				<ModalError
					modal={errorModal}
					errorMessage={error}
				/>
			)}
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
