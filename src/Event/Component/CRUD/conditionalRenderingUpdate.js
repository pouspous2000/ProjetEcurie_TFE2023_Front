import moment from 'moment'

export const conditionalRenderingUpdate = (participant, employee, client, updateEvent, updateCompetition,updateLesson, updateTask, description, descript, name, title, id, dateStart, hourStart, hourEnd, category, dateEnd, remarkTask, selectedStatus, status) => {
		if (category === 'event') {
			updateEvent({
				id: id,
				name: name === '' ? title : name,
				description: description === '' ? descript : description,
				startingAt: `${moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourStart,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				endingAt: `${moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourEnd,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				participants: participant,
			});
		} else if (category === 'task') {
			updateTask({
				creatorId: 1,
				id: id,
				name: name === '' ? title : name,
				description: description === '' ? descript : description,
				startingAt: `${moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourStart,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				endingAt: `${moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourEnd,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				participants: [],
				employeeId: employee.userId,
				remark: remarkTask,
				status: selectedStatus === "" ? status : selectedStatus
			});
		} else if (category === 'competition') {
			updateCompetition({
				id: id,
				name: name === '' ? title : name,
				description: description === '' ? descript : description,
				startingAt: `${moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourStart,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				endingAt: `${moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourEnd,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				participants: participant,
			});
		} else if (category === 'lesson') {
			updateLesson({
				id: id,
				clientId: client.userId,
				startingAt: `${moment(dateStart, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourStart,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				endingAt: `${moment(dateEnd, 'DD/MM/YYYY').format('YYYY-MM-DD')}T${moment(
					hourEnd,
					'HH:mm'
				).format('HH:mm:ss')}.000Z`,
				status: selectedStatus === "" ? status : selectedStatus
			});
		}
}