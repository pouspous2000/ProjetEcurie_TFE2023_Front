export const  conditionalRenderingDelete = (eventId, deleteEvent, deleteTask, deleteCompetition, deleteLesson, category) => {

	console.log(typeof(eventId), category)
		if (category === 'event')
			deleteEvent({
				id: eventId,
			})
		else if (category === 'task') {
			deleteTask({
				id: eventId,
			})
		} else if (category === 'competition') {
			console.log(eventId, category)
			deleteCompetition({
				id: eventId,
			})
		} else if (category === 'lesson') {
			deleteLesson({
				id: eventId,
			})
		}
}