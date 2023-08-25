import { ModalGeneric } from "./Component/ModalGeneric"
import moment from 'moment'

export const getFilteredEvents = (category,eventables) => {

    return (
        eventables &&
        eventables.filter(eventable => {
            if (category === 'tous les évènements') {
                return (
                    eventable.eventable === 'event' ||
                    eventable.eventable === 'competition' ||
                    (eventable.eventable === 'lesson' &&
                        (eventable.creator.userId === 1 ||
                            (eventable.participants &&
                                eventable.participants.some(participant => participant.userId === 1)))) ||
                    (eventable.eventable === 'task' &&
                        (eventable.creator.userId === 1 || eventable.employee.userId === 1))
                )
            } else if (category === 'event') {
                return eventable.eventable === 'event'
            } else if (category === 'competition') {
                return eventable.eventable === 'competition'
            } else if (category === 'task') {
                return (
                    eventable.eventable === 'task' &&
                    (eventable.creator.userId === 1 || eventable.employee.userId === 1)
                )
            } else if (category === 'lesson') {
                return (
                    eventable.eventable === 'lesson' &&
                    (eventable.creator.userId === 1 ||
                        (eventable.participants &&
                            eventable.participants.some(participant => participant.userId === 1)))
                )
            } else if (category === 'tous mes évènements') {
                return (
                    eventable && eventable.creator.userId === 1
                )

            }
            return false
        })
    )
}

export const conditionalColor = envent => {

    if (envent === 'event') {
        return '#271503'
    } else if (envent === 'competition') {

        return '#900C3F'
    } else if (envent === 'lesson') {

        return '#FF5733'
    } else if (envent === 'task') {

        return '#94D5DC'
    }
    return '#FFC300'

}

export 	const views = {
    month: true,
    agenda: true, 
};


export const conditionalRenderingOnId = (id, eventable, selectedEvent,  uniqueCategories, createModal) => {
    let modalContent = null
    if (eventable === 'event' || eventable === 'competition') {
        modalContent = (

            <ModalGeneric
                id={selectedEvent.id}
                title={selectedEvent.title}
                dateStart={moment(selectedEvent.start).format('DD/MM/YYYY')}
                dateEnd={moment(selectedEvent.end).format('DD/MM/YYYY')}
                hourStart={moment(selectedEvent.start).format('HH:mm')}
                hourEnd={moment(selectedEvent.end).format('HH:mm')}
                descript={selectedEvent.description}
                category={selectedEvent.category}
                isAutor={id === 1}
                type={id === 1 ? "AutorView" : "View"}
                categories={uniqueCategories}
                modal={createModal}
                participants={selectedEvent.participants}
                creator={selectedEvent.creator}
            />
        )

    } else if (eventable === 'lesson') {
        modalContent = (
            <ModalGeneric
                id={selectedEvent.id}
                title={selectedEvent.title}
                dateStart={moment(selectedEvent.start).format('DD/MM/YYYY')}
                dateEnd={moment(selectedEvent.end).format('DD/MM/YYYY')}
                hourStart={moment(selectedEvent.start).format('HH:mm')}
                hourEnd={moment(selectedEvent.end).format('HH:mm')}
                status={selectedEvent.status}
                category={selectedEvent.category}
                isAutor={id === 1}
                type={id === 1 ? "AutorView" : "View"}
                categories={uniqueCategories}
                modal={createModal}
                creator={selectedEvent.creator}
                client={selectedEvent.client}
            />
        )
    } else if (eventable === 'task') {
        modalContent = (
            <ModalGeneric
                id={selectedEvent.id}
                title={selectedEvent.title}
                dateStart={moment(selectedEvent.start).format('DD/MM/YYYY')}
                dateEnd={moment(selectedEvent.end).format('DD/MM/YYYY')}
                hourStart={moment(selectedEvent.start).format('HH:mm')}
                hourEnd={moment(selectedEvent.end).format('HH:mm')}
                status={selectedEvent.status}
                remark={selectedEvent.remak}
                category={selectedEvent.category}
                isAutor={id === 1}
                type={id === 1 ? "AutorView" : "View"}
                categories={uniqueCategories}
                modal={createModal}
                creator={selectedEvent.creator}
                employee={selectedEvent.employee}
                descript = {selectedEvent.description}
            />
        )
    }
    return createModal.isVisible ? <>{modalContent}</> : null;
}


export default {
    getFilteredEvents, 
    conditionalColor, 
    views, 
    conditionalRenderingOnId
}