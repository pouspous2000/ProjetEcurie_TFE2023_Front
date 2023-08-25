export const  conditionalRenderingDelete = (eventId, deleteEvent, deleteTask, deleteCompetition, deleteLesson, category) => {
		if (category === 'event')
			deleteEvent({
				id: eventId,
			})
		else if (category === 'task') {
			deleteTask({
				id: eventId,
			})
		} else if (category === 'competition') {
			deleteCompetition({
				id: eventId,
			})
		} else if (category === 'lesson') {
			deleteLesson({
				id: eventId,
			})
		}
}