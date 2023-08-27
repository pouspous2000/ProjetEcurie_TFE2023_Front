import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({
		baseUrl: 'http://172.31.36.83:3003',
		prepareHeaders: (headers, { getState }) => {
			headers.set('authorization', `Bearer token`)
		},
	}),
	endpoints: () => ({}),
})
