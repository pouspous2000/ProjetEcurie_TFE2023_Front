import { createElement } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import { Layout } from './layout/Layout/Layout'
import { Navigation } from './navigation/Navigation'
import { PageRegister } from './authentification/register/PageRegister'

import { Tmp } from './Tmp'
import { Error } from './error/Error'
import { PageAuthentication } from './authentification/PageAuthentification'
import { PageNotFound } from './404/PageNotFoud'
import { Event } from './Event/Event'
import { Pension } from './Parametre/Pension/Pension'
import { Additive } from './Parametre/Additive/Additive'
import { ClientEmployeeView } from './Communaute/ClientEmployeeView'
import { ClientView } from './Communaute/ClientView'
import { Client } from './Communaute/Client/Client'
import { Cheval } from './Communaute/Cheval/Cheval'
import { PageConfirmation } from './authentification/confirmation/PageConfirmation'
import { PageRgpd } from './rgpd/PageRgpd'

const routerMapper = {
	PageRegister,
	Tmp,
	PageAuthentication,
	Event,
	Pension,
	Additive,
	ClientEmployeeView,
	ClientView,
	Client,
	Cheval,
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <Navigate to="/calendar" />,
	},
	{
		path: '/rgpd',
		element: <PageRgpd />,
	},
	{
		path: '/confirmation',
		element: <PageConfirmation />,
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
