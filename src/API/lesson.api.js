import { apiSlice } from '../shared/store/api-slice'

const tag = 'LESSON'

const LessonApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getLessons: builder.query({
			query: () => '/lessons',
			providesTags: [tag],
		}),
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
		deleteLesson: builder.mutation({
			query: ({ id }) => ({
				url: `/lessons/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const { useGetLessonsQuery, useAddLessonMutation, useUpdateLessonMutation, useDeleteLessonMutation } = LessonApi
