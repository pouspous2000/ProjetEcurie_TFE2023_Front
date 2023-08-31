import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Offcanvas } from 'react-bootstrap'
import { Navigation } from '../../../../navigation/Navigation'
import classes from './Navsidebarmobile.module.css'

export const NavSideBarMobile = props => {
	const { t } = useTranslation()
	const location = useLocation()
	const navigate = useNavigate()
	const role = useSelector(state => state.authentication.roleCategory)
	const [submenus, setSubmenus] = useState([])
	const [activeSubmenu, setActiveSubmenu] = useState(undefined)
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
				setSubmenus(Navigation.getSubMenusForRoleAndUrl(location.pathname, role))
				setActiveSubmenu(Navigation.getActiveSubMenu(location.pathname))
			}
		}
	}, [location.pathname, currentUrl, role, currentRole, setCurrentRole])

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
