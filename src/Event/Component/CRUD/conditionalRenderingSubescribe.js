export const handelParticipant = (eventId, category,subscribeEvent,  subscribeTask, subscribeCompetition)  => {
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

export default {
    handelParticipant
}