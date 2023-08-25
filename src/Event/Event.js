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

	const views = {
		month: true,
		agenda: true
	};

	const {
		data: eventables,
		isSuccess: isGetEventablesSuccess,
		isLoading: isGetEventableLoading,
		isError: isGetEventableError,
		error: getEventableError,
	} = useGetEventablesQuery()

	const uniqueCategoriesSet = new Set(eventables && eventables.map(eventable => eventable.eventable))
	const uniqueCategories = [...uniqueCategoriesSet]
	const [selectedCategory, setSelectedCategory] = useState('tous les évènements')

	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value)
	}

	const conditionalRenderingOnId = (id, eventable) => {
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

	const getFilteredEvents = category => {
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
	const conditionalColor = envent => {

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

	const conditionalRendering = () => {
		if (isGetEventableLoading) {
			return <BaseSpinner />
		} else if (isGetEventableError) {
			return <BaseErrorAlert message={getEventableError} />
		} else if (isGetEventablesSuccess) {
			const filteredEvents = getFilteredEvents(selectedCategory)
			const formattedEvents = filteredEvents && filteredEvents.map(eventable => ({
				category: eventable.eventable,
				title: eventable.name === undefined ? 'Cours' : eventable.name,
				id: eventable.id,
				start: new Date(eventable.startingAt).toString(),
				end: new Date(eventable.endingAt).toString(),
				creator: eventable.creator,
				...(eventable && eventable.eventable) === 'event' || (eventable.eventable === 'competition') ?

					{
						description: eventable.description,
						participants: eventable.participants

					}
					:
					eventable && eventable.eventable === 'task' ?
						{
							remark: eventable.remark,
							status: eventable.status,
							employee: eventable.employee,
							description: eventable.description,
							
						}
			
						:
						{
							status: eventable.status,
							client: eventable.client
						}

			}));

			const eventStyleGetter = (eventables, isSelected) => {
				const backgroundColor = conditionalColor(eventables.category); // Appel de la fonction pour obtenir la couleur

				return {
					style: {
						backgroundColor,
						borderRadius: '4px',
						opacity: isSelected ? 0.8 : 1,
						color: 'white',
						border: 'none',
					},
				};

			};
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
						views={views}
					/>

					{selectedEvent && (

						<>
							{selectedEvent.creator &&
								<>
									{conditionalRenderingOnId(selectedEvent.creator.userId, selectedEvent.category)}
								</>
							}
						</>
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
						setSelectedEvent(null)
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
						<option key={1} defaultValue="tous les évènements">
							tous les évènements
						</option>
						<option key={2} defaultValue="tous mes évènements">
							tous mes évènements
						</option>
						{uniqueCategories &&
							uniqueCategories.map((category, index) => (
								<option key={Number(index) + 2} defaultValue={category}>
									{category}
								</option>
							))}
					</Form.Select>
				</Form.Group>
			</Form>

			{createModal.isVisible && (
				<>
					<ModalGeneric
						modal={createModal}
						type="Add"
						isAutor={true}
						categories={uniqueCategories}
					/>
				</>
			)}
			{conditionalRendering()}
		</div>
	)
}
