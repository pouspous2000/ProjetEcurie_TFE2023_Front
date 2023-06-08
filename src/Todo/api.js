import { apiSlice } from '../shared/store/api-slice'

const tag = 'TODOS'

const todoApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getTodos: builder.query({
			query: () => '/todos',
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: [tag],
		}),
		addTodo: builder.mutation({
			query: todo => ({
				url: '/todos',
				method: 'POST',
				body: todo,
			}),
			invalidatesTags: [tag],
		}),
		updateTodo: builder.mutation({
			query: todo => ({
				url: `/todos/${todo.id}`,
				method: 'PATCH',
				body: todo,
			}),
			invalidatesTags: [tag],
		}),
		deleteTodo: builder.mutation({
			query: ({ id }) => ({
				url: `/todos/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const { useGetTodosQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi
