import { apiSlice } from '../shared/store/api-slice'

const tag = 'COMPETITIONS'

const CompetitionApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		addCompetition: builder.mutation({
			query: competition => ({
				url: '/competitions',
				method: 'POST',
				body: competition,
			}),
			invalidatesTags: [tag],
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
			invalidatesTags: [tag],
		}),
		deleteCompetition: builder.mutation({
			query: ({ id }) => ({
				url: `/competitions/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
		subscribeCompetition: builder.mutation({
			query: competition => ({
				url: `/competitions/${competition.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const {
	useSubscribeCompetitionMutation,
	useAddCompetitionMutation,
	useUpdateCompetitionMutation,
	useDeleteCompetitionMutation,
} = CompetitionApi
