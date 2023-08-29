import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
// TODO ad
// import {useSelector} from 'react-redux'
import { Nav } from 'react-bootstrap'
import { Navigation } from '../../../navigation/Navigation'
import classes from './Navtopbar.module.css'
// TODO rm
import { roleCategories } from '../../../constants/constants'
// pour chaque useSelector SAUF PageLogin

export const Navtopbar = () => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	// TODO rm
	const role = roleCategories.ADMIN
	// TODO ad
	// const role = useSelector(state => state.authentication.roleCategory)

	const [menus, setMenus] = useState([])
	const [activeMenu, setActiveMenu] = useState(undefined)
	const [currentUrl, setCurrentUrl] = useState('')

	useEffect(() => {
		if (currentUrl !== location.pathname) {
			setCurrentUrl(location.pathname)
			if (role) {
				setMenus(Navigation.getMenusForRole(role))
				setActiveMenu(Navigation.getActiveMenu(location.pathname, role))
			}
		}
	}, [location.pathname, currentUrl, role])

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
