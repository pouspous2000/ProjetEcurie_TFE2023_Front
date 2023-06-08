import { useSelector, useDispatch } from 'react-redux'
import { roleActions } from './role-slice'

import { Form } from 'react-bootstrap'

export const RoleSelect = () => {
	const dispatch = useDispatch()
	const roles = useSelector(state => state.role.roles)

	const changeRoleHandler = (newRole = 'ADMIN') => {
		dispatch(roleActions.setRole(newRole))
	}

	return (
		<Form.Select onChange={event => changeRoleHandler(event.target.value)}>
			{roles.map(role => (
				<option value={role} key={role}>
					{role}
				</option>
			))}
		</Form.Select>
	)
}
