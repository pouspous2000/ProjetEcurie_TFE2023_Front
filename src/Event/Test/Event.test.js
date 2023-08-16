import React from 'react'
import { render, screen } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import { Event } from './Event'

const server = setupServer(
	rest.get('/api/eventables', (req, res, ctx) => {
		return res(ctx.json([]))
	})
)

// Activez le serveur MSW avant les tests et désactivez-le après
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Event component', () => {
	it('renders events', async () => {
		// Rendez votre composant Event
		render(<Event />)

		// Attendez-vous à ce que les éléments d'événement simulés soient affichés à l'écran
		const eventElement = await screen.findByText(/Nom de l'événement simulé/i)
		expect(eventElement).toBeInTheDocument()
	})
})
