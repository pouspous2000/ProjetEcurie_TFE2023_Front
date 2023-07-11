import { apiSlice } from '../shared/store/api-slice'

const tag = 'PENSIONS'

const pensionApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getPensions: builder.query({
			query: () => '/pensions',
			providesTags: [tag],
		}),
		addPension: builder.mutation({
			query: pension => ({
				url: '/pensions',
				method: 'POST',
				body: pension,
			}),
			invalidatesTags: [tag],
		}),
		getPension: builder.query({
			query: pension => `/pensions/${pension.id}`,
			providesTags: [tag],
		}),
		updatePension: builder.mutation({
			query: pension => ({
				url: `/pensions/${pension.id}`,
				method: 'PATCH',
				body: pension,
			}),
			invalidatesTags: [tag],
		}),
		deletePension: builder.mutation({
			query: ({ id }) => ({
				url: `/pensions/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const { useGetPensionsQuery, useAddPensionMutation, useUpdatePensionMutation, useDeletePensionMutation } =
	pensionApi
