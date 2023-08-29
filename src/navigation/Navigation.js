import { roleCategories } from '../constants/constants'

class SubMenu {
	static submenus = []

	constructor(role, name, message, component) {
		this.role = role
		this.name = name
		this.message = message
		this.component = component
		this.url = `/${this.name}`
		SubMenu.submenus.push(this)
	}
}

class Menu {
	constructor(name, message, roles, icon, submenus) {
		this.name = name
		this.message = message
		this.roles = roles
		this.icon = icon
		this.submenus = submenus
	}
}

export class Navigation {
	static menus = [
		new Menu(
			'calendar',
			'common_nav_top_calendar',
			[roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
			'bi bi-calendar',
			[
				new SubMenu(roleCategories.ADMIN, 'calendar', 'common_nav_side_calendar', 'Event'),
				new SubMenu(roleCategories.EMPLOYEE, 'calendar', 'common_nav_side_calendar', 'Event'),
				new SubMenu(roleCategories.CLIENT, 'calendar', 'common_nav_side_calendar', 'Event'),
			]
		),
		new Menu(
			'community',
			'common_nav_top_community',
			[roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
			'bi bi-people',
			[
				new SubMenu(roleCategories.ADMIN, 'client', 'common_nav_side_community_admin_client', 'Tmp'),
				new SubMenu(roleCategories.ADMIN, 'employee', 'common_nav_side_community_admin_employee', 'Tmp'),
				new SubMenu(roleCategories.ADMIN, 'invoice', 'common_nav_side_community_admin_invoice', 'Tmp'),
				new SubMenu(roleCategories.EMPLOYEE, 'client', 'common_nav_side_community_employee_client', 'Tmp'),
				new SubMenu(roleCategories.EMPLOYEE, 'invoice', 'common_nav_side_community_employee_invoice', 'Tmp'),
				new SubMenu(roleCategories.CLIENT, 'horse', 'common_nav_side_community_client_horse', 'PageTwo'),
				new SubMenu(roleCategories.CLIENT, 'invoice', 'common_nav_side_community_client_invoice', 'Tmp'),
			]
		),
		new Menu('backoffice', 'common_nav_top_backoffice', [roleCategories.ADMIN], 'bi-wrench-adjustable', [
			new SubMenu(roleCategories.ADMIN, 'pension', 'common_nav_side_backoffice_admin_pension', 'Pension'),
			new SubMenu(roleCategories.ADMIN, 'ride', 'common_nav_side_backoffice_admin_ride', 'Tmp'),
			new SubMenu(roleCategories.ADMIN, 'additive', 'common_nav_side_backoffice_admin_additive', 'Additive'),
			new SubMenu(roleCategories.ADMIN, 'lesson', 'common_nav_side_backoffice_admin_lesson', 'Tmp'),
		]),
		new Menu(
			'profile',
			'common_nav_top_profile',
			[roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
			'bi-gear',
			[
				new SubMenu(roleCategories.ADMIN, 'stable', 'common_nav_side_profile_stable', 'Tmp'),
				new SubMenu(roleCategories.ADMIN, 'profile', 'common_nav_side_profile_profile', 'Tmp'),
				new SubMenu(roleCategories.EMPLOYEE, 'profile', 'common_nav_side_profile_profile', 'Tmp'),
				new SubMenu(roleCategories.CLIENT, 'profile', 'common_nav_side_profile_profile', 'Tmp'),
			]
		),
		new Menu(
			'authentication',
			'common_nav_top_authentication',
			[roleCategories.ADMIN, roleCategories.EMPLOYEE, roleCategories.CLIENT],
			'bi bi-lock',
			[
				new SubMenu(
					roleCategories.ADMIN,
					'authentication',
					'common_nav_side_authentication_authentication',
					'PageAuthentication'
				),
				new SubMenu(
					roleCategories.EMPLOYEE,
					'authentication',
					'common_nav_side_authentication_authentication',
					'PageAuthentication'
				),
				new SubMenu(
					roleCategories.CLIENT,
					'authentication',
					'common_nav_side_authentication_authentication',
					'PageAuthentication'
				),
			]
		),
	]

	static getMenusForRole(role) {
		return this.menus.filter(menu => menu.roles.includes(role))
	}

	static getSubMenusForRoleAndUrl(url, role) {
		const menu = this.getActiveMenu(url, role)
		return menu && menu.submenus ? menu.submenus.filter(submenu => submenu.role === role) : []
	}

	static getActiveMenu(url, role) {
		const menusForRole = this.getMenusForRole(role)

		for (const menu of menusForRole) {
			for (const submenu of menu.submenus) {
				if (submenu.url === url) {
					return menu
				}
			}
		}
	}

	static getActiveSubMenu(url) {
		return SubMenu.submenus.find(submenu => submenu.url === url)
	}

	static getDefaultSubMenuByMenuName(menuName, role) {
		const mapping = {
			calendar: 'calendar',
			authentication: 'authentication',
			backoffice: 'pension',
			profile: 'profile',
		}
		const communityMapping = {
			[roleCategories.ADMIN]: 'client',
			[roleCategories.EMPLOYEE]: 'client',
			[roleCategories.CLIENT]: 'horse',
		}

		mapping['community'] = communityMapping[role]

		return SubMenu.submenus.find(submenu => submenu.role === role && submenu.name === mapping[menuName])
	}

	static getRouter() {
		const uniqueByUrlSubMenus = []
		SubMenu.submenus.forEach(submenu => {
			if (!uniqueByUrlSubMenus.find(subM => subM.url === submenu.url)) {
				uniqueByUrlSubMenus.push(submenu)
			}
		})

		return uniqueByUrlSubMenus.map(submenu => ({
			path: submenu.url,
			component: submenu.component,
		}))
	}
}
