import { ModalAddUpdatePension } from './Component/ModalAddUpdatePension'
import { CardPension } from './Component/CardPension'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import useModal from '../../shared/hooks/use-modal'
import { useGetPensionsQuery } from '../../API/pension.api'

export const Pension = () => {
	const {
		data: pensions,
		isLoading: isGetPensionsLoading,
		isSuccess: isGetPensionsSuccess,
		isError: isGetPensionsError,
		error: getPensionsError,
	} = useGetPensionsQuery()

	const createModal = useModal()

	const conditionalRendering = () => {
		if (isGetPensionsLoading) {
			return <BaseSpinner />
		} else if (isGetPensionsError) {
			return <BaseErrorAlert message={getPensionsError} />
		} else if (isGetPensionsSuccess) {
			return (
				<>
					{pensions.map(pension => (
						<>
							<CardPension
								PensionName={pension.name}
								PensionPrice={pension.monthlyPrice}
								PensionDescription={pension.description}
								PensionId={pension.id}
							/>
						</>
					))}
				</>
			)
		}
	}
	return (
		<div>
			<h2 style={{ width: 'fit-content', marginLeft: '3rem', fontSize: '30px', color: '#CD853F' }}>
				Configurations
			</h2>

			<h3 style={{ margin: '35px' }}>
				Pension
				<button
					onClick={() => createModal.openHandler()}
					title="Ajouter une pension"
					type="button"
					className="btn"
					style={{
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						width: 'fit-content',
						fontSize: '2rem',
						marginRight: '5rem',
					}}>
					<i class="bi bi-plus-circle" />
				</button>
			</h3>
			<div style={{ minHeight: '100%', overflow: 'auto', width: '70vw', height: '80vh' }}>
				{createModal.isVisible && <ModalAddUpdatePension modal={createModal} />}
				{conditionalRendering()}
			</div>
		</div>
	)
}
