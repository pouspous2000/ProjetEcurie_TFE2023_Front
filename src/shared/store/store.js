import { configureStore } from '@reduxjs/toolkit'
import { apiSlice } from './api-slice'
import roleReducer from '../roles/role-slice'

export const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer,
		role: roleReducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware),
})
