import { apiSlice } from '../shared/store/api-slice'

const tag = 'EVENTABLES'

const eventApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getEventables: builder.query({
			query: () => '/eventables',
			providesTags: [tag],
		}),
	}),
	invalidatesTags: [tag],
})

export const { useGetEventablesQuery } = eventApi
