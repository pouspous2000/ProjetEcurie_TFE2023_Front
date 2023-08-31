import { apiSlice } from '../shared/store/api-slice'

const tag = 'INVOICES'
const routePrefix = 'invoices'

const invoiceApi = apiSlice.injectEndpoints({
	addTagTypes: [tag],
	endpoints: builder => ({
		getInvoices: builder.query({
			query: () => `/${routePrefix}`,
			transformResponse: response => response.sort((a, b) => b.id - a.id),
			providesTags: [tag],
		}),
		generateInvoice: builder.mutation({
			query: ({ userId, period }) => ({
				url: `/${routePrefix}`,
				method: 'POST',
				body: { userId, period },
			}),
			invalidatesTags: [tag],
		}),
		getInvoice: builder.mutation({
			query: invoice => `/${routePrefix}/${invoice.id}`,
		}),
		downloadInvoice: builder.query({
			query: invoice => `/${routePrefix}/download/${invoice.id}`,
		}),
		markAsPaidInvoice: builder.mutation({
			query: ({ invoice, paidAt }) => ({
				url: `/${routePrefix}/markAsPaid/${invoice.id}`,
				method: 'POST',
				body: { paidAt },
			}),
			invalidatesTags: [tag],
		}),
		markAsUnpaidInvoice: builder.mutation({
			query: invoice => ({
				url: `/${routePrefix}/markAsUnpaid/${invoice.id}`,
				method: 'POST',
				body: {},
			}),
			invalidatesTags: [tag],
		}),
	}),
})

export const {
	useGetInvoicesQuery,
	useGetInvoiceQuery,
	useDownloadInvoiceQuery,
	useGenerateInvoiceMutation,
	useMarkAsPaidInvoiceMutation,
	useMarkAsUnpaidInvoiceMutation,
} = invoiceApi
