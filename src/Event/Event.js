import React, { useState, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { Modal, Button } from 'react-bootstrap'
import { useSubscribeEventMutation, useGetEventsQuery } from '../API/event.api'

import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'

import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'moment/locale/fr'
import { ModalAddEvent } from './Component/ModalAddEvent'
import useModal from '../shared/hooks/use-modal'

moment.locale('fr')
const localizer = momentLocalizer(moment)

export const Event = () => {
	const {
		data: events,
		isLoading: isEventsLoading,
		isSuccess: isEventsSuccess,
		isError: isEventsError,
		error: eventsError,
	} = useGetEventsQuery()
	const [
		subscribeEvent,
		{
			isLoading: isSubscribeEventLoading,
			isSuccess: isSubscribeEventSuccess,
			isError: isSubscribeEventError,
			error: subscribeEventError,
			data: subscribeEventData,
		},
	] = useSubscribeEventMutation()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const [selectedEvent, setSelectedEvent] = useState(null)

	useEffect(() => {
		if (isSubscribeEventSuccess) {
			setSelectedEvent({
				title: subscribeEventData.name,
				id: subscribeEventData.id,
				start: new Date(subscribeEventData.startingAt),
				end: new Date(subscribeEventData.endingAt),
				description: subscribeEventData.description,
				creator: subscribeEventData.creator,
				participants: subscribeEventData.participants,
			})
			console.log(subscribeEventData)
		}
	}, [isSubscribeEventSuccess, subscribeEventData])

	const handelParticipantEvent = event => {
		subscribeEvent({
			id: event,
		})
	}

	const handleEventClick = event => {
		setSelectedEvent(event)
		setIsModalOpen(true)
	}

	const handleModalClose = () => {
		setSelectedEvent(null)
		setIsModalOpen(false)
	}

	const customModalStyle = {
		overlay: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			zIndex: 9999,
		},
		content: {
			backgroundColor: '#fff',
			borderRadius: '5px',
			padding: '20px',
			opacity: 1,
			height: '50%',
			width: '50%',
			margin: 'auto',
		},
	}
	const createModal = useModal()
	// const updateModal = useModal(
	// 	false,
	// 	additive => {
	// 		setUpdateAdditive(additive)
	// 	},
	// 	() => {
	// 		setUpdateAdditive(undefined)
	// 	}
	// )
	// const deleteModal = useModal(
	// 	false,
	// 	additive => {
	// 		setDeleteAdditive(additive)
	// 	},
	// 	() => {
	// 		setDeleteAdditive(undefined)
	// 	}
	// )

	const conditionalRendering = () => {
		if (isEventsLoading) {
			return <BaseSpinner />
		} else if (isEventsError) {
			return <BaseErrorAlert message={eventsError} />
		} else if (isEventsSuccess) {
			const formattedEvents = events.map(event => ({
				title: event.name,
				id: event.id,
				start: new Date(event.startingAt),
				end: new Date(event.endingAt),
				description: event.description,
				creator: event.creator,
				participants: event.participants,
			}))

			const eventStyleGetter = (event, start, end, isSelected) => {
				const backgroundColor = event.color || '#271503' // Couleur par défaut si aucun couleur n'est spécifiée pour l'événement

				return {
					style: {
						backgroundColor,
						borderRadius: '4px',
						opacity: isSelected ? 0.8 : 1,
						color: 'white',
						border: 'none',
					},
				}
			}

			return (
				<div>
					<Calendar
						localizer={localizer}
						events={formattedEvents}
						startAccessor="start"
						endAccessor="end"
						selectable
						style={{ height: '100vh' }}
						onSelectEvent={handleEventClick}
						eventPropGetter={eventStyleGetter}
					/>
					<Modal show={isModalOpen} onHide={handleModalClose}>
						<Modal.Header closeButton>
							<Modal.Title>{selectedEvent && selectedEvent.title}</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							{selectedEvent && (
								<div key={selectedEvent.id}>
									<h5> Description</h5>
									<p>{selectedEvent.description}</p>
									<h5>Début :</h5>
									<p> {selectedEvent.start.toLocaleString()}</p>
									<h5>Fin :</h5>
									<p> {selectedEvent.end.toLocaleString()}</p>
									{selectedEvent.creator && (
										<div key={selectedEvent.creator.userId}>
											<h5>Créateur:</h5>
											<p>
												{' '}
												{selectedEvent.creator.firstName} {selectedEvent.creator.lastName}
											</p>
										</div>
									)}
									<h5>Participants:</h5>
									{selectedEvent.participants &&
										selectedEvent.participants.map(participant => (
											<div key={participant.userId}>
												<p>
													- {participant.firstName} {participant.lastName}
												</p>
											</div>
										))}
								</div>
							)}
						</Modal.Body>
						<Modal.Footer>
							{selectedEvent && selectedEvent.start > new Date() ? (
								<Button
									variant="secondary"
									onClick={() => handelParticipantEvent(selectedEvent && selectedEvent.id)}>
									{/* TODO : userId hardcodé !  */}
									{selectedEvent &&
									selectedEvent.participants.find(participant => participant.userId === 1)
										? 'Desinscrire'
										: 'Participer'}
								</Button>
							) : (
								''
							)}
							<Button variant="secondary" onClick={handleModalClose}>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				</div>
			)
		}
	}

	return (
		<div>
			<h2 style={{ width: 'fit-content', marginLeft: '3rem', fontSize: '30px', color: '#CD853F' }}>
				Configurations
			</h2>

			<h3 style={{ margin: '35px' }}>
				Evènements
				<button
					onClick={createModal.openHandler}
					title="Ajouter un additif"
					type="button"
					className="btn"
					style={{
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						width: 'fit-content',
						fontSize: '2rem',
						marginRight: '5rem',
					}}>
					<i className="bi bi-plus-circle" />
				</button>
			</h3>

			{createModal.isVisible && <ModalAddEvent modal={createModal} />}

			{/* {updateModal.isVisible && <AdditiveUpdate additive={updateAdditive} modal={updateModal} />} */}

			{/* {deleteModal.isVisible && <AdditiveDelete additive={deleteAdditive} modal={deleteModal} />} */}

			{conditionalRendering()}
		</div>
	)
}
