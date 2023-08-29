import { useDispatch } from 'react-redux'
// import {useSelector} from 'react-redux'
import { roleCategories } from '../../constants/constants'
import { roleActions } from './role-slice'

import { Form } from 'react-bootstrap'

export const RoleSelect = () => {
	const dispatch = useDispatch()
	// TO DO add
	// const roles = useSelector(state => state.role.roles)
	// TO DO rm
	const roles = roleCategories.ADMIN

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
