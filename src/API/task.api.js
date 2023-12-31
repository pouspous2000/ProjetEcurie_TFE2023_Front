import { apiSlice } from '../shared/store/api-slice'

const tag = 'TASKS'

const TaskApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		addTask: builder.mutation({
			query: task => ({
				url: '/tasks',
				method: 'POST',
				body: task,
			}),
			invalidatesTags: [tag],
		}),
		getTask: builder.query({
			query: task => `/tasks/${task.id}`,
			providesTags: [tag],
		}),
		updateTask: builder.mutation({
			query: task => ({
				url: `/tasks/${task.id}`,
				method: 'PUT',
				body: task,
			}),
			invalidatesTags: [tag],
		}),
		deleteTask: builder.mutation({
			query: ({ id }) => ({
				url: `/tasks/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
		subscribeTask: builder.mutation({
			query: task => ({
				url: `/tasks/${task.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const { useSubscribeTaskMutation, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = TaskApi
