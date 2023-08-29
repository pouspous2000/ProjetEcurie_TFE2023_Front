import { createElement } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Layout } from './layout/Layout/Layout'
import { Navigation } from './navigation/Navigation'
import { Error } from './error/Error'

import { PageAuthentication } from './authentification/PageAuthentification'
import { PageNotFound } from './404/PageNotFoud'
import { Pension } from './Parametre/Pension/Pension'
import { Additive } from './Parametre/Additive/Additive'
import { Event } from './Event/Event'
import { PageOne } from './PageOne'
import { Tmp } from './Tmp'

const routerMapper = {
	PageAuthentication,
	PageOne,
	Tmp,
	Pension,
	Additive,
	Event,
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/calendar" />,
	},
	{
		path: '/',
		element: <Layout />,
		errorElement: <Error />,
		children: [
			...Navigation.getRouter().map(route => ({
				path: route.path,
				element: createElement(routerMapper[route.component]),
			})),
			{
				path: '/error',
				element: <Error />,
			},
		],
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
])

export const App = () => {
	return <RouterProvider router={router} />
}
