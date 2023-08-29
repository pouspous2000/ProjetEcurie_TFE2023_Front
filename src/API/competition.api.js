import { apiSlice } from '../shared/store/api-slice'

const tag = 'COMPETITIONS'
const tag_eventable = 'EVENTABLES'

const CompetitionApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		addCompetition: builder.mutation({
			query: competition => ({
				url: '/competitions',
				method: 'POST',
				body: competition,
			}),
			invalidatesTags: [tag_eventable],
		}),
		getCompetition: builder.query({
			query: competition => `/competitions/${competition.id}`,
			providesTags: [tag],
		}),
		updateCompetition: builder.mutation({
			query: competition => ({
				url: `/competitions/${competition.id}`,
				method: 'PUT',
				body: competition,
			}),
			invalidatesTags: [tag_eventable],
		}),
		deleteCompetition: builder.mutation({
			query: ({ id }) => ({
				url: `/competitions/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag_eventable],
		}),
		subscribeCompetition: builder.mutation({
			query: competition => ({
				url: `/competitions/${competition.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag_eventable],
		}),
	}),
})

export const {
	useSubscribeCompetitionMutation,
	useAddCompetitionMutation,
	useUpdateCompetitionMutation,
	useDeleteCompetitionMutation,
} = CompetitionApi
