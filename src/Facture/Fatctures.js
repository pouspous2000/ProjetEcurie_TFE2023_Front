import {
	useGetInvoicesQuery,
	useGetInvoiceQuery,
	useDownloadInvoiceQuery,
	useGenerateInvoiceMutation,
	useMarkAsPaidInvoiceMutation,
	useMarkAsUnpaidInvoiceMutation,
} from '../API/facture.api'
import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'

export const Facture = () => {
	const { data: invoices, isSuccess, isLoading, isError, error } = useGetInvoicesQuery()

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else if (isError) {
			return <BaseErrorAlert message={error} />
		} else if (isSuccess) {
			return <>console.log(invoices)</>
		}
	}

	return conditionalRendering()
}
