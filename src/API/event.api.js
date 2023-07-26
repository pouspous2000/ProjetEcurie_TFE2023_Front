import { apiSlice } from '../shared/store/api-slice'

const tag = 'EVENTS'

const eventApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getEvents: builder.query({
			query: () => '/events',
			providesTags: [tag],
		}),
		addEvents: builder.mutation({
			query: event => ({
				url: '/events',
				method: 'POST',
				body: event,
			}),
			invalidatesTags: [tag],
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
			invalidatesTags: [tag],
		}),
		deleteEvent: builder.mutation({
			query: ({ id }) => ({
				url: `/events/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
		subscribeEvent: builder.mutation({
			query: event => ({
				url: `/events/${event.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const {
	useGetEventsQuery,
	useSubscribeEventMutation,
	useAddEventsMutation,
	useUpdateEventMutation,
	useDeleteEventMutation,
} = eventApi
