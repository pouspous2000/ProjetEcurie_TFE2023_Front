import { apiSlice } from '../shared/store/api-slice'

const tag = 'COMPETITIONS'

const CompetitionApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getCompetitions: builder.query({
			query: () => '/comptitions',
			providesTags: [tag],
		}),
		addCompetition: builder.mutation({
			query: competition => ({
				url: '/comptitions',
				method: 'POST',
				body: competition,
			}),
			invalidatesTags: [tag],
		}),
		getCompetition: builder.query({
			query: competition => `/comptitions/${competition.id}`,
			providesTags: [tag],
		}),
		updateCompetition: builder.mutation({
			query: competition => ({
				url: `/comptitions/${competition.id}`,
				method: 'PUT',
				body: competition,
			}),
			invalidatesTags: [tag],
		}),
		deleteCompetition: builder.mutation({
			query: ({ id }) => ({
				url: `/comptitions/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
		subscribeComptition: builder.mutation({
			query: competition => ({
				url: `/comptitions/${competition.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const {
	useGetCompetitionsQuery,
	useSubscribeCompetitionMutation,
	useAddCompetitionMutation,
	useUpdateCompetitionMutation,
	useDeleteCompetitionMutation,
} = CompetitionApi
