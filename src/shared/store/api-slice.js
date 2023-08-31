import { store } from './store'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { authenticationActions } from './authentication-slice'
import { baseUrl } from '../../constants/baseUrl'

const customBaseQuery = fetchBaseQuery({
	baseUrl: baseUrl,
	prepareHeaders: (headers, { getState }) => {
		const authenticationState = getState().authentication
		headers.set('authorization', `Bearer ${authenticationState.token ? authenticationState.token : 'invalidToken'}`)
		headers.set(
			'refreshtoken',
			authenticationState.refreshToken ? authenticationState.refreshToken : 'invalidRefreshToken'
		)
	},
})

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: async (args, api, extraOptions) => {
		const response = await customBaseQuery(args, api, extraOptions)

		let { token, refreshToken, roleCategory } = store.getState().authentication

		if (response && response.meta && response.meta.response && response.meta.response.headers) {
			token = response.meta.response.headers.get('Token')
			refreshToken = response.meta.response.headers.get('RefreshToken')
			roleCategory = response.meta.response.headers.get('RoleCategory')
		}

		store.dispatch(
			authenticationActions.setAuthentication({
				token: token,
				refreshToken: refreshToken,
				roleCategory: roleCategory,
			})
		)

		if (
			response.error &&
			response.error.status &&
			response.error.status === 401 &&
			response.error.data &&
			response.error.data.message &&
			response.error.data.message === 'authentication_notAuthenticated'
		) {
			window.location.href = '/authentication'
		}
		if (response.error && response.error && response.error.status && response.error.status === 'FETCH_ERROR') {
			window.location.href = '/error'
		}
		return response
	},
	endpoints: () => ({}),
})
