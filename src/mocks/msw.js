import { rest } from 'msw'

export const handlers = [
	rest.get('/events', (req, res, ctx) => {
		return res(ctx.json([]))
	}),
]
