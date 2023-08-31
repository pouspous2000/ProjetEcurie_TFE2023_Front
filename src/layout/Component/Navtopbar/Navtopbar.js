import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Nav } from 'react-bootstrap'
import { Navigation } from '../../../navigation/Navigation'
import classes from './Navtopbar.module.css'

export const Navtopbar = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	const role = useSelector(state => state.authentication.roleCategory)

	const [menus, setMenus] = useState([])
	const [activeMenu, setActiveMenu] = useState(undefined)
	const [currentUrl, setCurrentUrl] = useState('')
	const [currentRole, setCurrentRole] = useState(undefined)

	useEffect(() => {
		let hasChangedRole = false
		if (currentRole !== role) {
			setCurrentRole(role)
			hasChangedRole = true
		}

		if (currentUrl !== location.pathname || hasChangedRole) {
			setCurrentUrl(location.pathname)
			if (role) {
				setMenus(Navigation.getMenusForRole(role))
				setActiveMenu(Navigation.getActiveMenu(location.pathname, role))
			}
		}
	}, [location.pathname, currentUrl, role, currentRole, setCurrentRole])

	const changeMenuHandler = menuName => {
		if (menuName !== activeMenu?.name && role) {
			navigate(Navigation.getDefaultSubMenuByMenuName(menuName, role).url)
		}
	}

	const conditionalRendering = () => {
		if (role) {
			return menus.map((menu, index) => (
				<Nav.Item key={index} className={classes.icon}>
					<div
						onClick={() => changeMenuHandler(menu.name)}
						className={`${classes.icon} ${menu.name === activeMenu?.name ? classes.active : ''}`}
						title={t(menu.message)}>
						<i className={menu.icon}></i>
					</div>
				</Nav.Item>
			))
		}
		return null
	}

	return <Nav className={`justify-content-center grid text-center ${classes.navbar}`}>{conditionalRendering()}</Nav>
}
