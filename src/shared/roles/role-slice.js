import { createSlice } from '@reduxjs/toolkit'

const roles = ['ADMIN', 'EMPLOYEE', 'CLIENT'] // this is a simple array which could lead to unwanted behaviors as it is not "readonly"

const roleSlice = createSlice({
	name: 'role',
	initialState: { role: 'CLIENT', roles: roles },
	reducers: {
		setRole(state, actions) {
			const newRole = actions.payload
			if (!roles.includes(newRole)) {
				throw new Error(`invalid role : ${newRole}`)
			}
			state.role = newRole
		},
	},
})

export const roleActions = roleSlice.actions
export default roleSlice.reducer
