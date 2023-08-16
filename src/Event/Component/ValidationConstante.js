import moment from 'moment'
import { StableValidationError } from '../../shared/Model'

const currentDateTime = moment()

export const validateName = value => {
	const trimmedValue = value.trim()
	if (trimmedValue.length === 0 || trimmedValue.length > 255) {
		throw new StableValidationError("Le nom de l'évènement doit contenir entre 1 et 255 caractères ")
	}
}

export const validateDescription = value => {
	const trimmedValue = value.trim()
	if (trimmedValue.length === 0 || trimmedValue.length < 1) {
		throw new StableValidationError("La description de l'évènement doit contenir au moins 1 caractères.")
	}
}

export const validateStartDates = startDate => {
	if (startDate === '' || moment(startDate).isBefore(currentDateTime, 'day')) {
		throw new StableValidationError("L'évènement ne peut pas commencer dans le passé.")
	}
}

export const validateStartTimes = (startTime, startDate) => {
	if (
		startDate === '' ||
		(startDate === currentDateTime.format('YYYY-MM-DD') && moment(startTime, 'HH:mm').isBefore(currentDateTime))
	) {
		throw new StableValidationError("L'heure de début est déjà passé.")
	}
}

export const validateEndTimes = (endTime, endDate, startTime, startDate) => {
	if (
		endDate === '' ||
		(moment(startDate).isSame(endDate, 'day') && (endTime < startTime || endTime === startTime))
	) {
		throw new StableValidationError(
			"L'heure de fin de l'évènement ne peut pas avoir lieu avant qu'il n'ai commencé."
		)
	}
}

export const validateEndDates = (endDate, startDate) => {
	if (
		endDate === '' ||
		moment(endDate).isBefore(currentDateTime, 'day') ||
		moment(endDate, 'YYYY-MM-DD').isBefore(startDate, 'day')
	) {
		throw new StableValidationError("La fin de l'évènement ne peut pas avoir lieu avant qu'il n'ai commencé.")
	}
}

export default {
	validateName,
	validateDescription,
	validateStartDates,
	validateStartTimes,
	validateEndTimes,
	validateEndDates,
}
