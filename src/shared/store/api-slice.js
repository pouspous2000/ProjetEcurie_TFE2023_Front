import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://34.228.210.132:3003',
		prepareHeaders: (headers, { getState }) => {
			headers.set('authorization', `Bearer token`)
		},
	}),
	endpoints: () => ({}),
})
