import { apiSlice } from '../shared/store/api-slice'

const tag = 'EVENTS'
const tag_eventable = 'EVENTABLES'
const EventApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		addEvent: builder.mutation({
			query: event => ({
				url: '/events',
				method: 'POST',
				body: event,
			}),
			invalidatesTags: [tag_eventable],
		}),
		getEvent: builder.query({
			query: event => `/events/${event.id}`,
			providesTags: [tag],
		}),
		updateEvent: builder.mutation({
			query: event => ({
				url: `/events/${event.id}`,
				method: 'PUT',
				body: event,
			}),
			invalidatesTags: [tag_eventable],
		}),
		deleteEvent: builder.mutation({
			query: ({ id }) => ({
				url: `/events/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag_eventable],
		}),
		subscribeEvent: builder.mutation({
			query: event => ({
				url: `/events/${event.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag_eventable],
		}),
	}),
})

export const { useSubscribeEventMutation, useAddEventMutation, useUpdateEventMutation, useDeleteEventMutation } =
	EventApi
