import { apiSlice } from '../shared/store/api-slice'

const tag = 'HORSES'
const routePrefix = 'horses'

const horseApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getHorses: builder.query({
			query: () => `/${routePrefix}`,
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: [tag]
		}),
		addHorse: builder.mutation({
			query: horse => ({
				url: `/${routePrefix}`,
				method: 'POST',
				body: horse
			}),
			invalidatesTags: [tag]
		}),
		getHorse: builder.query({
			query: ({ id })  => ({
			url:`/${routePrefix}/${id}`,
			methode :'GET'
			})
		}),
		updateHorse: builder.mutation({
			query: horse => ({
				url: `/${routePrefix}/${horse.id}`,
				method: 'PUT',
				body: horse
			}),
			invalidatesTags: [tag]
		}),
		deleteHorse: builder.mutation({
			query: horse => ({
				url: `/${routePrefix}/${horse.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: [tag]
		})
	})
})

export const {
	useGetHorsesQuery,
	useGetHorseQuery,
	useAddHorseMutation,
	useUpdateHorseMutation,
	useDeleteHorseMutation
} = horseApi