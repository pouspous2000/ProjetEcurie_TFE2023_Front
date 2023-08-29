import { createSlice } from '@reduxjs/toolkit'
import { TokenUtils } from '../utils/TokenUtils'
import { roleCategories } from '../../constants/constants'

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState: TokenUtils.getTokensAndRoleCategory(),
	reducers: {
		setAuthentication(state, actions) {
			TokenUtils.setTokensAndRoleCategory(actions.payload)
			state.authentication = TokenUtils.getTokensAndRoleCategory()
		},
		logout(state) {
			const credentials = {
				token: '',
				refreshToken: '',
				roleCategory: roleCategories.CLIENT,
				// TODO ! change me
				userId: 1,
			}
			TokenUtils.setTokensAndRoleCategory(credentials)
			state.authentication = TokenUtils.getTokensAndRoleCategory()
		},
	},
})

export const authenticationActions = authenticationSlice.actions
export default authenticationSlice.reducer
