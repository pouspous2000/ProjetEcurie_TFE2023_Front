import { apiSlice } from '../shared/store/api-slice'

const tag = 'ADDITIVES'
const tag_eventable = 'EVENTABLES'
const additiveApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getAdditives: builder.query({
			query: () => '/additives',
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: [tag],
		}),
		addAdditive: builder.mutation({
			query: additive => ({
				url: '/additives',
				method: 'POST',
				body: additive,
			}),
			invalidatesTags: [tag_eventable],
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
			invalidatesTags: [tag_eventable],
		}),
		deleteAdditive: builder.mutation({
			query: ({ id }) => ({
				url: `/additives/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag_eventable],
		}),
	}),
})

export const { useGetAdditivesQuery, useAddAdditiveMutation, useUpdateAdditiveMutation, useDeleteAdditiveMutation } =
	additiveApi
