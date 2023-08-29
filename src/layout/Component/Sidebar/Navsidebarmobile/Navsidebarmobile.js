import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
// import {useSelector} from 'react-redux'
import { roleCategories } from '../../../../constants/constants'
import { Offcanvas } from 'react-bootstrap'
import { Navigation } from '../../../../navigation/Navigation'
import classes from './Navsidebarmobile.module.css'

export const NavSideBarMobile = props => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	// TO DO add
	// const role = useSelector(state => state.authentication.roleCategory)
	// TO DO rm
	const role = roleCategories.ADMIN

	const [submenus, setSubmenus] = useState([])
	const [activeSubmenu, setActiveSubmenu] = useState(undefined)
	const [currentUrl, setCurrentUrl] = useState('')

	useEffect(() => {
		if (currentUrl !== location.pathname) {
			setCurrentUrl(location.pathname)
			if (role) {
				setSubmenus(Navigation.getSubMenusForRoleAndUrl(location.pathname, role))
				setActiveSubmenu(Navigation.getActiveSubMenu(location.pathname))
			}
		}
	}, [location.pathname, currentUrl, role])

	const changeSubmenuHandler = submenuUrl => {
		if (submenuUrl !== activeSubmenu.url && role) {
			navigate(submenuUrl)
		}
	}

	return (
		<Offcanvas show={props.isVisible} onHide={props.onHide} {...{ backdrop: true }}>
			<Offcanvas.Header closeButton>
				<Offcanvas.Title></Offcanvas.Title>
			</Offcanvas.Header>
			<Offcanvas.Body className={classes.sidebar}>
				<ul>
					{submenus.map((submenu, index) => (
						<li
							key={index}
							className={`nav-item border ${activeSubmenu.name === submenu.name ? classes.active : ''}`}
							onClick={() => changeSubmenuHandler(submenu.url)}>
							<span className={'nav-link'}>{t(submenu.message)}</span>
						</li>
					))}
				</ul>
			</Offcanvas.Body>
		</Offcanvas>
	)
}
