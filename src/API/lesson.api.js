import { apiSlice } from '../shared/store/api-slice'

const tag = 'LESSONS'

const LessonApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		addLesson: builder.mutation({
			query: lesson => ({
				url: '/lessons',
				method: 'POST',
				body: lesson,
			}),
			invalidatesTags: [tag],
		}),
		getLesson: builder.query({
			query: lesson => `/lessons/${lesson.id}`,
			providesTags: [tag],
		}),
		updateLesson: builder.mutation({
			query: lesson => ({
				url: `/lessons/${lesson.id}`,
				method: 'PUT',
				body: lesson,
			}),
			invalidatesTags: [tag],
		}),
		deleteLesson: builder.mutation({
			query: ({ id }) => ({
				url: `/lessons/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
		subscribeLesson: builder.mutation({
			query: lesson => ({
				url: `/lessons/${lesson.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const { useSubscribeLessonMutation, useAddLessonMutation, useUpdateLessonMutation, useDeleteLessonMutation } =
	LessonApi
