import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'moment/locale/fr'
import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { ModalGeneric } from './Component/ModalGeneric'
import useModal from '../shared/hooks/use-modal'
import { useGetEventablesQuery } from '../API/eventable.api'

moment.locale('fr')
const localizer = momentLocalizer(moment)

export const Event = () => {
	const [selectedEvent, setSelectedEvent] = useState(null)

	const createModal = useModal()

	const handleEventClick = event => {
		setSelectedEvent(event)
		createModal.openHandler()
	}

	const {
		data: eventables,
		isSuccess: isGetEventablesSuccess,
		isLoading: isGetEventableLoading,
		isError: isGetEventableError,
		error: getEventableError,
	} = useGetEventablesQuery()

	const uniqueCategoriesSet = new Set(eventables && eventables.map(eventable => eventable.eventable))
	const uniqueCategories = [...uniqueCategoriesSet]
	const [selectedCategory, setSelectedCategory] = useState('All')

	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value)
	}

	const conditionalRenderingOnId = id => {
		if (id !== 1) {
			return (
				<>
					{createModal.isVisible && (
						<>
							<ModalGeneric
								status="View"
								id={selectedEvent.id}
								categories={uniqueCategories}
								category={selectedEvent.eventable}
								autor={false}
								start={selectedEvent.start}
								creator={selectedEvent.creator}
								title={selectedEvent.title}
								participant={selectedEvent.participants}
								descript={selectedEvent.description}
								dateStart={moment(selectedEvent.start).format('DD/MM/YYYY')}
								dateEnd={moment(selectedEvent.end).format('DD/MM/YYYY')}
								hourStart={moment(selectedEvent.start).format('HH:mm')}
								hourEnd={moment(selectedEvent.end).format('HH:mm')}
								modal={createModal}
							/>
						</>
					)}
				</>
			)
		} else if (id === 1) {
			return (
				<>
					{createModal.isVisible && (
						<ModalGeneric
							status="AutorView"
							id={selectedEvent.id}
							categories={uniqueCategories}
							category={selectedEvent.eventable}
							autor={true}
							start={selectedEvent.start}
							creator={selectedEvent.creator}
							title={selectedEvent.title}
							participant={selectedEvent.participants}
							descript={selectedEvent.description}
							dateStart={moment(selectedEvent.start).format('DD/MM/YYYY')}
							dateEnd={moment(selectedEvent.end).format('DD/MM/YYYY')}
							hourStart={moment(selectedEvent.start).format('HH:mm')}
							hourEnd={moment(selectedEvent.end).format('HH:mm')}
							modal={createModal}
						/>
					)}
				</>
			)
		}
	}

	const getFilteredEvents = category => {
		return (
			eventables &&
			eventables.filter(eventable => {
				if (category === 'All') {
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
				}
				return false
			})
		)
	}

	const conditionalRendering = () => {
		if (isGetEventableLoading) {
			return <BaseSpinner />
		} else if (isGetEventableError) {
			return <BaseErrorAlert message={getEventableError} />
		} else if (isGetEventablesSuccess) {
			const filteredEvents = getFilteredEvents(selectedCategory)
			const formattedEvents = filteredEvents.map(eventable => ({
				title: eventable.name,
				id: eventable.id,
				start: new Date(eventable.startingAt),
				end: new Date(eventable.endingAt),
				description: eventable.description,
				creator: eventable.creator,
				participants: eventable.participants,
			}))

			const eventStyleGetter = (eventable, isSelected) => {
				const backgroundColor = eventable.color || '#271503' // Couleur par défaut si aucune couleur n'est spécifiée pour l'événement

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

					{selectedEvent && (
						<>{selectedEvent.creator && <>{conditionalRenderingOnId(selectedEvent.creator.userId)}</>}</>
					)}
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
				Évènements
				<button
					onClick={() => {
						createModal.openHandler()
					}}
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
			<Form>
				<Form.Group className="mb-3">
					<Form.Label> Filtre Catégories </Form.Label>
					<Form.Select defaultValue={selectedCategory} onChange={handleCategoryChange} className="mr-3 ml-3">
						<option key={1} defaultValue="All">
							All
						</option>
						{uniqueCategories &&
							uniqueCategories.map((category, index) => (
								<option key={Number(index) + 1} defaultValue={category}>
									{category}
								</option>
							))}
					</Form.Select>
				</Form.Group>
			</Form>

			{createModal.isVisible && (
				<>
					<ModalGeneric modal={createModal} status="Add" isAutor={true} categories={uniqueCategories} />
					console.log(uniqueCategories)
				</>
			)}
			{conditionalRendering()}
		</div>
	)
}
