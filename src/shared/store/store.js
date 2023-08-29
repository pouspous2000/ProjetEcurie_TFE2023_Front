import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api-slice'
import authenticationReducer from './authentication-slice'

export const store = configureStore({
	reducer: {
		authentication: authenticationReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
