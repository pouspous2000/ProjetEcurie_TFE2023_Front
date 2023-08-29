import { apiSlice } from '../shared/store/api-slice'

const tag = 'LESSONS'
const tag_eventable = 'EVENTABLES'
const LessonApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		addLesson: builder.mutation({
			query: lesson => ({
				url: '/lessons',
				method: 'POST',
				body: lesson,
			}),
			invalidatesTags: [tag_eventable],
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
			invalidatesTags: [tag_eventable],
		}),
		deleteLesson: builder.mutation({
			query: ({ id }) => ({
				url: `/lessons/${id}`,
				method: 'DELETE',
				body: id,
			}),
			invalidatesTags: [tag_eventable],
		}),
		subscribeLesson: builder.mutation({
			query: lesson => ({
				url: `/lessons/${lesson.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag_eventable],
		}),
	}),
})

export const { useSubscribeLessonMutation, useAddLessonMutation, useUpdateLessonMutation, useDeleteLessonMutation } =
	LessonApi
