import { useGetAdditivesQuery } from '../../API/additive.api'
import { CardAdditive } from './Component/CardAdditive'
import { ModalAddAdditive } from './Component/ModalAddAdditve'
import { BaseSpinner } from '../../shared/ui/BaseSpinner'
import { BaseErrorAlert } from '../../shared/ui/BaseErrorAlert'
import useModal from '../../shared/hooks/use-modal'

export const Additive = () => {
	const {
		data: additives,
		isLoading: isAdditivesLoading,
		isSuccess: isAdditivesSuccess,
		isError: isAdditivesError,
		error: additivesError,
	} = useGetAdditivesQuery()

	const createModal = useModal()

	const conditionalRendering = () => {
		if (isAdditivesLoading) {
			return <BaseSpinner />
		} else if (isAdditivesError) {
			return <BaseErrorAlert message={additivesError} />
		} else if (isAdditivesSuccess) {
			return (
				<>
					{additives.map(additive => (
						<>
							<CardAdditive
								AdditiveName={additive.name}
								AdditivePrice={additive.price}
								AdditiveId={additive.id}
							/>
						</>
					))}
				</>
			)
		} else {
			return <p>Pas bon ... </p>
		}
	}
	return (
		<div>
			<h2 style={{ width: 'fit-content', marginLeft: '3rem', fontSize: '30px', color: '#CD853F' }}>
				Configurations
			</h2>
			<h3 style={{ margin: '35px' }}>
				Additifs
				<button
					onClick={() => createModal.openHandler()}
					title="Ajouter un additif"
					type="button"
					className="btn"
					style={{
						backgroundColor: 'transparent',
						borderColor: 'transparent',
						width: 'fit-content',
						fontSize: '2rem',
						marginRight: '5rem',
					}}>
					<i className="bi bi-plus-circle" />
				</button>
			</h3>
			<div style={{ minHeight: '100%', overflow: 'auto', width: '70vw', height: '80vh' }}>
				{createModal.isVisible && <ModalAddAdditive modal={createModal} />}
				{conditionalRendering()}
			</div>
		</div>
	)
}
