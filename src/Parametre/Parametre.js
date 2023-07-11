import { useGetPensionsQuery } from '../API/pension.api'
import { BaseSpinner } from '../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../shared/ui/BaseErrorAlert'
import { Pension } from './Pension/Pension'

export const Parametre = () => {
	const { data: pensions, isLoading, isSuccess, isError, error } = useGetPensionsQuery()

	const conditionalRendering = () => {
		if (isLoading) {
			return <BaseSpinner />
		} else if (isError) {
			console.error(error)
			return <BaseErrorAlert message={error} />
		} else if (isSuccess) {
			return <Pension />
		} else {
			return <p>Pas bon ... </p>
		}
	}

	return <main>{conditionalRendering()}</main>
}
