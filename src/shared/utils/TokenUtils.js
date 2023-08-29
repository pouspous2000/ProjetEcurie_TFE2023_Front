import { roleCategories } from '../../constants/constants'

export class TokenUtils {
	static setTokensAndRoleCategory(payload) {
		// {token : 'string', refreshToken: 'string', roleCategory: 'string'}
		localStorage.setItem('token', payload.token)
		localStorage.setItem('refreshToken', payload.refreshToken)
		localStorage.setItem('roleCategory', payload.roleCategory)
		localStorage.setItem('userId', payload.userId)
	}

	static getTokensAndRoleCategory() {
		return {
			token: localStorage.getItem('token'),
			refreshToken: localStorage.getItem('refreshToken'),
			// TODO add
			// roleCategory: localStorage.getItem('roleCategory') ? localStorage.getItem('roleCategory') : roleCategories.CLIENT
			//TODO rm
			roleCategory: roleCategories.ADMIN,
			// TODO ! hardcode change me
			userId: 1,
		}
	}
}
