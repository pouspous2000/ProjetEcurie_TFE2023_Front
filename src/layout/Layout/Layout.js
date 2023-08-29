import { Outlet, useLocation } from 'react-router-dom'
// import {useSelector} from 'react-redux'
import { roleCategories } from '../../constants/constants'
import { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Navtopbar } from '../Component/Navtopbar/Navtopbar'
import { NavSideBarDesktop } from '../Component/Sidebar/Navsidebardesktop/Navsidebardesktop'
import { NavSideBarMobile } from '../Component/Sidebar/Navsidebarmobile/Navsidebarmobile'
import { Navigation } from '../../navigation/Navigation'
import classes from './Layout.module.css'

export const Layout = () => {
	const location = useLocation()
	// TO DO add
	// const role = useSelector(state => state.authentication.roleCategory)
	// TO DO rm
	const role = roleCategories.ADMIN
	const [hasSubmenu, setHasSubmenu] = useState(false)
	const [currentUrl, setCurrentUrl] = useState('')

	useEffect(() => {
		if (currentUrl !== location.pathname) {
			setCurrentUrl(location.pathname)
		}
		if (role) {
			const submenus = Navigation.getSubMenusForRoleAndUrl(location.pathname, role)
			if (submenus && submenus.length && submenus.length > 1) {
				setHasSubmenu(true)
			} else {
				setHasSubmenu(false)
			}
		} else {
			setHasSubmenu(false)
		}
	}, [location.pathname, currentUrl, role])

	const [isMobileSideBarVisible, setIsMobileSideBarVisible] = useState(false)
	const showMobileSideBarHandler = () => {
		setIsMobileSideBarVisible(true)
	}
	const hideMobileSideBarHandler = () => {
		setIsMobileSideBarVisible(false)
	}

	return (
		<div>
			<Navtopbar />
			<Container fluid>
				<Row>
					{hasSubmenu && <NavSideBarDesktop />}
					{hasSubmenu && (
						<NavSideBarMobile isVisible={isMobileSideBarVisible} onHide={hideMobileSideBarHandler} />
					)}

					<Col xs={12} md={hasSubmenu ? 8 : 12} className="min-vh-100 position-relative">
						{hasSubmenu && (
							<button
								onClick={showMobileSideBarHandler}
								className={`d-block d-md-none ${classes.hamburger}`}>
								<i className="bi bi-list"></i>
							</button>
						)}

						<main>
							<Outlet />
						</main>
					</Col>
				</Row>
			</Container>
		</div>
	)
}
