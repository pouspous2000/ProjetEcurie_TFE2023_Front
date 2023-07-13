import { apiSlice } from '../shared/store/api-slice'

const tag = 'ADDITIVES'
const additiveApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getAdditives: builder.query({
			query: () => '/additives',
			providesTags: [tag],
		}),
		addAdditive: builder.mutation({
			query: additive => ({
				url: '/additives',
				method: 'POST',
				body: additive,
			}),
			invalidatesTags: [tag],
		}),
		getAdditive: builder.query({
			query: additive => `/additives/${additive.id}`,
			providesTags: [tag],
		}),
		updateAdditive: builder.mutation({
			query: additive => ({
				url: `/additives/${additive.id}`,
				method: 'PUT',
				body: additive,
			}),
			invalidatesTags: [tag],
		}),
		deleteAdditive: builder.mutation({
			query: ({ id }) => ({
				url: `/additives/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const { useGetAdditivesQuery, useAddAdditiveMutation, useUpdateAdditiveMutation, useDeleteAdditiveMutation } =
	additiveApi
