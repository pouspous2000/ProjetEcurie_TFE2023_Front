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
import { getFilteredEvents, conditionalColor, views, conditionalRenderingOnId } from '../Event/EventUtils'

import { useSelector } from 'react-redux'

moment.locale('fr')
const localizer = momentLocalizer(moment)

export const Event = () => {
	// const userId = useSelector(state => state.authentication.userId)

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
	const [selectedCategory, setSelectedCategory] = useState('tous les évènements')

	const handleCategoryChange = event => {
		setSelectedCategory(event.target.value)
	}

	const conditionalRendering = () => {
		if (isGetEventableLoading) {
			return <BaseSpinner />
		} else if (isGetEventableError) {
			return <BaseErrorAlert message={getEventableError} />
		} else if (isGetEventablesSuccess) {
			// TODO
			// const filteredEvents = getFilteredEvents( selectedCategory, eventables, id )
			const filteredEvents = getFilteredEvents(selectedCategory, eventables)

			const formattedEvents =
				filteredEvents &&
				filteredEvents.map(eventable => ({
					category: eventable.eventable,
					title: eventable.name === undefined ? 'Cours' : eventable.name,
					id: eventable.id,
					start: new Date(eventable.startingAt).toString(),
					end: new Date(eventable.endingAt).toString(),
					creator: eventable.creator,
					...((eventable && eventable.eventable) === 'event' || eventable.eventable === 'competition'
						? {
								description: eventable.description,
								participants: eventable.participants,
						  }
						: eventable && eventable.eventable === 'task'
						? {
								remark: eventable.remark,
								status: eventable.status,
								employee: eventable.employee,
								description: eventable.description,
						  }
						: {
								status: eventable.status,
								client: eventable.client,
						  }),
				}))

			const eventStyleGetter = (eventables, isSelected) => {
				const backgroundColor = conditionalColor(eventables.category)

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
						views={views}
					/>

					{selectedEvent && (
						<>
							{selectedEvent.creator && (
								<>
									{conditionalRenderingOnId(
										selectedEvent.creator.userId,
										selectedEvent.category,
										selectedEvent,
										uniqueCategories,
										createModal
									)}
								</>
							)}
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
					<ModalGeneric modal={createModal} type="Add" isAutor={true} categories={uniqueCategories} />
				</>
			)}
			{conditionalRendering()}
		</div>
	)
}
