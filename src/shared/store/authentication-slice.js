import { createSlice } from '@reduxjs/toolkit'
import { TokenUtils } from '../utils/TokenUtils'
import { roleCategories } from '../../constants/constants'

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: TokenUtils.getTokensAndRoleCategory(),
	reducers: {
		setAuthentication(state, actions) {
			const { token, refreshToken, roleCategory } = TokenUtils.setTokensAndRoleCategory({ ...actions.payload })
			state.token = token
			state.refreshToken = refreshToken
			state.roleCategory = roleCategory
		},
		logout(state) {
			const credentials = {
				token: '',
				refreshToken: '',
				roleCategory: roleCategories.CLIENT,
			}
			const { token, refreshToken, roleCategory } = TokenUtils.setTokensAndRoleCategory(credentials)
			state.token = token
			state.refreshToken = refreshToken
			state.roleCategory = roleCategory
		},
	},
})

export const authenticationActions = authenticationSlice.actions
export default authenticationSlice.reducer
