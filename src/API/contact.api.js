import { apiSlice } from '../shared/store/api-slice'

const tags = ['CONTACTS', 'CONTACTS_BY_ROLE', 'CONTACTS_BY_ROLE_CATEGORY']
const routePrefix = 'contacts'

const contactApi = apiSlice.injectEndpoints({
	addTagTypes: tags,
	endpoints: builder => ({
		getContacts: builder.query({
			query: () => `/${routePrefix}`,
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: ['CONTACTS']
		}),
		getContactByRole: builder.query({
			query: roleId => ({
				url: `/${routePrefix}/by-role/${roleId}`,
				method: 'GET'
			}),
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: ['CONTACTS_BY_ROLE']
		}),
		getContactByRoleCategory:  builder.query({
			query: roleCategory => ({
				url: `/${routePrefix}/by-role-category/${roleCategory}`,
				method: 'GET'
			}),
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: ['CONTACTS_BY_ROLE_CATEGORY']
		}),
		addContact: builder.mutation({
			query: contact => ({
				url: `/${routePrefix}`,
				method: 'POST',
				body: contact
			}),
			invalidatesTags: tags
		}),
		getContact: builder.mutation({
			query: contact => `/${routePrefix}/${contact.id}`
		}),
		updateContact: builder.mutation({
			query: contact => ({
				url: `/${routePrefix}/${contact.id}`,
				method: 'PUT',
				body: contact
			}),
			invalidatesTags: tags
		}),
		deleteContact: builder.mutation({
			query: contact => ({
				url: `/${routePrefix}/${contact.id}`,
				method: 'DELETE',
			}),
			invalidatesTags: tags
		})
	})
})

export const {
	useGetContactsQuery,
	useGetContactByRole,
	useGetContactByRoleCategoryQuery,
	useGetContactQuery,
	useAddContactMutation,
	useUpdateContactMutation,
	useDeleteContactMutation
} = contactApi

